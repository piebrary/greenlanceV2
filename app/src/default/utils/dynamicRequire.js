// import { lazy } from 'react'
// const path = require('path')
// console.log(path)

export default async function(source, alternativeSource, namespace){

    // const modules = []

    try {

        const result = await import (source)
        console.log(1, result)
        return result

        // return await import (source)
        //
        // source.map(async path => {
        //
        //     const result = await import (path)
        //
        //     modules.push(result)
        //
        // })

    } catch {

        const result2 = await import (alternativeSource)
        console.log(2, result2)
        return result2

        // console.log(2)
        //
        // return await import (alternativeSource)
        //
        // alternativeSource.map(async path => {
        //
        //     const result = await import (path)
        //
        //     modules.push(result)
        //
        // })

    }

    // console.log(modules)
    //
    // return modules

}
