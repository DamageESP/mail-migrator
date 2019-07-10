import Account from './Account'

class Migrator {
  constructor (sourceConfig, destinationConfig) {
    this.sourceConfig = sourceConfig
    this.destinationConfig = destinationConfig
  }
  async init () {
    this.sourceAccount = new Account(this.sourceConfig)
    this.destinationAccount = new Account(this.destinationConfig)
    await this.sourceAccount.init()
    await this.destinationAccount.init()
  }
  async migrate () {
    const sourceBoxes = await this.sourceAccount.getBoxes()
    const targetBoxes = await this.destinationAccount.getBoxes()
    sourceBoxes.forEach(async sourceBox => {
      const messages = await sourceBox.getMessages()
      messages.forEach(message => {
        try {
          const targetBox = targetBoxes.find(box => box.path === sourceBox.path)
          targetBox.addMessage(JSON.stringify(message)).then(res => console.log(res))
        } catch (err) {
          console.log('No se ha podido copiar el mensaje -> ' + JSON.stringify(message))
        }
      })
    })
  }
}

module.exports = Migrator
