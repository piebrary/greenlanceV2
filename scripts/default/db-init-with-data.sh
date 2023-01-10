#!/bin/sh

cd ../../api/custom/scripts && node db-init-with-data.js || cd ../../api/default/scripts && node db-init-with-data.js
read -p "Press any key to continue . . ."
