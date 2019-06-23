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
  - [ES7](#ES7)
  - [Pre-ES7](#Pre-ES7)

---

## Introduction

`node-password-leak` is a module that can be used to check if a password is compromised by checking with the [Have I Been Pwned API](https://haveibeenpwned.com/API/).

## How is this safe?

Your passwords are **NEVER** transmitted to any other system. This addon makes use of the [Have I Been Pwned API](https://haveibeenpwned.com/API/), which implements a [k-Anonymity Model](https://en.wikipedia.org/wiki/K-anonymity) so your password can be checked without ever having to give your password to any other party.

## Installation

`npm install password-leak`

## Usage

### ES7

```js
import checkPassword from 'password-leak'
const isCompromised = await checkPassword('myPassword')
```

### Pre-ES7

```js
const checkPassword = require('password-leak').default
checkPassword('myPassword')
  .then(result => console.log('Is compromised?', result))
```
