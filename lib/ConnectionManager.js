import ImapClient from 'emailjs-imap-client'

class ConnectionManager {
  constructor () {
    this._instances = []
  }
  async add (config) {
    const newInstance = {
      user: config.user,
      instance: new ImapClient(config.host, config.port, {
        logLevel: 'error',
        auth: {
          user: config.user,
          pass: config.pass
        },
        requireTLS: config.requireTLS
      })
    }
    await newInstance.instance.connect()
    this._instances.push(newInstance)
    return newInstance.instance
  }
  get (user) {
    const instance = this._instances.find(ins => ins.user === user)
    if (instance) return instance.instance
    else return null
  }
}

export const Connections = new ConnectionManager()
