<!-- markdownlint-disable MD026 -->

# password-leak <!-- omit in toc -->

[![Version](https://img.shields.io/npm/v/@mathiscode/password-leak.svg?color=blue)](https://www.npmjs.com/package/@mathiscode/password-leak)
[![Standardjs](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mathiscode/password-leak/compare)
[![GitHub license](https://img.shields.io/github/license/mathiscode/password-leak.svg?color=blue)](https://github.com/mathiscode/password-leak/blob/master/LICENSE)

[![Build Status](https://travis-ci.org/mathiscode/password-leak.svg?branch=master)](https://travis-ci.org/mathiscode/password-leak)
[![Dependency Status](https://img.shields.io/david/mathiscode/password-leak.svg)](https://david-dm.org/mathiscode/password-leak)
[![devDependency Status](https://img.shields.io/david/dev/mathiscode/password-leak.svg)](https://david-dm.org/mathiscode/password-leak)
[![Known Vulnerabilities](https://snyk.io/test/github/mathiscode/password-leak/badge.svg?targetFile=package.json)](https://snyk.io/test/github/mathiscode/password-leak?targetFile=package.json)

Also check out the [password-leak-monitor](https://github.com/mathiscode/password-leak-monitor) browser extension!

---

- [Introduction](#Introduction)
- [How is this safe?](#How-is-this-safe)
- [Installation](#Installation)
- [Usage in Browser](#Usage-in-Browser)
- [Usage in Node.js](#Usage-in-Nodejs)
  - [With import/await](#With-importawait)
  - [With require/promises](#With-requirepromises)
- [Usage in Command Line](#Usage-in-Command-Line)

---

## Introduction

`password-leak` is a JavaScript module that can be used to determine if a password is compromised by checking with the [Have I Been Pwned API](https://haveibeenpwned.com/API/).

## How is this safe?

Your passwords are **NEVER** transmitted to any other system. This library makes use of the [Have I Been Pwned API](https://haveibeenpwned.com/API/), which implements a [k-Anonymity Model](https://en.wikipedia.org/wiki/K-anonymity) so your password can be checked without ever having to give it to any other party.

## Installation

`npm install @mathiscode/password-leak`

## Usage in Browser

```html
<script src="https://cdn.jsdelivr.net/npm/@mathiscode/password-leak@latest"></script>

<script>
  isPasswordCompromised('myPassword').then(isCompromised => {
    console.log('Is compromised?', isCompromised)
  })
</script>
```

## Usage in Node.js

### With import/await

```js
import isPasswordCompromised from '@mathiscode/password-leak'

const isCompromised = await isPasswordCompromised('myPassword')
console.log('Is compromised?', isCompromised)
```

### With require/promises

```js
const isPasswordCompromised = require('@mathiscode/password-leak').default

isPasswordCompromised('myPassword').then(isCompromised => {
  console.log('Is compromised?', isCompromised)
})
```

## Usage in Command Line

Install globally, or use `npx @mathiscode/password-leak`

```sh
npm install -g @mathiscode/password-leak
```

You can then run `password-leak` to interactively enter the masked password, or provide the password as an argument, eg. `password-leak myPassword`

The exit status will be 0 (not compromised) or 1 (compromised).
