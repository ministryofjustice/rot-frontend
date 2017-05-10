===============================
Register of Technology Services
===============================

Frontend application built in ES6 using the `Redux <http://redux.js.org/>`__ framework with `Reactjs <https://facebook.github.io/react/>`__.


Dependencies
============
-  `nodejs <http://nodejs.org/>`__ (v6.x - can be installed using `nvm <https://github.com/creationix/nvm>`_)


Installation
============

Install dependencies:

::

  npm install


Develop
=======

Start mock json server:

::

  npm run mock-server


Start the web server:

::

  npm start

If run from a web server in the cloud, e.g. AWS:

::

  REACT_APP_API_URL=http://${server-ip-address}:3001 npm start


Build and Deploy
================

Build

::

  REACT_APP_API_URL=http://${server-ip-address}:3001 npm run build

This will result in a directory `build`

Serve

::

  npm run serve

The default `port` is 3000. To override it:

::

  PORT=8000 npm run serve
