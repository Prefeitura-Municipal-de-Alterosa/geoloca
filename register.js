import { supabase } from './supa/supabase.js';

document.getElementById('button-cadastro').addEventListener('click', signUp);

async function signUp() {
    const email = document.getElementById('email').value; 
    const senha = document.getElementById('senha').value; 

    if (!email || !senha) {
        document.getElementById('loginMessage').textContent = 'Por favor, preencha todos os campos.';
        return;
    }
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha
        });
    
        if (error) {
            throw error; 
        }
    
        console.log('Autenticação bem-sucedida:', data);
        window.location.href = 'index.html'; 
    } catch (error) {
      
        document.getElementById('loginMessage').textContent = `Falha na autenticação: ${error.message}`;
        console.error('Detalhes do erro:', error); 
    }
    
}
