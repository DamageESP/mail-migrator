import { Connections } from './ConnectionManager'

class Mailbox {
  constructor ({user, path}) {
    this.user = user
    this.path = path
  }
  async getMessages () {
    const conn = Connections.get(this.user)
    const messages = await conn.listMessages(this.path, '1:*', ['uid', 'body[]'])
    return messages
  }
  async addMessage (message) {
    const conn = Connections.get(this.user)
    const res = await conn.upload(this.path, JSON.parse(message)['body[]'])
    return res
  }
}

export default Mailbox
