rsync -a "../../../api/default/" "../../../update-package/lib/api/default" && \
rsync -a "../../../app/src/default/" "../../../update-package/lib/app/src/default" && \
rsync -a "../../../documentation/default/" "../../../update-package/lib/documentation/default" && \
rsync -a "../../../scripts/default/" "../../../update-package/lib/scripts/default" && \
echo rsync -a "../../../update-package/lib/" "../../../*" > "../../../update-package/install.sh"
echo read -p "Press any key to continue . . ." >> "../../../update-package/install.sh"
read -p "Press any key to continue . . ."