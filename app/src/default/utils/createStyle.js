export function createStyle(styles, classNames){

    return styles
        .filter(s => {

            if(s && Array.isArray(classNames)){

                // if(classNames.length === 2) console.log(classNames, classNames.filter(cl => s && s[cl]))

                return classNames.filter(cl => s && s[cl])

            }

            if(s && s[classNames]){

                return s[classNames]

            }

        })
        .map(s => {

            if(Array.isArray(classNames)){

                const ret = classNames
                    .filter(cl => s[cl])
                    .map(cl => s && s[cl])
                    .join(' ')

                return ret

            }

            return s[classNames]

        })
        .join(' ')

}


// export function createStyle(styles, names){
//
//     return styles
//         .filter(s => s && s[names])           // only use styles that exist
//         .map(s => {                         // only give back their properties
//
//             if(Array.isArray(s[names])){
//
//                 return s[names].join(' ')
//
//             }
//
//             return s[names]
//
//         })
//         .join(' ')                          // join the style classNames
//
// }
