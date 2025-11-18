#!/usr/bin/env bash
# exit on error
set -o errexit

# 1. Install npm dependencies
npm install

# 2. Install Chrome manually
# This downloads the official Google Chrome package and installs it
apt-get update
apt-get install -y wget gnupg
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
apt-get update
apt-get install -y google-chrome-stable
