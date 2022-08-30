let initDb

try { initDb = require('./backend/custom/scripts/dev/init-db.js') } catch { initDb = require('./backend/default/scripts/dev/init-db.js') }

initDb()
