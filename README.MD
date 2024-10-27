# Progressive Web Apps

# Running
`npm run start`

# Manifest
You need to add `<link rel="manifest" href="/manifest.json">` to ever page you send back from your server. This will allow your browser to load that configuration no matter what page you visit. For example, if a user visits a random blog page on your site, the user can install the PWA if they wish. IF you're running the app from a single index.html, you only need to add it once.

## Attributes
```json
{
  "name": "Long name of the app",
  "short_name": "short name of the app (e.g. below icon)",
  "start_url": "which page to load on startup",
  "scope": "which pages are included in a 'PWA Experience'",
  "display": "define how the app should load when it's added to the homescreen. should it show the browser bar or not? Recommend to show as standalone (e.g. standalone)",
  "background_color": "background whilst loading & on splashscreen (e.g. #FFF)",
  "theme_color": "theme color, top bar in task switcher (e.g. #3F51B5)",
  "description": "use when you save application in the browser",
  "dir": "read direction of your app (default: ltr)",
  "lang": "Main language of the app (e.g. en-US)",
  "orientation": "set (and enforce) default orientation (e.g. portrait-primary)",
  "icons": "configure icons (e.g. on homescreen)",
  "related_applications": "related native apps the user might want to install. You can recommend your native coexisting app, for example"
}
```