document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    
    // Accordion para a seção de FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Fechar todos os outros itens
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar o estado do item atual
            item.classList.toggle('active');
        });
    });
    
    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Atualizar a interface com base no estado de login
    function updateLoginState() {
        const loginButtons = document.querySelectorAll('.btn-login, .btn-cadastro');
        const productsLinks = document.querySelectorAll('.produto-card .btn');
        
        if (user) {
            // Usuário está logado
            loginButtons.forEach(button => {
                if (button.classList.contains('btn-login')) {
                    button.textContent = 'Dashboard';
                    button.href = 'dashboard.html';
                } else if (button.classList.contains('btn-cadastro')) {
                    button.textContent = 'Sair';
                    button.href = '#';
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        window.location.reload();
                    });
                }
            });
            
            // Atualizar links de produtos para irem direto para a página do produto
            productsLinks.forEach(link => {
                const productName = link.closest('.produto-card').querySelector('h3').textContent;
                link.href = `produto.html?nome=${encodeURIComponent(productName)}`;
            });
        }
    }
    
    updateLoginState();
    
    // Animação ao scroll para elementos
    function revealOnScroll() {
        const elements = document.querySelectorAll('.produto-card, .beneficio, .estatistica-item');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Adicionar classe para CSS
    const style = document.createElement('style');
    style.textContent = `
        .produto-card, .beneficio, .estatistica-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Chamar uma vez para inicializar
    revealOnScroll();
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', revealOnScroll);
}); 