// Funcionalidade para mostrar/esconder senha
document.addEventListener('DOMContentLoaded', function() {
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Mudar o ícone
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validação simples
            if (!email || !password) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            // Simulação de autenticação (em um sistema real isso seria feito com backend)
            if (email === 'demo@example.com' && password === 'demo123') {
                // Salvar no localStorage para simular persistência
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({
                        email: email,
                        name: 'Usuário Demo'
                    }));
                } else {
                    sessionStorage.setItem('user', JSON.stringify({
                        email: email,
                        name: 'Usuário Demo'
                    }));
                }
                
                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Simular login para qualquer usuário (apenas para demonstração)
                console.log('Login simulado para:', email);
                
                if (remember) {
                    localStorage.setItem('user', JSON.stringify({
                        email: email,
                        name: email.split('@')[0]
                    }));
                } else {
                    sessionStorage.setItem('user', JSON.stringify({
                        email: email,
                        name: email.split('@')[0]
                    }));
                }
                
                // Redirecionar para o dashboard
                window.location.href = 'dashboard.html';
            }
        });
    }
    
    // Formulário de registro
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Validação simples
            if (!nome || !email || !password || !confirmPassword) {
                alert('Por favor, preencha todos os campos!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('As senhas não conferem!');
                return;
            }
            
            if (!termsAccepted) {
                alert('Você precisa aceitar os termos de serviço!');
                return;
            }
            
            // Simular registro (em um sistema real isso seria feito com backend)
            console.log('Registro simulado para:', email);
            
            // Armazenar no localStorage para simular persistência
            localStorage.setItem('user', JSON.stringify({
                name: nome,
                email: email
            }));
            
            // Redirecionar para o dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Botões de login social (apenas para demonstração)
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('btn-google') ? 'Google' : 'Discord';
            console.log(`Login com ${provider} simulado`);
            
            // Simular login social
            localStorage.setItem('user', JSON.stringify({
                name: `Usuário ${provider}`,
                email: `user@${provider.toLowerCase()}.com`
            }));
            
            // Redirecionar para o dashboard
            window.location.href = 'dashboard.html';
        });
    });
}); 