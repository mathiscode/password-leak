<!-- markdownlint-disable MD026 -->

# @mathiscode/password-leak <!-- omit in toc -->

[![Live Demo](https://img.shields.io/badge/live-demo-blue?style=for-the-badge)](https://password-leak.vercel.app)

[![Version](https://img.shields.io/npm/v/@mathiscode/password-leak.svg?color=blue)](https://www.npmjs.com/package/@mathiscode/password-leak)
[![Downloads](https://img.shields.io/npm/dm/@mathiscode/password-leak.svg?color=blue)](https://www.npmjs.com/package/@mathiscode/password-leak)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mathiscode/password-leak/compare)
[![GitHub license](https://img.shields.io/github/license/mathiscode/password-leak.svg?color=blue)](https://github.com/mathiscode/password-leak/blob/master/LICENSE.md)
[![Known Vulnerabilities](https://snyk.io/test/github/mathiscode/password-leak/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mathiscode/password-leak?targetFile=package.json)

---

- [Introduction](#introduction)
- [How is this safe?](#how-is-this-safe)
- [Installation](#installation)
- [Usage in Browser](#usage-in-browser)
- [Usage in Node.js](#usage-in-nodejs)
  - [With import/await](#with-importawait)
  - [With require/sync](#with-requiresync)
- [Usage in Command Line](#usage-in-command-line)
- [Development](#development)
- [Project status](#project-status)

---

## Introduction

`password-leak` is a JavaScript module that can be used to determine if a password is compromised by checking with the [Have I Been Pwned API](https://haveibeenpwned.com/API/).

## How is this safe?

Your passwords are **NEVER** transmitted to any other system. This library makes use of the [Have I Been Pwned API](https://haveibeenpwned.com/API/), which implements a [k-Anonymity Model](https://en.wikipedia.org/wiki/K-anonymity) so your password can be checked without ever having to give it to any other party.

## Installation

```sh
npm install @mathiscode/password-leak@latest
```

This package targets modern Node.js versions and exposes a typed, Promise-based API.

## Usage in Browser

```html
<script type="module" src="https://unpkg.com/@mathiscode/password-leak@latest"></script>

<script type="module">
  const isLeaked = await isPasswordLeaked('myPassword')
  const strength = await checkPasswordStrength('myPassword')
  console.log('Is leaked?', isLeaked)
  console.log('Strength', strength)
</script>
```

## Usage in Node.js

### With import/await

```js
import { isPasswordLeaked, checkPasswordStrength } from '@mathiscode/password-leak'

const isLeaked = await isPasswordLeaked('myPassword')
const strength = await checkPasswordStrength('myPassword')
console.log('Is leaked?', isLeaked)
console.log('Strength', strength)
```

### With require/sync

```js
const { checkPasswordStrength, isPasswordLeakedSync } = require('@mathiscode/password-leak')

isPasswordLeakedSync('myPassword', (error, isLeaked) => {
  if (error) throw error
  console.log('Is leaked?', isLeaked)
})

const strength = checkPasswordStrength('myPassword')
console.log('Strength', strength)
```

The Promise-based API is the recommended interface for new code.

## Usage in Command Line

Install globally:

```sh
npm install -g @mathiscode/password-leak
```

You can also use it without installing via npx:

```sh
npx @mathiscode/password-leak myPassword
```

You can then use it in two ways:

1. Interactive mode:

```sh
password-leak
```

2. Direct mode:

```sh
password-leak myPassword
```

The command will:

- Print whether the password has been compromised and its strength
- Exit with status code 0 if the password is safe
- Exit with status code 1 if the password is compromised or an error occurs

## Development

```sh
# Clone the repository
git clone https://github.com/mathiscode/password-leak.git
cd password-leak

# Install dependencies
pnpm install

# Run type-checking
pnpm exec tsc --noEmit

# Run tests
pnpm exec jest --runInBand

# Build the project
pnpm run build

# Lint the codebase
pnpm exec eslint . --ext .ts

# Start the UI demo
pnpm run ui # demo at https://password-leak.vercel.app
```

## Project status

This project now uses a modernized setup with:

- TypeScript strict checking
- ESLint and Prettier validation
- CI automation for linting, tests, and type checks
- a safer, non-global export surface for library usage

The recommended API remains the async functions such as `isPasswordLeaked` and `checkPassword`.
