#!/bin/sh

echo Welcome to the PieBrary installation file.
echo This file will guide you through the installation and set all necessary variables.
echo

read "Input the name for the app : " APP_NAME

read "Input the full url where the app will be hosted : " CLIENT_URL

read "Input the no reply email address or just ENTER for default [no-reply@$CLIENT_URL] : " NO_REPLY_EMAIL
NO_REPLY_EMAIL=${NO_REPLY_EMAIL:-no-reply@$CLIENT_URL}

read "Input api port number or just ENTER for default [31415] : " API_PORT
API_PORT=${API_PORT:-31415}

read "Input api prefix or just ENTER for default [/api] : " API_PREFIX
API_PREFIX=${API_PREFIX:-/api}

read "Input secret for encrypting session tokens : " API_SECRET

read "Boolean enable users to register themselfs, ENTER for default [true] : " API_ENABLE_PUBLIC_REGISTRATION
API_ENABLE_PUBLIC_REGISTRATION=${API_ENABLE_PUBLIC_REGISTRATION:-true}

read "API_TOKEN_LIFETIME=Input token lifetime number or just ENTER for default [2678400000] : " API_TOKEN_LIFETIME
API_TOKEN_LIFETIME=${API_TOKEN_LIFETIME:-2678400000}

read "Input db name : " DB_NAME

read "Input db username : " DB_USERNAME

read "Input db password : " DB_PASSWORD

read "Input db url : " DB_URL

echo "REACT_APP_NAME=$APP_NAME" > ../../../app/.env
echo "REACT_APP_CLIENT_URL=$CLIENT_URL" >> ../../../app/.env
echo "REACT_APP_NO_REPLY_EMAIL=$NO_REPLY_EMAIL" >> ../../../app/.env
echo "REACT_APP_API_PORT=$API_PORT" >> ../../../app/.env
echo "REACT_APP_API_PREFIX=$API_PREFIX" >> ../../../app/.env
echo "REACT_APP_ENABLE_PUBLIC_REGISTRATION=$API_ENABLE_PUBLIC_REGISTRATION" >> ../../../app/.env

echo "APP_NAME=$APP_NAME" > ../../../api/.env
echo "CLIENT_URL=$CLIENT_URL" >> ../../../api/.env
echo "NO_REPLY_EMAIL=$NO_REPLY_EMAIL" >> ../../../api/.env
echo "API_PORT=$API_PORT" >> ../../../api/.env
echo "API_PREFIX=$API_PREFIX" >> ../../../api/.env
echo "API_SECRET=$API_SECRET" >> ../../../api/.env
echo "API_TOKEN_LIFETIME=$API_TOKEN_LIFETIME" >> ../../../api/.env
echo "API_ENABLE_PUBLIC_REGISTRATION=$API_ENABLE_PUBLIC_REGISTRATION" >> ../../../api/.env
echo "DB_NAME=$DB_NAME" >> ../../../api/.env
echo "DB_USERNAME=$DB_USERNAME" >> ../../../api/.env
echo "DB_PASSWORD=$DB_PASSWORD" >> ../../../api/.env
echo "DB_URL=$DB_URL" >> ../../../api/.env

echo Successfully installed PieBrary

pause
