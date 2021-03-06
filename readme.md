# Address book

The index let you directly call your contacts by clicking on their names.
You can change the visualization by toggling on top. It will let you delete/modify every contact.

### Features:

- this app responds to your system color theme
- many pages have a scroll progression bar on the very top
- the form is validated by JS
- the pagination is featured thanks to **json-server response headers**
- **http-server** manage also the 404 status error

This app uses loDASH.

Before visit the app, via _npm_
`npm i`
`npm install --global http-server json-server`

To use the _db.json_ file ad a Database
`npm run startdb`
and then in another window
`npm run startserv`

To activate the scroll progression bar in _Chrome/Chromium_ follow the next steps:

- insert `chrome://flags` in the address bar and go
- look for `Experimental Web Platform features`
- enable it
- restart your browser

Thank you.

![Smile](/assets/images/smile.png "Smile")
