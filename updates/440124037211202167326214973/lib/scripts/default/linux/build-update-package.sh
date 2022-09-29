#!/bin/sh

subkey=$RANDOM

rsync -a "../../../api/default/" "../../../updates/$subkey/lib/api/default" && \
rsync -a "../../../api/env.example" "../../../updates/$subkey/lib/api/env.example" && \
rsync -a "../../../app/env.example" "../../../updates/$subkey/lib/app/env.example" && \
rsync -a "../../../app/src/default/" "../../../updates/$subkey/lib/app/src/default" && \
rsync -a "../../../documentation/default/" "../../../updates/$subkey/lib/documentation/default" && \
rsync -a "../../../scripts/default/" "../../../updates/$subkey/lib/scripts/default" && \
echo rsync -a "./lib/" "../../*" > "../../../updates/$subkey/install.sh"
echo read -p "Press any key to continue . . ." >> "../../../updates/$subkey/install.sh"
echo xcopy /S /I /Y /E ".\lib\*" "..\..\*" > "..\..\..\updates\$subkey\install.bat"
echo pause >> "..\..\..\updates\$subkey\install.bat"
read -p "Press any key to continue . . ."
