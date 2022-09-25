/**
 * @typedef {import('node-fetch').RequestInfo} RequestInfo
 * @typedef {import('node-fetch').RequestInit} RequestInit
 * @typedef {import('node-fetch').Response} Response
 */

let _fetch

/**
 * @param {RequestInfo} url
 * @param {RequestInit | undefined} options
 * @returns {Promise<Response>}
 */
const fetch = async (url, options = {}) => {
  if (!_fetch) {
    const { default: fetch } = await import('node-fetch')
    _fetch = fetch
  }

  return _fetch(url, options)
}

module.exports = {
  fetch,
}
