import { Connections } from './ConnectionManager'
import Mailbox from './Mailbox'

class Account {
  constructor (config) {
    this.config = config
    this.user = config.user
    this._boxes = []
  }
  async init () {
    await Connections.add(this.config)
  }
  async getBoxes () {
    const conn = Connections.get(this.user)
    const rawBoxes = await conn.listMailboxes()
    const boxes = []
    rawBoxes.children.forEach(rawBox => {
      boxes.push(new Mailbox({ user: this.user, path: rawBox.path }))
    })
    console.log(boxes)
    return boxes
  }
}

export default Account