import { checkPassword, checkPasswordStrength, isPasswordLeaked, isPasswordLeakedSync } from '../src'

describe('isPasswordLeaked', () => {
  test('Leaked password detected', async () => {
    expect(await isPasswordLeaked('password')).toBe(true)
    const syncCallback = jest.fn((error, isLeaked) => {
      expect(error).toBeNull()
      expect(isLeaked).toBe(true)
    })

    isPasswordLeakedSync('password', syncCallback)
  })

  test('Non-leaked password not detected', async () => {
    expect(await isPasswordLeaked(Math.random().toString(36))).toBe(false)
    const syncCallback = jest.fn((error, isLeaked) => {
      expect(error).toBeNull()
      expect(isLeaked).toBe(false)
    })

    isPasswordLeakedSync(Math.random().toString(36), syncCallback)
  })

  test('Non-string input throws an error', async () => {
    await expect(isPasswordLeaked(123 as any)).rejects.toThrow()
    const syncCallback = jest.fn((error, isLeaked) => {
      expect(error).toBeInstanceOf(Error)
      expect(isLeaked).toBe(false)
    })

    isPasswordLeakedSync(123 as any, syncCallback)
  })
})

describe('checkPassword', () => {
  test('Returns strength and isLeaked', async () => {
    const result = await checkPassword(Math.random().toString(36))
    expect(result.strength.id).toBeGreaterThan(0)
    expect(result.isLeaked).toBe(false)
  })
})

describe('checkPasswordStrength', () => {
  test('Returns strength', () => {
    const strength = checkPasswordStrength(Math.random().toString(36))
    expect(strength.id).toBeGreaterThan(0)
  })
})
