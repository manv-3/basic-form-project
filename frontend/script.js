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

        let data;
        const text = await response.text();
        try {
            data = JSON.parse(text);
        } catch (e) {
            const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
            data = { error: `Server returned HTTP ${response.status}: ${cleanText.slice(0, 140)}` };
        }

        if (response.ok) {
            responseDiv.textContent = 'Success: ' + data.message;
            responseDiv.style.color = 'green';
            document.getElementById('contactForm').reset();
        } else {
            let errorMsg = 'Error: ' + (data.error || 'Something went wrong');
            if (data.incident_id) {
                errorMsg += `\nIncident Ray ID: ${data.incident_id}`;
            }
            responseDiv.style.whiteSpace = 'pre-line';
            responseDiv.textContent = errorMsg;
            responseDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        responseDiv.textContent = 'Failed to connect to the backend.';
        responseDiv.style.color = 'red';
    }
});
