@echo off
echo Welcome to the PieBrary installation file.
echo This file will guide you through the installation and set all necessary variables.
echo.

set /p "APP_NAME=Input the name for the app : "

set /p "CLIENT_URL=Input the full url where the app will be hosted : "

set NO_REPLY_EMAIL=no-reply@%CLIENT_URL%
set /p "NO_REPLY_EMAIL=Input the no reply email address or just ENTER for default [%NO_REPLY_EMAIL%] : "

set API_PORT=31415
set /p "API_PORT=Input api port number or just ENTER for default [%API_PORT%] : "

set API_PREFIX=/api
set /p "API_PREFIX=Input api prefix or just ENTER for default [%API_PREFIX%] : "

set /p "API_SECRET=Input secret for encrypting session tokens : "

set API_ENABLE_PUBLIC_REGISTRATION=true
set /p "API_ENABLE_PUBLIC_REGISTRATION=Boolean enable users to register themselfs, ENTER for default [%API_ENABLE_PUBLIC_REGISTRATION%] : "

set API_TOKEN_LIFETIME=2678400000
set /p "API_TOKEN_LIFETIME=Input token lifetime number or just ENTER for default [%API_TOKEN_LIFETIME%] : "

set /p "DB_NAME=Input db name : "

set /p "DB_USERNAME=Input db username : "

set /p "DB_PASSWORD=Input db password : "

set /p "DB_URL=Input db url : "

echo REACT_APP_NAME=%APP_NAME% > ../../../app/.env
echo REACT_APP_CLIENT_URL=%CLIENT_URL% >> ../../../app/.env
echo REACT_APP_NO_REPLY_EMAIL=%NO_REPLY_EMAIL% >> ../../../app/.env
echo REACT_APP_API_PORT=%API_PORT% >> ../../../app/.env
echo REACT_APP_API_PREFIX=%API_PREFIX% >> ../../../app/.env
echo REACT_APP_ENABLE_PUBLIC_REGISTRATION=%API_ENABLE_PUBLIC_REGISTRATION% >> ../../../app/.env

echo APP_NAME=%APP_NAME% > ../../../api/.env
echo CLIENT_URL=%CLIENT_URL% >> ../../../api/.env
echo NO_REPLY_EMAIL=%NO_REPLY_EMAIL% >> ../../../api/.env
echo API_PORT=%API_PORT% >> ../../../api/.env
echo API_PREFIX=%API_PREFIX% >> ../../../api/.env
echo API_SECRET=%API_SECRET% >> ../../../api/.env
echo API_TOKEN_LIFETIME=%API_TOKEN_LIFETIME% >> ../../../api/.env
echo API_ENABLE_PUBLIC_REGISTRATION=%API_ENABLE_PUBLIC_REGISTRATION% >> ../../../api/.env
echo DB_NAME=%DB_NAME% >> ../../../api/.env
echo DB_USERNAME=%DB_USERNAME% >> ../../../api/.env
echo DB_PASSWORD=%DB_PASSWORD% >> ../../../api/.env
echo DB_URL=%DB_URL% >> ../../../api/.env

echo Successfully installed %APP_NAME% with the help of PieBrary

pause
