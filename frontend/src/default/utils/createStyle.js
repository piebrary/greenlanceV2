export function createStyle(styles, key){

    return styles
        .filter(s => s && s[key])           // only use styles that exist
        .map(s => {                         // only give back their properties

            if(Array.isArray(s[key])) return s[key].join(' ')

            return s[key]

        })
        .join(' ')                          // join the style classNames

}
