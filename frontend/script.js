// Routed through Vercel WAF Rewrite to SecureScript on Render
const BACKEND_URL = '/api/submit';

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const responseDiv = document.getElementById('responseMessage');
    
    responseDiv.textContent = 'Submitting...';
    responseDiv.style.color = 'black';

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.textContent = 'Success: ' + data.message;
            responseDiv.style.color = 'green';
            document.getElementById('contactForm').reset();
        } else {
            responseDiv.textContent = 'Error: ' + (data.error || 'Something went wrong');
            responseDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        responseDiv.textContent = 'Failed to connect to the backend.';
        responseDiv.style.color = 'red';
    }
});
