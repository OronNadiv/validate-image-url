import isNumber from 'lodash.isnumber'
import isString from 'lodash.isstring'
// promise needs to be imported since browser may not support it natively.
import Promise from 'bluebird'

Promise.config({
  cancellation: true
})

export const ERROR_MESSAGE_LOAD_FAILED = 'Image load failed'
export const ERROR_MESSAGE_LOAD_TIMED_OUT = 'Image load timed out'

export default ({ url, timeout = 5000 }) => {
  if (!url || !isString(url)) {
    throw new Error(`Invalid url parameter.  url: ${url}`)
  }
  if (!isNumber(timeout) || timeout < 1) {
    throw new Error(`Invalid timeout parameter.  Expected timeout >= 1.  timeout: ${timeout}`)
  }
  return new Promise((resolve, reject) => {
    const image = new Image()
    let timedOut = false

    const errorHandler = () => {
      if (timedOut) {
        return
      }
      clearTimeout(timer)
      reject(new Error(ERROR_MESSAGE_LOAD_FAILED))
    }

    const timer = setTimeout(() => {
      timedOut = true
      // Reset .src to invalid URL so it stops previous fetch and does not trigger a new load.
      image.src = '//!!!/image.jpg'
      reject(new Error(ERROR_MESSAGE_LOAD_TIMED_OUT))
    }, timeout)

    image.onerror = image.onabort = errorHandler

    image.onload = () => {
      // If fetch has timed out, the URL would be modified in order to cancel the fetch.
      // Therefore, "onload" would never be called when "timedOut" is true.

      /* istanbul ignore next */
      if (timedOut) {
        return
      }
      clearTimeout(timer)
      resolve({ image, url })
    }
    image.src = url
  })
}
