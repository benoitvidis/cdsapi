const { URL } = require('url')

const CDSApiRequest = require('./request')

class CDSApi {
  /**
   * @param {{
   *  key: string,
   *  url?: string
   * }} opts
   */
  constructor(opts) {
    if (!opts?.key) throw new Error(`at least key must be passed to the constructor`)

    this.baseUrl = (opts.url || 'https://cds.climate.copernicus.eu/api/v2').replace(/\/$/, '')

    this.key = opts.key
    this.headers = {
      Accept: 'application/json',
      Authorization: `Basic ${Buffer.from(this.key).toString('base64')}`,
      'Content-type': 'application/json',
    }
  }

  /**
   * @param {string} name
   * @param {CDSApiRequestOptions} opts
   * @returns {CDSApiRequest}
   */
  request(name, opts) {
    const url = new URL(`${this.baseUrl}/resources/${name}`)
    const options = {
      headers: this.headers,
      method: 'POST',
    }

    return new CDSApiRequest(url, options)
  }
}

module.exports = {
  CDSApi,
}
