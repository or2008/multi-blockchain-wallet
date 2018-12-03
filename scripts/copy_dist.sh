#!/usr/bin/env bash

# THIS SCRIPT SHOUD NOT BE HERE

# Webapp
echo copying dist to webapp...
rm -rf ../webapp/client/node_modules/@bancor/client_base/dist
mkdir -p  ../webapp/client/node_modules/@bancor/client_base/dist
cp -r ./dist ../webapp/client/node_modules/@bancor/client_base

# Widget
echo copying dist to widget_convert...
rm -rf ../widget_convert/client/node_modules/@bancor/client_base/dist
mkdir -p  ../widget_convert/client/node_modules/@bancor/client_base/dist
cp -r ./dist ../widget_convert/client/node_modules/@bancor/client_base
