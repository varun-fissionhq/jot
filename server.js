'use strict';

const Path = require('path');
const Hapi = require('hapi');
const fs = require('fs');
const config = require('config');

const server = new Hapi.Server();

server.connection({
  host: config.server.host,
  port: config.server.port
});

server.register(require('inert'), (err) => {

  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('views/index.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/ios_universal_link',
    handler: function (request, reply) {
      reply.file('views/ios_universal_link.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/android_app_link',
    handler: function (request, reply) {
      reply.file('views/android_app_link.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/android_deep_link',
    handler: function (request, reply) {
      reply.file('views/android_deep_link.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, reply) {
      reply.file('views/test_page.html');
    }
  });

  server.route({
    method: 'GET',
    path: '/.well-known/assetlinks.json',
    handler: function (request, reply) {
      reply.file('keys/assetlinks.json').header('Content-Type', 'application/json');
    }
  });

  server.route({
    method: 'GET',
    path: '/.well-known/apple-app-site-association',
    handler: function (request, reply) {
      reply.file('keys/apple-app-site-association').header('Content-Type', 'application/json');
    }
  });

  server.route({
    method: 'GET',
    path: '/apple-app-site-association',
    handler: function (request, reply) {
      reply.file('keys/apple-app-site-association').header('Content-Type', 'application/json');
    }
  });

  server.route({
    method: 'GET',
    path: '/assets/{name*}',
    handler: {
      directory: {
        path: __dirname + '/views/assets',
        listing: true,
        index: true
      }
    }
  });

  server.start((err) => {

    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
});