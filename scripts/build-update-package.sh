rsync -a "../api/default/" "../update-package/lib/api/default" && \
rsync -a "../app/src/default/" "../update-package/lib/app/src/default" && \
rsync -a "../documentation/default.md" "../update-package/lib/documentation" && \
rsync -a "../scripts/" "../update-package/lib/scripts" && \
echo rsync -a "../update-package/lib/" "../*" > "../update-package/install.sh"
echo read -p "Press any key to continue . . ." >> "../update-package/install.sh"
read -p "Press any key to continue . . ."
