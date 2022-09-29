#!/bin/sh

cd ../../../api/default/scripts && node db-init-with-data.js
read -p "Press any key to continue . . ."
