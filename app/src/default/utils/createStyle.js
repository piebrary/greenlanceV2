export function createStyle(styles, classNames){

    return styles
        .filter(s => {

            if(s && Array.isArray(classNames)){

                return classNames
                    .filter(cl => s && s[cl])
                    .join(' ')

            }

            if(s && s[classNames]){

                return s[classNames]

            }

        })
        .map(s => {

            if(Array.isArray(s[classNames])){

                return s[classNames].join(' ')

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
