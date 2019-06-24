import 'core-js/stable'
import 'regenerator-runtime/runtime'
import axios from 'axios'
import crypto from 'crypto'

const isPasswordCompromised = async password => {
  if (!password || password === '') throw new Error('You must provide a password')

  const digest = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()
  const firstFive = digest.substr(0, 5)

  const { data } = await axios.get(`https://api.pwnedpasswords.com/range/${firstFive}`)
  const results = data.split('\r\n')

  let found = false
  results.forEach(result => {
    const parts = result.split(':')
    if (digest === `${firstFive}${parts[0]}`) found = true
  })

  return found
}

export default isPasswordCompromised
