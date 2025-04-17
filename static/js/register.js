document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const togglePassword = document.getElementById('toggle-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    const passwordMatch = document.getElementById('password-match');
  
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
  
    toggleConfirmPassword.addEventListener('click', function() {
      const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPasswordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
  
    // Password strength checker
    passwordInput.addEventListener('input', function() {
      const strength = checkPasswordStrength(this.value);
      passwordStrength.textContent = strength.message;
      passwordStrength.className = 'password-strength ' + strength.class;
    });
  
    // Password match checker
    confirmPasswordInput.addEventListener('input', function() {
      if (this.value && passwordInput.value) {
        if (this.value === passwordInput.value) {
          passwordMatch.textContent = 'Passwords match';
          passwordMatch.className = 'password-match valid';
        } else {
          passwordMatch.textContent = 'Passwords do not match';
          passwordMatch.className = 'password-match invalid';
        }
      } else {
        passwordMatch.textContent = '';
      }
    });
  
    // Form submission
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      const termsAccepted = document.querySelector('input[name="terms"]').checked;
  
      // Validate form
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
  
      if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
  
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      if (!termsAccepted) {
        alert('You must accept the terms and conditions');
        return;
      }
  
      // In a real app, you would send this to your backend
      console.log('Registration attempt:', { name, email, password });
      
      // Simulate API call
      simulateRegistration(name, email, password)
        .then(() => {
          alert('Registration successful! Redirecting to login...');
          window.location.href = 'login.html';
        })
        .catch(error => {
          alert(error.message);
        });
    });
  
    // Check password strength
    function checkPasswordStrength(password) {
      // At least 8 characters, contains number, uppercase, lowercase, and special char
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
      // At least 6 characters, contains number, uppercase or lowercase
      const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
  
      if (strongRegex.test(password)) {
        return { message: 'Strong password', class: 'strong' };
      } else if (mediumRegex.test(password)) {
        return { message: 'Medium strength password', class: 'medium' };
      } else {
        return { message: 'Weak password (min 6 characters)', class: 'weak' };
      }
    }
  
    // Validate email format
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // Simulate registration function (replace with actual API call)
    function simulateRegistration(name, email, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock validation
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
          } else {
            resolve({ success: true });
          }
        }, 800); // Simulate network delay
      });
    }
  });