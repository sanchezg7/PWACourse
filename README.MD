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

# Service Workers
This is one part of the criteria in order to install the application as a service worker.

They allow us to make the application offline ready. This way the app can still continue to work even without internet connectivity. 

- Recall that javascript files are loaded by html pages. 
- Javascript runs on a single thread in the browser.
- Even if you have multiple javascript files, they only run on one thread. They all share the same thread.
- The javascript can access the DOM via the thread. 
- To add elements
- To remove elements
- Service workers are also javascript files
  - They run on a **different thread**
  - They run in the background
  - They are decoupled from html pages
  - They are registered initially from an html page
  - However, it has a certain scope of where it applies to
    - e.g. all of the pages in a domain
  - They live on even after you close the originating application
  - It will keep on running, since it is a background process
  - Pros
    - They are really good at reacting to events as it relates to your app
  - Use case
    - Reacting to incoming events to do SOMETHING
      - e.g. show a notification
      - e.g. grab a cached asset
## Listenable Events in a service worker
It can function as a network proxy  

| Event                    | Source                                                              | Details                                                                                                                                                              |
|--------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Fetch                    | Browser or Page-related Javascript initiates a fetch (http request) | For an image or some resource                                                                                                                                        |
| Push Notifications       | Server                                                              | You can listen for this event. SW live even after all your pages are closed. This can be used to get the user back into the application                              | 
| Notification interaction | User interacts with displayed notification                          | SW will always run to handle any notification interaction                                                                                                            |
| Background sync          | Browser Background Sync Event (once connection is re-established)   | If internet is bad, updates will fail. Some browsers all you to use background sync. It will execute when internet connect is re-established. Listens for this event |
| Service Worker Lifecycle | SW Phase changes | e.g. when SW is getting installed.                                                                                                                                   |

## Lifecycle
- `index.html` loads `app.js`
- app.js executes code to register service worker `sw.js`
- Browser installs the service worker
  - `install` event raised
- Service worker is activated
  - May not happen right away. It can happen only after older service workers are terminated. B/c SW are attached to a domain. All tabs for that domain must be closed
  - `activate` event raised
  - SW now controls all pages of a Scope
- `sw.js` is registered in the browser

# Install PWA
https://web.dev/articles/customize-install
