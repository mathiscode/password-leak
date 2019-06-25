<!-- markdownlint-disable MD026 -->

# password-leak <!-- omit in toc -->

[![Build Status](https://travis-ci.org/mathiscode/password-leak.svg?branch=master)](https://travis-ci.org/mathiscode/password-leak)
[![Standardjs](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mathiscode/password-leak/compare)
[![GitHub license](https://img.shields.io/github/license/mathiscode/password-leak.svg?color=blue)](https://github.com/mathiscode/password-leak/blob/master/LICENSE)

Also check out the [password-leak-monitor](https://github.com/mathiscode/password-leak-monitor) browser extension!

---

- [Introduction](#Introduction)
- [How is this safe?](#How-is-this-safe)
- [Installation](#Installation)
- [Usage in Browser](#Usage-in-Browser)
- [Usage in Node.js](#Usage-in-Nodejs)
  - [ES8](#ES8)
  - [Pre-ES8](#Pre-ES8)
- [Usage in Command Line](#Usage-in-Command-Line)

---

## Introduction

`password-leak` is a JavaScript module that can be used to determine if a password is compromised by checking with the [Have I Been Pwned API](https://haveibeenpwned.com/API/).

## How is this safe?

Your passwords are **NEVER** transmitted to any other system. This library makes use of the [Have I Been Pwned API](https://haveibeenpwned.com/API/), which implements a [k-Anonymity Model](https://en.wikipedia.org/wiki/K-anonymity) so your password can be checked without ever having to give it to any other party.

## Installation

`npm install password-leak`

## Usage in Browser

```html
<script src="https://cdn.jsdelivr.net/npm/password-leak@latest"></script>

<script>
  isPasswordCompromised('myPassword').then(isCompromised => {
    console.log('Is compromised?', isCompromised)
  })
</script>
```

## Usage in Node.js

### ES8

```js
import isPasswordCompromised from 'password-leak'

const isCompromised = await isPasswordCompromised('myPassword')
console.log('Is compromised?', isCompromised)
```

### Pre-ES8

```js
const isPasswordCompromised = require('password-leak').default

isPasswordCompromised('myPassword').then(isCompromised => {
  console.log('Is compromised?', isCompromised)
})
```

## Usage in Command Line

Install globally, locally, or use `npx password-leak`

```sh
npm install -g password-leak # global
npm install password-leak # local
```

You can then run `password-leak` to interactively enter the masked password, or provide the password as an argument, eg. `password-leak myPassword`

The exit status will be 0 (not compromised) or 1 (compromised).
