/**
 * Mail Migrator
 * Author: Víctor "DamageESP" Campos <victor@palacioweb.com> - 2019
 * =============
 * This script connects to an email account A, all its boxes, and all messages inside all boxes. Then, it connects to
 * an email account B, and copies all boxes and messages from account A to account B.
 * 
 * In the process, it keeps track of migrated messages, so in case the migration fails, it can resume from where it stopped.
 * 
 */

const Migrator = require('../lib/Migrator')

const fromConfig = {
  host: 'myawesomesite.com',
  port: 993, 
  user: 'from@myawesomesite.com',
  pass: 'password',
  requireTLS: true
}

const toConfig = {
  host: 'myothersite.com',
  port: 993,
  user: 'to@myothersite.com',
  pass: 'password',
  requireTLS: true
}

const migrator = new Migrator(fromConfig, toConfig)

migrator.init().then(async () => {
  await migrator.migrate()
  console.log('migration complete')
})
