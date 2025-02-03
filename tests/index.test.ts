import { isPasswordLeaked, isPasswordLeakedSync } from '../src'

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
