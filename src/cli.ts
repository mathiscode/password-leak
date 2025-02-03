#!/usr/bin/env node

import readline from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'
import { isPasswordLeaked } from './index'

const args = process.argv.slice(2)

async function promptPassword(): Promise<string> {
  const rl = readline.createInterface({ input, output })
  
  return new Promise(resolve => {
    rl.question('Enter password to check: ', (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function main() {
  try {
    const password = args[0] || await promptPassword()
    const isLeaked = await isPasswordLeaked(password)
    console.log(`Password ${isLeaked ? 'has' : 'has not'} been compromised`)
    process.exit(isLeaked ? 1 : 0)
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

main()
