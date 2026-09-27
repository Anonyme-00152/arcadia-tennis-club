# Arcadia — Tennis Club & Academy

Landing page for a fictional members' tennis club and academy. The whole site is a single `index.html` file: HTML, CSS and JS with no build step and no framework.

## What it includes

- An intro loader with a progress bar and a curtain that slides up
- Smooth scrolling with [Lenis](https://github.com/darkroomengineering/lenis), loaded from a CDN through an importmap
- Spring animations in plain JS: text reveals behind a mask, fade-in on scroll, hover effects and parallax
- Carousels for gear and coaches, a fullscreen menu and a contact modal (the form is a local demo and sends nothing)
- An adaptive layout in `rem` that scales proportionally at every screen width, with a dedicated mobile layout

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8091
```

Then go to http://localhost:8091

## Deploy

- **Vercel**: import the GitHub repo. It is a static site, so no build settings are needed.
- **GitHub Pages**: Settings → Pages → deploy from the `main` branch, root folder.

## Notes

- All images are stored locally in `assets/`, so the site does not depend on any external image host.
- Font: [Onest](https://fonts.google.com/specimen/Onest), loaded from Google Fonts.
