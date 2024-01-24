# New note in Single page app diagram

```mermaid
    sequenceDiagram
        participant browser
        participant server

        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server-->>browser: Response {"message":"note created"}

        Note right of browser: The browser executes redrawNotes() function to display new content
```
