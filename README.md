### mail-migrator

Easily migrate an email account to another server using NodeJS.

## Usage

Create an `index.js` file, using `index.example.js` as a template:

```javascript
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
```

Save the file and then run `npm run dev` (probably will be changed to a different command).
