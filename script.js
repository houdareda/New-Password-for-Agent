document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('agentForm');
    const submitBtn = document.getElementById('submitBtn');
    const statusMessage = document.getElementById('statusMessage');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update Icon (Simple SVG switch for demo purposes, or just toggle classes if using icon font)
        if (type === 'text') {
            togglePasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
        } else {
            togglePasswordBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI Feedback - Start Loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        statusMessage.className = 'hidden';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Sheet Monkey submission
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success State
                statusMessage.textContent = 'تم تسجيل البيانات بنجاح! | Data Registered Successfully!';
                statusMessage.classList.add('success');
                form.reset();
            } else {
                // Error State (Server side)
                throw new Error('Server response not ok');
            }
        } catch (error) {
            // Error State (Network or other)
            console.error('Submission Error:', error);
            statusMessage.textContent = 'حدث خطأ أثناء التسجيل. حاول مرة أخرى. | Registration Failed. Try Again.';
            statusMessage.classList.add('error');
        } finally {
            // Reset Button State
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
});
