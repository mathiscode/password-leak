/* global describe, it */

const chai = require('chai')
const uuid = require('uuid').v4

chai.use(require('chai-as-promised'))
chai.should()

const checkPassword = require('../dist').default
const randomPassword = uuid()

describe('node-password-leak', done => {
  it('should throw error on undefined password', () => {
    return checkPassword().should.eventually.be.rejected
  })

  it('should throw error on empty password', () => {
    return checkPassword('').should.eventually.be.rejected
  })

  it('should report "test" as compromised', () => {
    return checkPassword('test').should.eventually.be.true
  })

  it(`should report "${randomPassword}" as not compromised`, () => {
    return checkPassword(randomPassword).should.eventually.be.false
  })
})
