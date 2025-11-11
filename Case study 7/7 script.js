// Wait for the DOM to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', function() {

    // --- a) Access Form Elements ---
    const form = document.getElementById('registrationForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const website = document.getElementById('website');
    const password = document.getElementById('password');
    const rePassword = document.getElementById('rePassword');
    const terms = document.getElementById('terms');
    
    // Get elements for displaying errors
    const errorMessages = document.getElementById('errorMessages');
    const passwordMatchError = document.getElementById('passwordMatchError');

    // --- a) Manipulate Form Elements (Populate Birthday Dropdowns) ---

    // Populate Days (1-31)
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Populate Months
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate Years (e.g., last 100 years)
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // --- c) Use 'focus' and 'blur' Events ---
    // Get all text/email/password inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

    inputs.forEach(input => {
        // 'focus' event: triggered when the user clicks into the input
        input.addEventListener('focus', function() {
            // a) Manipulate element style
            this.style.backgroundColor = '#f0f8ff'; // Light AliceBlue
            this.style.borderColor = '#60a5fa'; // Blue-400
        });

        // 'blur' event: triggered when the user clicks out of the input
        input.addEventListener('blur', function() {
            // a) Manipulate element style
            this.style.backgroundColor = '#ffffff'; // White
            this.style.borderColor = '#d1d5db'; // Gray-300
        });
    });

    // --- c) Use 'change' Event (for real-time password match) ---
    // 'change' event fires when the value is committed (e.g., on blur)
    rePassword.addEventListener('change', function() {
        validatePasswordMatch();
    });
    
    // Also check on 'keyup' for more immediate feedback
     rePassword.addEventListener('keyup', function() {
        validatePasswordMatch();
    });

    function validatePasswordMatch() {
         if (password.value !== rePassword.value) {
            passwordMatchError.textContent = 'Passwords do not match.';
        } else {
            passwordMatchError.textContent = '';
        }
    }


    // --- c) Use 'submit' Event (for form validation) ---
    form.addEventListener('submit', function(event) {
        // IMPORTANT: Prevent the form from submitting in the traditional way
        event.preventDefault();

        // b) Validate User Input
        let errors = [];
        
        // Clear previous errors
        errorMessages.innerHTML = '';
        errorMessages.className = 'mb-4 p-4 bg-red-100 text-red-700 rounded-lg'; // Reset to error style

        // 1. Check mandatory empty fields
        if (firstName.value.trim() === '') {
            errors.push('Firstname is required.');
        }
        if (username.value.trim() === '') {
            errors.push('Username is required.');
        }
        if (password.value === '') {
            errors.push('Password is required.');
        }
        if (rePassword.value === '') {
            errors.push('Re-password is required.');
        }

        // 2. Check E-mail format (if not empty)
        if (email.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                errors.push('Please enter a valid E-mail address.');
            }
        }

        // 3. Check if passwords match
        if (password.value !== rePassword.value) {
            errors.push('Passwords do not match.');
        }

        // 4. Check if terms are agreed to
        if (!terms.checked) {
            errors.push('You must agree to the terms & conditions.');
        }

        // --- Display Validation Results ---
        if (errors.length > 0) {
            // If there are errors, display them
            errorMessages.innerHTML = errors.join('<br>');
        } else {
            // If no errors, show success
            errorMessages.innerHTML = '<strong>Success!</strong> Your account has been created.';
            errorMessages.className = 'mb-4 p-4 bg-green-100 text-green-700 rounded-lg'; // Change to success style
            
            // a) Manipulate form - e.g., reset it
            form.reset();
            // Clear dropdowns back to placeholder
            daySelect.value = '';
            monthSelect.value = '';
            yearSelect.value = '';
            passwordMatchError.textContent = '';
        }
    });

});