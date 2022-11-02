const readline = require('readline/promises')
const { stdin: input, stdout: output } = require('process')
const fs = require('fs/promises')

;(async () => {

    const rl = readline.createInterface({
        input,
        output
    })

    let UPDATE_PACKAGE_VERSION

    try {

        UPDATE_PACKAGE_VERSION = await fs.readFile('../version.txt')

    } catch (error) {

        console.log(error)

    }

    try {

        // install.js writes current version to current_installed_version file and appends version and date to versions.log
        await fs.writeFile(`../../current_installed_version.txt`, `${UPDATE_PACKAGE_VERSION}\n`, { flag:'w' })
        await fs.appendFile(`../../versions.log`, `${UPDATE_PACKAGE_VERSION}\n`)

        // install.js remove all destination folders which will be updated
        // DO NOT USE THIS< NOT WORKING CORRECTLY
        // await fs.rm('../../../api/default', { recursive: true, force: true })
        // await fs.rm('../../../app/src/default', { recursive: true, force: true })
        // await fs.rm('../../../documentation/default', { recursive: true, force: true })
        // await fs.rm('../../../scripts/default', { recursive: true, force: true })

        // install.js install copys all folders in update package to their destination folders
        await fs.cp('./api/default', '../../../api/default', { recursive: true })
        await fs.cp('./api/.env.example', '../../../api/.env.example')
        await fs.cp('./app/.env.example', '../../../app/.env.example')
        await fs.cp('./app/src/default', '../../../app/src/default', { recursive: true })
        await fs.cp('./documentation/default', '../../../documentation/default', { recursive: true })
        await fs.cp('./scripts/default', '../../../scripts/default', { recursive: true })

        console.log(`Finished installing update ${UPDATE_PACKAGE_VERSION}`)

        process.exit()

    } catch (error) {

        console.log(error)

    }

})()
