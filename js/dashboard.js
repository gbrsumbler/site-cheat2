document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    
    // Se não estiver logado, redirecionar para a página de login
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Atualizar informações do usuário na página
    const userNameElement = document.getElementById('user-name');
    const sidebarUserNameElement = document.getElementById('sidebar-user-name');
    const userEmailElement = document.getElementById('user-email');
    
    if (userNameElement) {
        userNameElement.textContent = user.name || 'Usuário';
    }
    
    if (sidebarUserNameElement) {
        sidebarUserNameElement.textContent = user.name || 'Usuário';
    }
    
    if (userEmailElement) {
        userEmailElement.textContent = user.email || 'usuario@email.com';
    }
    
    // Funcionalidade de logout
    const logoutButton = document.getElementById('btn-logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Limpar dados do usuário
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            
            // Redirecionar para a página inicial
            window.location.href = 'index.html';
        });
    }
    
    // Simulação de menu ativo
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Apenas para demonstração, evitar navegação
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                
                // Remover classe ativa de todos os itens
                menuItems.forEach(i => i.parentElement.classList.remove('active'));
                
                // Adicionar classe ativa ao item clicado
                this.parentElement.classList.add('active');
            }
        });
    });
    
    // Simulação de animações de entrada
    function animateElements() {
        const elements = [
            ...document.querySelectorAll('.stat-card'),
            ...document.querySelectorAll('.dashboard-section')
        ];
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animated');
            }, 100 * index);
        });
    }
    
    // Adicionar classe para CSS
    const style = document.createElement('style');
    style.textContent = `
        .stat-card, .dashboard-section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Iniciar animações após um pequeno delay
    setTimeout(animateElements, 300);
}); 