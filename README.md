<!-- markdownlint-disable MD026 -->

# node-password-leak <!-- omit in toc -->

[![Build Status](https://travis-ci.org/mathiscode/node-password-leak.svg?branch=master)](https://travis-ci.org/mathiscode/node-password-leak)
[![Standardjs](https://img.shields.io/badge/code_style-standard-blue.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/mathiscode/node-password-leak/compare)
[![GitHub license](https://img.shields.io/github/license/mathiscode/node-password-leak.svg?color=blue)](https://github.com/mathiscode/node-password-leak/blob/master/LICENSE)

Also check out the [password-leak-monitor](https://github.com/mathiscode/password-leak-monitor) browser extension!

---

- [Introduction](#Introduction)
- [How is this safe?](#How-is-this-safe)
- [Installation](#Installation)
- [Usage](#Usage)
  - [ES8](#ES8)
  - [Pre-ES8](#Pre-ES8)

---

## Introduction

`node-password-leak` is a module that can be used to determine if a password is compromised by checking with the [Have I Been Pwned API](https://haveibeenpwned.com/API/).

## How is this safe?

Your passwords are **NEVER** transmitted to any other system. This library makes use of the [Have I Been Pwned API](https://haveibeenpwned.com/API/), which implements a [k-Anonymity Model](https://en.wikipedia.org/wiki/K-anonymity) so your password can be checked without ever having to give your password to any other party.

## Installation

`npm install password-leak`

## Usage

### ES8

```js
import checkPassword from 'password-leak'
const isCompromised = await checkPassword('myPassword')
console.log('Is compromised?', isCompromised)
```

### Pre-ES8

```js
const checkPassword = require('password-leak').default
checkPassword('myPassword')
  .then(isCompromised => console.log('Is compromised?', isCompromised))
```
