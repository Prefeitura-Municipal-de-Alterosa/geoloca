import {supabase} from './supa/supabase.js';

document.getElementById('button-login').addEventListener('click', login);

async function login() {
    const email = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value; 

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        console.error('Erro:', error.message);
        document.getElementById('loginMessage').textContent = 'Falha na autenticação, verifique suas credenciais.';
    } else {
        console.log('Autenticação bem-sucedida:', data);
        window.location.href = 'index.html'; 
    }
}