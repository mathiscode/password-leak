import { passwordStrength } from 'check-password-strength'

const API_URL = 'https://api.pwnedpasswords.com/range'

export type PasswordStrength = ReturnType<typeof passwordStrength>

export type PasswordCheckResult = {
  strength: PasswordStrength
  isLeaked: boolean
}

function assertPassword(password: string): string {
  if (typeof password !== 'string') {
    throw new Error('Password must be a string')
  }

  if (password.length === 0) {
    throw new Error('Password must not be empty')
  }

  return password
}

async function sha1Hex(value: string): Promise<string> {
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-1', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function isPasswordLeakedFromHash(hashHex: string): Promise<boolean> {
  const firstFive = hashHex.slice(0, 5).toUpperCase()
  const suffix = hashHex.slice(5).toUpperCase()
  const response = await fetch(`${API_URL}/${firstFive}`)

  if (!response.ok) {
    throw new Error(
      `Failed to check password leak status: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.text()
  return data.split(/\r?\n/).some((line) => {
    const [hash, count] = line.split(':')
    return hash === suffix && count !== undefined
  })
}

export async function checkPassword(password: string): Promise<PasswordCheckResult> {
  const normalizedPassword = assertPassword(password)

  return {
    strength: passwordStrength(normalizedPassword),
    isLeaked: await isPasswordLeaked(normalizedPassword)
  }
}

export function checkPasswordStrength(password: string): PasswordStrength {
  return passwordStrength(assertPassword(password))
}

export async function isPasswordLeaked(password: string): Promise<boolean> {
  const normalizedPassword = assertPassword(password)
  const hashHex = await sha1Hex(normalizedPassword)
  return isPasswordLeakedFromHash(hashHex)
}

export function isPasswordLeakedSync(
  password: string,
  callback: (error: Error | null, isLeaked: boolean) => void
): void {
  try {
    const normalizedPassword = assertPassword(password)

    void sha1Hex(normalizedPassword)
      .then((hashHex: string) => isPasswordLeakedFromHash(hashHex))
      .then((isLeaked: boolean) => callback(null, isLeaked))
      .catch((error: unknown) =>
        callback(error instanceof Error ? error : new Error(String(error)), false)
      )
  } catch (error) {
    callback(error instanceof Error ? error : new Error(String(error)), false)
  }
}

export default isPasswordLeaked
