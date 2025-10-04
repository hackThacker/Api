# Setup and Run (REST, GraphQL, RPC, SOAP) with index.html

## Prerequisites
- Node.js and npm installed
- Your project folder contains:
  - index.html
  - graphql-server.js
  - rest-server.js
  - rpc-server.js
  - soap-server.js

## 1) Install dependencies
Open a terminal in your project folder and run:
```bash
npm install express cors body-parser graphql express-graphql xml-js
```

## 2) Open index.html
- Open index.html in your editor and/or browser.
- Make sure any fetch/axios URLs in index.html match your local server ports and paths.

## 3) Run all servers (use split terminals)
Open multiple terminals (or split a terminal) and run each server in its own terminal:

GraphQL:
```bash
node graphql-server.js
```

REST:
```bash
node rest-server.js
```

RPC:
```bash
node rpc-server.js
```

SOAP:
```bash
node soap-server.js
```

Tip (VS Code): Terminal > Split Terminal to run each command side-by-side.

## 4) Use the app
- With all four servers running, refresh index.html in your browser.
- The page should now load and interact with the APIs properly.

## Notes
- If you get “Cannot find module …”, ensure you ran the npm install command in the same folder as your server files.
- If a port is already in use, stop the conflicting process or change the port in the corresponding server file.
- Stop any server with Ctrl + C in its terminal.
