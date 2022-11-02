const readline = require('readline/promises')
const { stdin: input, stdout: output } = require('process')
const fs = require('fs/promises')

;(async () => {

    const rl = readline.createInterface({
        input,
        output
    })

    let CURRENT_INSTALLED_VERSION

    try {

        CURRENT_INSTALLED_VERSION = await fs.readFile('../../../updates/current_installed_version')

    } catch (error) {

        CURRENT_INSTALLED_VERSION = undefined

    }

    try {

        console.log(CURRENT_INSTALLED_VERSION ? `The currently installed version is ${CURRENT_INSTALLED_VERSION}` : 'Could not find current installed version number')

        const NEW_VERSION_NUMBER = await rl.question(`What is the name new version number of this update? `)

        await fs.mkdir(`../../../updates/${NEW_VERSION_NUMBER}/`)

        // add version file to update package
        await fs.writeFile(`../../../updates/${NEW_VERSION_NUMBER}/version.txt`, `${NEW_VERSION_NUMBER}\n`, { flag:'w' })

        // copy all files to a new update package
        await fs.cp('../../../api/default', `../../../updates/${NEW_VERSION_NUMBER}/lib/api/default`, { recursive: true })
        await fs.cp('../../../api/.env.example', `../../../updates/${NEW_VERSION_NUMBER}/lib/api/.env.example`)
        await fs.cp('../../../app/.env.example', `../../../updates/${NEW_VERSION_NUMBER}/lib/app/.env.example`)
        await fs.cp('../../../app/src/default', `../../../updates/${NEW_VERSION_NUMBER}/lib/app/src/default`, { recursive: true })
        await fs.cp('../../../app/src/index.js', `../../../updates/${NEW_VERSION_NUMBER}/lib/app/src/index.js`, { recursive: true })
        await fs.cp('../../../app/src/index.css', `../../../updates/${NEW_VERSION_NUMBER}/lib/app/src/index.css`, { recursive: true })
        await fs.cp('../../../documentation/default', `../../../updates/${NEW_VERSION_NUMBER}/lib/documentation/default`, { recursive: true })
        await fs.cp('../../../scripts/default', `../../../updates/${NEW_VERSION_NUMBER}/lib/scripts/default`, { recursive: true })

        // create install.bat & install.sh which start install.js in update package
        await fs.writeFile(`../../../updates/${NEW_VERSION_NUMBER}/install.bat`, `cd ./lib && node install.js`)
        await fs.writeFile(`../../../updates/${NEW_VERSION_NUMBER}/install.sh`, `cd ./lib && node install.js`)

        // copy install.js to version folder
        await fs.cp('./install.js', `../../../updates/${NEW_VERSION_NUMBER}/lib/install.js`, { recursive: true })

        console.log(`Finished building update package ${NEW_VERSION_NUMBER}`)

        process.exit()

    } catch (error) {

        console.log(error)

    }

})()
