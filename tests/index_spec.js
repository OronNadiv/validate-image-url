import index, { ERROR_MESSAGE_LOAD_FAILED, ERROR_MESSAGE_LOAD_TIMED_OUT } from '../src'
import { expect } from 'chai'

// Math.random to prevent using browser's cache
const IMAGE_EXISTS_URL = () => `https://i.imgur.com/07uLXwc.jpg?${Math.random()}`
const IMAGE_DOES_NOT_EXIST_URL = () => `http://fake-url/!!!/1.jpg?${Math.random()}`
const TIMEOUT = 4000

describe('Image loader', () => {
  describe('Image exists', () => {
    it('without timeout', (done) => {
      index({ url: IMAGE_EXISTS_URL() })
        .then(() => done())
        .catch(() => {
          done.fail('should not be rejected')
        })
    })

    it('with timeout', (done) => {
      index({ url: IMAGE_EXISTS_URL(), timeout: 1 })
        .then(() => {
          done.fail('should not be resolved')
        })
        .catch(err => {
          expect(!!err).to.be.true
          expect(err.message).to.equal(ERROR_MESSAGE_LOAD_TIMED_OUT)
          // for code coverage, it waits for onError to complete
          setTimeout(done, TIMEOUT)
        })
    })

    it('canceled with timeout', (done) => {
      const promise = index({ url: IMAGE_EXISTS_URL() })
        .then(() => {
          done.fail('should not be resolved')
        })
        .catch(() => {
          done.fail('should not be rejected')
        })
      promise.cancel()
      setTimeout(() => {
        done()
      }, TIMEOUT)
    })
  })

  describe('Image does not exist', () => {
    it('without timeout', (done) => {
      index({ url: IMAGE_DOES_NOT_EXIST_URL() })
        .then(() => {
          done.fail('should not be resolved')
        })
        .catch(err => {
          expect(!!err).to.be.true
          expect(err.message).to.equal(ERROR_MESSAGE_LOAD_FAILED)
          done()
        })
    })

    it('with timeout', (done) => {
      index({ url: IMAGE_DOES_NOT_EXIST_URL(), timeout: 1 })
        .then(() => {
          done.fail('should not be resolved')
        })
        .catch(err => {
          expect(!!err).to.be.true
          expect(err.message).to.equal(ERROR_MESSAGE_LOAD_TIMED_OUT)
          // for code coverage, it waits for onError to complete
          setTimeout(done, TIMEOUT)
        })
    })
  })

  const invalidUrls = [null, undefined, '', 0, 123, false]
  invalidUrls.forEach((url) => {
    it(`url parameter is invalid.  url: ${url}`, (done) => {
      expect(() => index({ url })).to.throw(Error)
      done()
    })
  })

  const validUrls = ['abc', 'http://abc', 'https://abc']
  validUrls.forEach((url) => {
    it(`url parameter valid.  url: ${url}`, (done) => {
      index({ url })
      done()
    })
  })

  const invalidTimeouts = [-1, 0, 'abc', '', false, null]
  invalidTimeouts
    .forEach((timeout) => {
      it(`timeout parameter is invalid. timeout: ${timeout}`, (done) => {
        expect(() => index({ url: IMAGE_EXISTS_URL(), timeout })).to.throw(Error)
        done()
      })
    })
  const validTimeouts = [undefined, 1000]
  validTimeouts
    .forEach((timeout) => {
      it(`timeout parameter is invalid. timeout: ${timeout}`, (done) => {
        index({ url: IMAGE_EXISTS_URL(), timeout })
        done()
      })
    })
})
