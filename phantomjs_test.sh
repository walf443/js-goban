#!/bin/sh
URL=file://$PWD/test.html
phantomjs run_qunit.js $URL | sed -e "s%^$URL\:[0-9]* %%g"
