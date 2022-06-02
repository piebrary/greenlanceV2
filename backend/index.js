try {

    require('./lib/custom/server')()

} catch {

    require('./lib/default/server')()

}
