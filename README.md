# AI CoSearch Chrome Extension

## TODO

- disable for this site
- disable for this page
- settings
    - open ai api key
    - blocklist
    - whitelist
    - ai model
    - prompt temperature
    - safety parsing
- history
    - href
    - date
    - html
- safety measures - forms, inputs, passwords, contenteditable
- convert to markdown


## Dev Resources

- [Manifest File Format](https://developer.chrome.com/docs/extensions/reference/manifest)
- [Side Panel API](https://developer.chrome.com/docs/extensions/reference/sidePanel/)
- [unpacked extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)
- [extensions reference](https://developer.chrome.com/docs/extensions/reference/)
- [samples search](https://developer.chrome.com/docs/extensions/)
- [samples repo](https://github.com/GoogleChrome/chrome-extensions-samples)

```mermaid
sequenceDiagram
    actor User
    participant Browser
    box Extension Implementation
    participant Service Worker
    participant Content Script
    participant Side Panel
    end
    participant Open AI
    Note left of User: Installation
    User->>Browser: Installs Extension
    Service Worker-->>Browser: Adds context menu
    Service Worker-->>Browser: Redirects to welcome page
    Note over Browser: Done
    Note left of User: Usage
    opt
        User->>Browser: Navigates to URL
    end
    opt
        Browser->>Browser: Page content (HTML) changes
    end
    Content Script->>Service Worker: Sends location info (URL) and page HTML
    Service Worker->>Side Panel: Forwards location info (URL) and page HTML
    Side Panel-->>+Open AI: Make prompt request
    Open AI-->>-Side Panel: Response
    Side Panel->>Browser: Present response in UI
    Note over Browser: Done
```