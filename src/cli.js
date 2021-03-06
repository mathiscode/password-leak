import readline from 'readline-sync'
import isPasswordCompromised from './'

let password = process.argv[2]

if (!password) {
  password = readline.question('Enter the password to check: ', {
    hideEchoBack: true
  })
}

isPasswordCompromised(password)
  .then(isCompromised => {
    console.log(`Password is ${isCompromised ? 'compromised' : 'not compromised'}!`)
    process.exit(Number(isCompromised))
  })
