# Svelte + Express template app

## Introduction
Svelte + Svelte Router + Bootstrap + Express + dotenv

This package purpose is to provide a Svelte app template and an Express API bundled together. The Svelte application is 
not SSR.

## Motivation

Well, first, Svelte is the most amazing JS framework I ever used for a frontend application.

My aim was to be able to bundle into a single package the front and backend application, with the same environment.

In my use case, SSR was not convenient because I needed to make several calls to a backend API into the same page. I 
have considered to use Sapper, which is also amazing, was is not enough open for now, as I needed to manipulate routes, 
handle POST requests on the server, handling forms etc ...

## Quick start 

Use npx to create a new application. 

```bash
npx degit jlefebure/svelte-express-template my-app 
```

Once done, install all dependencies

```bash
npm install
```

Run your new application with the following command 

```bash
npm run dev
```

By default, the app is running on http://0.0.0.0:3000. This behaviour can be configured with environment variables
 (see bellow).
 
## Structure

### Root package

The template package is organized by separating frontend and server applications.

```
.
├── rollup.config.js
├── src
|   ├── client
|   └── server
|   └── app.mjs
    └── settings.mjs
```
* `client` folder contains sources of the Svelte application
* `server` folder contains sources of the Express application
* `app.mjs` start the Express server that will start the Express app and expose the public folder where the Svelte app is
  compiled by default
* `settings.mjs` contains the settings of the application for both front and back applications 

### Client

```
.
├── client
|   ├── components
|   ├── pages
|   ├── services
|   ├── stores
|   ├── main.js
|   ├── App.svelte
```
* `components` contains all commons components of the client app
* `pages` contains all pages defined set in the router
* `services` contains exposed functions to call the Express server
* `stores` contains the exposed stores for the whole app
* `main.js` is the start point of the client app
* `App.svelte` contains the router, navbar, and is the main component of the app
 
### Server

```
.
├── server
|   ├── routes
|       ├── index.mjs
```

Contains just a single file: the exposed endpoints. 
 
## Configuration

Configuration of the application is handled with dotenv and dotenv-expand. Configuration is available for the Express
and Svelte application. Because the Svelte application is not SSR, env variables are injected when Rollup is launched
and after every compilation.

### Basic configuration
Configuration is done with dotenv with an embedded `.env` file. You can either edit this file or override this 
configuration by setting an environment variable. 

The keys bellow are mandatory and must be configured. 

| Variable               | Default value                 | Description                                                                                         |
|------------------------|-------------------------------|-----------------------------------------------------------------------------------------------------|
| SVELTE_PORT            | 3000                          | Port on which the app and the API is exposed.                                                       |
| SVELTE_EXTERNAL_URL    | http://0.0.0.0:${SVELTE_PORT} | URL on which the application is exposed.<br>This value is by the client to fetch data from the API. |
| SVELTE_API_BASE_URL    | /api                          | Base URL on which the server API is exposed.<br>Trailing slash is deleted if present.               |
| SVELTE_CLIENT_BASE_URL | /                             | Base URL on which the frontend client is exposed.<br>Trailing slash is deleted if present.          |

You can override this configuration by setting an environment variable.
The following example set the default port to 5000.

```bash
export SVELTE_PORT=5000
```

### Own configuration

You can define your own variables by completing the `.env` file. The configuration must follow two rules : 
* It must be defined and cannot be empty
* The name must start by `SVELTE_`

Variables defined directly on the environment are also taken in consideration if it follow these two rules.

### Using configuration in client

Because Svelte app is not SSR, variables are directly injected by the rollup-replace-plugin. To avoid ambiguous syntax, 
the key must be respect the following format. For the `SVELTE_PORT` variable : 

```
%SVELTE_PORT%
```

These variables can be used everywhere in the application, mostly in strings values. Fetch calls that are good examples
that you can follow. This call will be compiled from

```ecmascript 6
 return fetch(`%SVELTE_EXTERNAL_URL%%SVELTE_API_BASE_URL%/hello`, {
        headers: {
            "Content-Type": "application/json"
        },
    })
```

to

```ecmascript 6
 return fetch(`http://0.0.0.0:3000/api/hello`, {
        headers: {
            "Content-Type": "application/json"
        },
    })
```

### Using configuration in server

Because the Express application is ... a server application, you can directly use variables in your code.

```ecmascript 6
import settings from "./settings.mjs";

//value is "/"
let baseUrl = settings.SVELTE_CLIENT_BASE_URL      
```

* `settings.mjs` must be imported
* The configuration key should be defined. Otherwise, its value will be undefined

## Rollup 

The Rollup configuration will compiled the Svelte application into `public` folder and start the express server. Nothing
exotic here.

## Deploying

You can either deploy your future application in standalone mode or as a Docker container. 

### Standalone mode

Just take all your project and run the following commands, to install depdencies, build and run your project.

```bash
npm install
npm run build
npm start
```

### Docker 

A Dockerfile is provided with the template app. It will take your project, install dependencies, and run the application

To build your image, in your project folder

```bash
docker build . -t myapp
```

To run your application 

```bash
docker run -p 3000:3000 myapp
```

To push it on a distant repository (considering your are logged on the Docker registry)

```bash
docker push myapp
```