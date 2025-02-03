import 'https://unpkg.com/check-password-strength@3.0.0/dist/umd.js'

const passwordInput = document.getElementById('passwordInput')
const checkButton = document.getElementById('checkButton')
const resultDiv = document.getElementById('result')
const visibilityToggle = document.querySelector('.visibility-toggle')

function setLoading(loading) {
    checkButton.disabled = loading
    checkButton.querySelector('.spinner').style.display = loading ? 'block' : 'none'
    checkButton.querySelector('.button-text').style.opacity = loading ? '0' : '1'
}

function showResult(isLeaked) {
    resultDiv.className = 'result animate ' + (isLeaked ? 'danger' : 'success')
    resultDiv.style.display = 'flex'
    
    const icon = resultDiv.querySelector('.result-icon')
    const text = resultDiv.querySelector('.result-text')
    
    if (isLeaked) {
        icon.textContent = '⚠️'
        text.textContent = 'This password has been found in data breaches. Please choose a different password.'
        createWarningEffect()
    } else {
        icon.textContent = '✅'
        text.textContent = 'Good news! This password hasn\'t been found in any known data breaches.'
        confetti()
    }
}

function createWarningEffect() {
    const existingOverlay = document.querySelector('.warning-overlay')
    if (existingOverlay) {
        existingOverlay.remove()
    }

    const overlay = document.createElement('div')
    overlay.className = 'warning-overlay'
    
    for (let i = 0; i < 4; i++) {
        const light = document.createElement('div')
        light.className = 'warning-light'
        overlay.appendChild(light)
    }

    document.body.appendChild(overlay)

    setTimeout(() => {
        overlay.classList.add('fade-out')
        setTimeout(() => overlay.remove(), 500)
    }, 3000)
}

async function checkPassword() {
    const password = passwordInput.value.trim()
    
    if (!password) {
        passwordInput.focus()
        return
    }

    const strengthMeter = document.querySelector('.password-strength-bar-fill')
    const strengthText = document.querySelector('.password-strength-text')
    const strength = checkPasswordStrength.passwordStrength(password)
    
    let strengthClass
    let strengthLabel
    
    switch (strength.id) {
        case 0:
            strengthClass = 'weak'
            strengthLabel = 'Your password is too weak'
            break
        case 1:
            strengthClass = 'fair'
            strengthLabel = 'Your password is weak'
            break
        case 2:
            strengthClass = 'good'
            strengthLabel = 'Your password is decent'
            break
        case 3:
            strengthClass = 'strong'
            strengthLabel = 'Your password is strong'
            break
        default:
            strengthClass = 'weak'
            strengthLabel = 'Your password is too weak'
    }
    
    strengthMeter.className = 'password-strength-bar-fill ' + strengthClass
    strengthText.textContent = strengthLabel

    setLoading(true)
    resultDiv.style.display = 'none'
    
    try {
        if (location.hostname === 'localhost') await import('./dist/index.js')
        else await import('./index.js')
        
        const isLeaked = await window.isPasswordLeaked(password)
        showResult(isLeaked)
    } catch (error) {
        console.error('Error checking password:', error)
        resultDiv.className = 'result animate danger'
        resultDiv.querySelector('.result-icon').textContent = '❌'
        resultDiv.querySelector('.result-text').textContent = 'An error occurred. Please try again.'
    } finally {
        setLoading(false)
    }
}

checkButton.addEventListener('click', checkPassword)
passwordInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') checkPassword()
})

visibilityToggle.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password'
    passwordInput.type = type
    visibilityToggle.querySelector('.icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️'
})

// Clear result when input changes
passwordInput.addEventListener('input', () => {
    resultDiv.style.display = 'none'
})
