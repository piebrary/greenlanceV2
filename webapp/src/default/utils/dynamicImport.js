export default async function(preference, alternative){

    // if(!Array.isArray(preference)) preference = [preference]
    // if(!Array.isArray(alternative)) alternative = [alternative]

    const modules = []

    try {

        console.log(1)

        return await import (preference)

        preference.map(async path => {

            const result = await import (path)

            modules.push(result)

        })

    } catch {

        console.log(2)

        return await import (alternative)

        alternative.map(async path => {

            const result = await import (path)

            modules.push(result)

        })

    }

    // console.log(modules)
    //
    // return modules

}
