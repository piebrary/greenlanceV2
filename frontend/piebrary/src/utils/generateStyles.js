export function generateStyles(styles, key){

    return styles
        .filter(s => s && s[key])           // only use styles that exist
        .map(s => s[key])                   // only give back their properties
        .join(' ')                          // join the style classNames

}
