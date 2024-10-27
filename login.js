const SUPABASE_URL = 'https://swnloxsknktfmqjrgcar.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3bmxveHNrbmt0Zm1xanJnY2FyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3OTg2MjIsImV4cCI6MjA0NTM3NDYyMn0.TdVsqRuhTgYXD5jbF0KFPnQ0TrmtUhWtWTmBKwfipSw';

document.getElementById('button-login').addEventListener('click', login);

function login() {
    const email = document.getElementById('email').value; 
    const senha = document.getElementById('password').value; 

    fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na autenticação: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Autenticação bem-sucedida:', data);
        window.location.href = 'index.html'; 
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('loginMessage').textContent = 'Falha na autenticação, verifique suas credenciais.';
    });
}
