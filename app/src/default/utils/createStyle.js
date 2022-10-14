export function createStyle(styles, names){

    return styles
        .filter(s => s && s[names])           // only use styles that exist
        .map(s => {                         // only give back their properties

            if(Array.isArray(s[names])){

                return s[names].join(' ')

            }

            return s[names]

        })
        .join(' ')                          // join the style classNames

}
