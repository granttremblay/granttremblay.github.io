---
layout: post
title: "Movies over Velocity Maps"
date: 2018-03-26 12:00:00 -0500
subtitle: "Always minimize cognitive load."
description: "Always minimize cognitive load."
image: /assets/img/musemovies/featured_Screen_Shot_2018-03-26_at_4.46.03_PM.png
---

> **Omit needless words**.

> Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts.

> -[Strunk & White](https://en.wikipedia.org/wiki/The_Elements_of_Style)

This famous principle also applies to science talks.

That [dense wall of bullet points](https://www.edwardtufte.com/bboard/q-and-a-fetch-msg?msg_id=0001yB&topic_id=1&topic=Ask+E%2eT%2e)? Most of the audience won't read it. Those that do will immediately forget it.

When you're giving a 20 minute talk amid a week-long conference, always remember that your well-intentioned colleagues will be [tired, distracted, and ***uninterested by default***](https://youtu.be/C1w0RI6KSzE). There's a good chance that half of the audience will be staring at their laptops for at least half of your talk (look around the room next time you're at a conference - you *know* I'm right).

I'm convinced that, If you're *lucky*, the audience will remember **one** thing from your talk. Pick that one thing you want the audience to remember, and then assign it [**minimal cognitive load**](https://blog.slideshare.net/2014/03/03/cognitive-load-theory-and-your-presentation).

Others have written extensively about this, so I'll stop there. But remember:

### always  
Minimize Cognitive Load

In my recent talk at[ Snowcluster 2018](http://www.physics.utah.edu/snowcluster/), I showed many "movies" of Hα velocity structure in [MUSE](http://www.granttremblay.com/blog/muse) IFU cubes of galaxies. Velocity maps are great, of course, but showing too many during a 7:45 pm talk seemed like a bad idea. Instead, I showed movies like these:

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/Cartwheel_spokes_smaller.jpg" aria-label=""><source src="/assets/img/musemovies/Cartwheel_spokes_smaller.mp4" type="video/mp4"></video>

Slices through a MUSE datacube showing Hα+[N II] velocity structure in the famous [collisional ring](https://www.youtube.com/watch?v=M9-VAvT51O8) galaxy ESO 350-40 (the "Cartwheel"). The three bright shimmers you see are, in order, the [N II] λ6549 Å, Hα  λ6563 Å, and the  [N II] λ6585 Å emission lines, clearly revealing ~220 km/s rotation of the galaxy.

Of course, there's loads of quantitative information lacking here (although I did show physical scale bars in kiloparsecs).

Obviously, were you writing a paper, you'd show something like these:

![](/assets/img/musemovies/MUSE_velocity_maps.png)

MUSE H-alpha Flux, Velocity, and Velocity Dispersion maps of the filaments in the Abell 2597 Brightest Cluster Galaxy, from Tremblay et al. (2018)

![](/assets/img/musemovies/muse_maps.png)

MUSE extinction and electron density maps of the filaments in the Abell 2597 Brightest Cluster Galaxy, from Tremblay et al. (2018)

Rather than this:

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/A2597_white.jpg" aria-label=""><source src="/assets/img/musemovies/A2597_white.mp4" type="video/mp4"></video>

But I think there are certainly times when a pretty, eye-catching movie comes in handy. A science talk before a tired audience is one of them.

![](/assets/img/musemovies/ESO-137.jpg)

*HST+Chandra* composite of ESO 137-001, a late-type galaxy  that is falling into the Abell 3627 galaxy cluster. The intracluster medium (ICM) acts as a wind on the interstellar medium (ISM) of the galaxy, and draws it outward via ram pressure stripping. The H-alpha and X-ray tail left behind is ~80 kpc long (!!).

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/Jellyfish_smaller.jpg" aria-label=""><source src="/assets/img/musemovies/Jellyfish_smaller.mp4" type="video/mp4"></video>

Hα+[N II] velocity structure in the MUSE cube of ESO 137. As its ISM is stripped out of the galaxy, it retains its angular momentum, leaving behind a spinning corkscrew  of warm gas in its wake. The transformational field of view of MUSE enabled covering the entire stripped tail in only two pointings.

I wrote an incredibly simple piece of code to make these movies, which [you can find here](https://github.com/granttremblay/MUSEmovie). The code is specifically tailored to MUSE and ALMA datacubes, but it can trivially be altered to work for effectively any three-dimensional datacube.   
  
The code will do an (extremely simple) stellar continuum  subtraction, too:

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/a2052.jpg" aria-label=""><source src="/assets/img/musemovies/a2052.mp4" type="video/mp4"></video>

Abell 2052

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/a2052_contsub.jpg" aria-label=""><source src="/assets/img/musemovies/a2052_contsub.mp4" type="video/mp4"></video>

Abell 2052 (with a rough stellar continuum subtraction)

Anyway, here's a sample gallery of various sources, most of which are cool core Brightest Cluster Galaxies. Most are pretty famous, so see if you can identify each source (mouse over each movie to find the answer).

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/M87_sub.jpg" aria-label=""><source src="/assets/img/musemovies/M87_sub.mp4" type="video/mp4"></video>

M87, BCG of the Virgo cluster.

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/CenA_2.jpg" aria-label=""><source src="/assets/img/musemovies/CenA_2.mp4" type="video/mp4"></video>

Centaurus A. This source is very nearby, and is therefore huge on the sky. This single MUSE pointing is aimed at the galaxy's edge-on dust disk in the nucleus. The rotation of the galaxy is nevertheless very clear.

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/Abell-1795_0.jpg" aria-label=""><source src="/assets/img/musemovies/Abell-1795_0.mp4" type="video/mp4"></video>

Abell 1795, another canonical cool core BCG. Check out Helen Russell's [awesome ALMA paper](https://ui.adsabs.harvard.edu/?#abs/2017MNRAS.472.4024R/abstract) on this source.

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/HE2211-3903.jpg" aria-label=""><source src="/assets/img/musemovies/HE2211-3903.mp4" type="video/mp4"></video>

HE2211-3903, a [CARS](http://www.cars-survey.org/) galaxy (okay, I didn't expect you to get this one).

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/RX-J0338.6_0958_0.jpg" aria-label=""><source src="/assets/img/musemovies/RX-J0338.6_0958_0.mp4" type="video/mp4"></video>

2A 0335+096, a cool core BCG. Check out Adrian Vantyghem's [nice ALMA paper](https://ui.adsabs.harvard.edu/?#abs/2016arXiv161000716V) on this awesome source.

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/N5044_1.jpg" aria-label=""><source src="/assets/img/musemovies/N5044_1.mp4" type="video/mp4"></video>

NGC 5044, a nearby group with a cool core. Check out Larry David's [famous ALMA paper](http://adsabs.harvard.edu/cgi-bin/bib_query?arXiv:1407.3235) on this source.

It's also fun to watch MUSE and ALMA movies side by side:

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/A2597.jpg" aria-label=""><source src="/assets/img/musemovies/A2597.mp4" type="video/mp4"></video>

<video class="post-video" autoplay loop muted playsinline poster="/assets/img/musemovies/A2597_alma.jpg" aria-label=""><source src="/assets/img/musemovies/A2597_alma.mp4" type="video/mp4"></video>
