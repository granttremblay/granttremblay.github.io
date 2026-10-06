source "https://rubygems.org"

# GitHub Pages builds this site natively (no Actions needed). This Gemfile
# is only for local previews with `bundle exec jekyll serve`. The three
# plugins below are all on the GitHub Pages allow-list, so local output
# matches production.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

gem "webrick"  # needed to serve locally on Ruby 3+
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
