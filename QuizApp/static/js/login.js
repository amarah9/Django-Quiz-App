document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
  
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
  
    // Form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value.trim();
      const password = passwordInput.value;
      const rememberMe = document.querySelector('input[name="remember"]').checked;
  
      // Basic validation
      if (!username || !password) {
        alert('Please fill in all fields');
        return;
      }
  
      // In a real app, you would send this to your backend
      console.log('Login attempt:', { username, password, rememberMe });
      
      // Simulate API call
      simulateLogin(username, password)
        .then(() => {
          // On successful login
          alert('Login successful! Redirecting to dashboard...');
          // window.location.href = 'dashboard.html';
        })
        .catch(error => {
          alert(error.message);
        });
    });
  
    // Social login buttons
    document.querySelector('.social-login.google').addEventListener('click', function() {
      alert('Redirecting to Google authentication...');
      // Implement actual OAuth flow in a real app
    });
  
    // Simulate login function (replace with actual API call)
    function simulateLogin(username, password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock validation
          const validUsers = [
            { username: 'admin', password: 'admin123' },
            { username: 'user@example.com', password: 'password123' }
          ];
  
          const isValid = validUsers.some(user => 
            (user.username === username || user.email === username) && 
            user.password === password
          );
  
          if (isValid) {
            resolve({ success: true });
          } else {
            reject(new Error('Invalid username or password'));
          }
        }, 800); // Simulate network delay
      });
    }
  });