#!/usr/bin/env python3
"""
Fetch Grant Tremblay's publication list and write it to _data/publications.json,
which the /publications/ page renders.

Two data sources, chosen automatically:

  * NASA SciX / ADS  — used when an ADS_TOKEN is available (env var or
    scripts/.ads_token). This is the authoritative source: comprehensive,
    with citation counts and bibcodes. Get a free token at
    https://ui.adsabs.harvard.edu/user/settings/token
    (NASA SciX uses the same API.)

  * Crossref         — used as a no-token fallback (queried by ORCID). Good
    coverage of recent, DOI-registered papers; used to seed the list before
    a token is configured.

The GitHub Action in .github/workflows/update-publications.yml runs this on a
schedule with the ADS_TOKEN repository secret, so the list stays current.

Usage:
    python3 scripts/fetch_publications.py
"""
import json
import os
import sys
import html
import time
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime, timezone

ORCID = "0000-0002-5445-5401"
OUT = os.path.join(os.path.dirname(__file__), "..", "_data", "publications.json")
UA = "granttremblay.com publications fetcher (mailto:gtremblay@cfa.harvard.edu)"


def get_token():
    tok = os.environ.get("ADS_TOKEN") or os.environ.get("ADS_DEV_KEY")
    if tok:
        return tok.strip()
    path = os.path.join(os.path.dirname(__file__), ".ads_token")
    if os.path.exists(path):
        return open(path).read().strip()
    return None


def http_json(url, headers=None, tries=4):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=headers or {"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and i < tries - 1:
                time.sleep(2 * (i + 1))
                continue
            raise
        except Exception:
            if i < tries - 1:
                time.sleep(2 * (i + 1))
                continue
            raise


def initials(given):
    out = []
    for part in (given or "").replace(".", " ").split():
        if part:
            out.append(part[0].upper() + ".")
    return " ".join(out)


# ----------------------------------------------------------------------------
# NASA SciX / ADS
# ----------------------------------------------------------------------------
def fetch_ads(token):
    base = "https://api.adsabs.harvard.edu/v1/search/query"
    fl = "title,author,year,pub,volume,page,doi,bibcode,citation_count,pubdate,identifier,doctype"
    params = {
        "q": f"orcid:{ORCID}",
        "fl": fl,
        "rows": 500,
        "sort": "date desc",
    }
    url = base + "?" + urllib.parse.urlencode(params)
    data = http_json(url, headers={"Authorization": f"Bearer {token}", "User-Agent": UA})
    docs = data.get("response", {}).get("docs", [])
    items = []
    keep = {"article", "eprint", "inproceedings", "inbook", "book"}
    for d in docs:
        doctype = d.get("doctype", "")
        if doctype and doctype not in keep:
            continue
        title = html.unescape((d.get("title") or [""])[0]).strip()
        if not title:
            continue
        authors = [a.strip() for a in d.get("author", [])]  # "Last, First"
        arxiv = ""
        for ident in d.get("identifier", []):
            if ident.lower().startswith("arxiv:"):
                arxiv = ident.split(":", 1)[1]
        doi = (d.get("doi") or [""])[0]
        bibcode = d.get("bibcode", "")
        venue = html.unescape(d.get("pub", "") or "")
        items.append({
            "title": title,
            "authors": authors,
            "author_format": "ads",
            "year": int(d.get("year") or 0) or None,
            "pubdate": d.get("pubdate", ""),
            "venue": venue,
            "volume": d.get("volume", ""),
            "page": (d.get("page") or [""])[0] if isinstance(d.get("page"), list) else d.get("page", ""),
            "doi": doi,
            "bibcode": bibcode,
            "arxiv": arxiv,
            "citations": d.get("citation_count", 0) or 0,
            "url": f"https://ui.adsabs.harvard.edu/abs/{urllib.parse.quote(bibcode)}/abstract" if bibcode
                   else (f"https://doi.org/{doi}" if doi else ""),
        })
    return items, "NASA SciX / ADS"


# ----------------------------------------------------------------------------
# Crossref (no token)
# ----------------------------------------------------------------------------
def fetch_crossref():
    base = "https://api.crossref.org/works"
    rows = 200
    params = {
        "filter": f"orcid:{ORCID}",
        "rows": rows,
        "select": "title,author,container-title,published,issued,DOI,is-referenced-by-count,volume,page,type",
    }
    url = base + "?" + urllib.parse.urlencode(params)
    data = http_json(url, headers={"User-Agent": UA})
    msg = data.get("message", {})
    items = []
    keep = {"journal-article", "proceedings-article", "book-chapter", "book", "posted-content"}
    for it in msg.get("items", []):
        if it.get("type") not in keep:
            continue
        title = html.unescape((it.get("title") or [""])[0]).strip()
        if not title:
            continue
        authors = []
        for a in it.get("author", []):
            fam = a.get("family", "").strip()
            giv = initials(a.get("given", ""))
            if fam:
                authors.append(f"{fam}, {giv}".strip().rstrip(","))
        dp = (it.get("published", {}) or it.get("issued", {})).get("date-parts", [[None]])
        year = dp[0][0] if dp and dp[0] else None
        venue = html.unescape((it.get("container-title") or [""])[0])
        doi = it.get("DOI", "")
        items.append({
            "title": title,
            "authors": authors,
            "author_format": "ads",
            "year": year,
            "pubdate": "-".join(str(x) for x in dp[0]) if dp and dp[0] and dp[0][0] else "",
            "venue": venue,
            "volume": it.get("volume", ""),
            "page": it.get("page", ""),
            "doi": doi,
            "bibcode": "",
            "arxiv": "",
            "citations": it.get("is-referenced-by-count", 0) or 0,
            "url": f"https://doi.org/{doi}" if doi else "",
        })
    return items, "Crossref"


def main():
    token = get_token()
    try:
        if token:
            items, source = fetch_ads(token)
            if not items:
                items, source = fetch_crossref()
        else:
            print("No ADS token found — seeding from Crossref (ORCID).", file=sys.stderr)
            items, source = fetch_crossref()
    except Exception as e:
        print(f"Primary source failed ({e}); trying Crossref.", file=sys.stderr)
        items, source = fetch_crossref()

    # de-duplicate by DOI (fall back to normalized title)
    seen = {}
    for it in items:
        key = (it.get("doi") or it.get("title", "")).lower().strip()
        if key in seen:
            # keep the one with more citations / a bibcode
            if (it.get("bibcode") and not seen[key].get("bibcode")) or it["citations"] > seen[key]["citations"]:
                seen[key] = it
        else:
            seen[key] = it
    items = list(seen.values())

    items.sort(key=lambda x: (x.get("year") or 0, x.get("citations") or 0), reverse=True)

    payload = {
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "source": source,
        "orcid": ORCID,
        "count": len(items),
        "items": items,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(payload, f, indent=1, ensure_ascii=False)
    print(f"Wrote {len(items)} publications from {source} to {os.path.relpath(OUT)}")


if __name__ == "__main__":
    main()
