#!/usr/bin/env bash

rm -rf ./dist
mkdir -p ./dist/app
mkdir -p ./dist/node_modules
WEBPACK_ENV=production webpack --progress --hide-modules
cp ./package.json ./dist/
cp ./app/main.js ./dist/app/
cp ./app/config.build.json ./dist/app/config.json
electron-packager ./dist --all --overwrite
