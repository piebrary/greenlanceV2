try {

    require('./custom/server')()

} catch {

    require('./default/server')()

}
