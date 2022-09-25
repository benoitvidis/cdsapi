const { EventEmitter } = require('node:events')

const { fetch } = require('./helpers/fetch')

class CDSApiRequest extends EventEmitter {
  /**
   * @param {RequestInfo} url
   * @param {RequestInit} options
   */
  constructor(url, options) {
    super()

    this.url = url
    this.options = options
    this._sleep = 400
    this.sleepMax = 2 * 60 * 1000

    this._currentRequest = this._request()
    this._currentState
  }

  get sleep() {
    const v = this._sleep

    this._sleep = this._sleep * 1.5
    if (this._sleep > this.sleepMax) this._sleep = this.sleepMax

    return v
  }

  async complete() {
    if (this._currentState?.state === 'completed') return this._currentState
    if (this._currentState?.state === 'failed')
      throw new Error(`${this._currentState.error.message}\n${this._currentState.error.reason}`)

    if (!this._currentRequest) this._currentRequest = this._request()
    await this._currentRequest
    if (this._currentState?.state === 'completed') return this._currentState
    if (this._currentState?.state === 'failed')
      throw new Error(`${this._currentState.error.message}\n${this._currentState.error.reason}`)

    return new Promise((resolve, reject) => setTimeout(() => this.complete().then(resolve).catch(reject), this.sleep))
  }

  async state() {
    return this._currentRequest || this._currentState
  }

  async _request() {
    const response = await fetch(this.url, this.options)
    const body = await response.text()

    try {
      const json = JSON.parse(body)

      if (json.message) {
        let msg = json.message
        for (const { title, url } of json.context?.required_terms || []) {
          msg += `\nTo access this ressource, you must first accept the terms\nof ${title} at ${url}`
        }
        const err = new Error(msg)

        _events.emit('error', err)
        throw err
      }

      this.emit('state', json)
      this._currentState = json
      this._currentRequest = undefined

      if (json.state === 'completed') this.emit('complete', json)

      return json
    } catch (e) {
      this.emit('error', e)
      throw e
    }
  }
}

module.exports = CDSApiRequest
