document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário é administrador
    const user = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));
    
    // Na versão real, isso seria verificado no backend
    // Para demo apenas, vamos continuar sem redirecionar
    if (!user) {
        // Mensagem para fins de demonstração
        console.warn('Usuário não autenticado acessando o painel admin!');
    }
    
    // Atualizar informações do admin na página
    const adminNameElement = document.getElementById('admin-name');
    const sidebarAdminNameElement = document.getElementById('sidebar-admin-name');
    
    if (adminNameElement && user) {
        adminNameElement.textContent = user.name || 'Administrador';
    }
    
    if (sidebarAdminNameElement && user) {
        sidebarAdminNameElement.textContent = user.name || 'Administrador';
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
    
    // Navegação pelo sidebar
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li a');
    const adminSections = document.querySelectorAll('.admin-section');
    
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe ativa de todos os itens do menu
            sidebarMenuItems.forEach(menuItem => {
                menuItem.parentElement.classList.remove('active');
            });
            
            // Adicionar classe ativa ao item clicado
            this.parentElement.classList.add('active');
            
            // Obter o ID da seção a ser mostrada
            const targetSection = this.getAttribute('href').substring(1) + '-section';
            
            // Esconder todas as seções
            adminSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Mostrar a seção correspondente
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Botões de ação da tabela de usuários
    const userActionButtons = document.querySelectorAll('#users-table-body .action-btn');
    userActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.closest('tr').cells[0].textContent;
            const userName = this.closest('tr').cells[1].textContent;
            const userEmail = this.closest('tr').cells[2].textContent;
            
            if (this.classList.contains('view-btn') || this.classList.contains('edit-btn')) {
                // Abrir modal de detalhes do usuário
                openUserModal(userId, userName, userEmail);
            } else if (this.classList.contains('ban-btn')) {
                // Abrir modal de banimento
                openBanModal(userId, userName, userEmail);
            }
        });
    });
    
    // Abrir modal de usuário
    function openUserModal(userId, userName, userEmail) {
        const modal = document.getElementById('user-modal');
        
        // Preencher dados básicos
        document.getElementById('user-name-detail').textContent = userName;
        document.getElementById('user-email-detail').textContent = userEmail;
        
        // Encontrar o cargo atual do usuário na tabela
        const userRows = document.querySelectorAll('#users-table-body tr');
        let userRole = 'user'; // Padrão
        
        userRows.forEach(row => {
            const email = row.cells[2].textContent;
            if (email === userEmail) {
                const roleBadge = row.cells[3].querySelector('.badge');
                const roleText = roleBadge.textContent.toLowerCase();
                
                if (roleText.includes('admin')) {
                    userRole = 'admin';
                } else if (roleText.includes('moderador')) {
                    userRole = 'moderator';
                } else if (roleText.includes('vip')) {
                    userRole = 'vip';
                } else {
                    userRole = 'user';
                }
            }
        });
        
        // Definir o valor selecionado no select
        const userRoleSelect = document.getElementById('user-role-select');
        userRoleSelect.value = userRole;
        
        // Guardar informações do usuário para acesso pelos botões de salvar
        modal.dataset.userId = userId;
        modal.dataset.userName = userName;
        modal.dataset.userEmail = userEmail;
        
        // Popular outros dados do usuário para demonstração
        // Na versão real, esses dados seriam carregados do backend
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Scroll para o topo quando o modal abrir
        window.scrollTo(0, 0);
        
        // Impedir scroll do body
        document.body.style.overflow = 'hidden';
    }
    
    // Abrir modal de banimento
    function openBanModal(userId, userName, userEmail) {
        const modal = document.getElementById('ban-modal');
        const userNameElement = document.getElementById('ban-user-name');
        
        // Popular dados do usuário no modal
        if (userNameElement) {
            userNameElement.textContent = `${userName} (${userEmail})`;
        }
        
        // Mostrar modal
        modal.style.display = 'block';
        
        // Scroll para o topo quando o modal abrir
        window.scrollTo(0, 0);
        
        // Impedir scroll do body
        document.body.style.overflow = 'hidden';
    }
    
    // Fechar modais
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            
            // Permitir scroll do body novamente
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fechar modal quando clicar fora do conteúdo
    window.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                
                // Permitir scroll do body novamente
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Tabs nos modais
    const tabButtons = document.querySelectorAll('.user-info-tabs .tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe ativa de todos os botões
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Esconder todos os conteúdos das tabs
            const tabContents = document.querySelectorAll('.user-info-tabs .tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar o conteúdo da tab selecionada
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Tabs na seção de usuários
    const userTabButtons = document.querySelectorAll('#usuarios-section .tab-btn');
    userTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe ativa de todos os botões
            userTabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Esconder todos os conteúdos das tabs
            const tabContents = document.querySelectorAll('#usuarios-section .tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostrar o conteúdo da tab selecionada
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Botão para visualizar senha
    const viewPasswordBtn = document.querySelector('.view-password-btn');
    if (viewPasswordBtn) {
        viewPasswordBtn.addEventListener('click', function() {
            const passwordHashElement = document.getElementById('user-password-hash');
            
            if (passwordHashElement.textContent === '********') {
                // Simulação - em um ambiente real isso seria carregado do servidor
                passwordHashElement.textContent = 'Senha123@';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
                
                // Registrar esta ação no log do sistema
                console.log('ALERTA DE SEGURANÇA: Senha de usuário visualizada por ' + (user ? user.name : 'Administrador'));
                
                // Após 10 segundos, esconder a senha novamente
                setTimeout(() => {
                    passwordHashElement.textContent = '********';
                    this.innerHTML = '<i class="fas fa-eye"></i>';
                }, 10000);
            } else {
                passwordHashElement.textContent = '********';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
    
    // Botão para gerar senha aleatória
    const generatePasswordBtn = document.getElementById('generate-password-btn');
    if (generatePasswordBtn) {
        generatePasswordBtn.addEventListener('click', function() {
            const newPasswordInput = document.getElementById('user-new-password');
            const confirmPasswordInput = document.getElementById('user-confirm-password');
            
            // Gerar senha forte aleatória (8-12 caracteres com letras, números e símbolos)
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            const length = 8 + Math.floor(Math.random() * 4); // entre 8 e 12 caracteres
            let password = '';
            
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            // Definir a senha gerada em ambos os campos
            newPasswordInput.value = password;
            confirmPasswordInput.value = password;
            
            // Mostrar a senha gerada por 5 segundos e depois ocultá-la
            newPasswordInput.type = 'text';
            confirmPasswordInput.type = 'text';
            
            setTimeout(() => {
                newPasswordInput.type = 'password';
                confirmPasswordInput.type = 'password';
            }, 5000);
        });
    }
    
    // Botão para atualizar senha
    const updatePasswordBtn = document.getElementById('update-password-btn');
    if (updatePasswordBtn) {
        updatePasswordBtn.addEventListener('click', function() {
            const newPassword = document.getElementById('user-new-password').value;
            const confirmPassword = document.getElementById('user-confirm-password').value;
            
            if (!newPassword) {
                alert('Por favor, digite uma nova senha');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('As senhas não conferem');
                return;
            }
            
            // Validar força da senha
            if (newPassword.length < 8) {
                alert('A senha deve ter pelo menos 8 caracteres');
                return;
            }
            
            // Simulação - em um ambiente real isso seria enviado para o servidor
            alert('Senha atualizada com sucesso!');
            
            // Limpar campos
            document.getElementById('user-new-password').value = '';
            document.getElementById('user-confirm-password').value = '';
        });
    }
    
    // Filtros de visualização para abas de usuários por cargo
    function setupUserRoleFilters() {
        // Simular dados de usuários para contagem
        const userCounts = {
            all: 42,
            vip: 15,
            moderator: 4,
            admin: 3
        };
        
        // Quando clicar em cada tab de usuários, filtrar a tabela
        document.querySelectorAll('#usuarios-section .tab-btn').forEach(tab => {
            tab.addEventListener('click', function() {
                const role = this.getAttribute('data-tab').replace('-users', '');
                
                // Filtrar a tabela com base no cargo selecionado
                const rows = document.querySelectorAll('#users-table-body tr');
                rows.forEach(row => {
                    const userRole = row.querySelector('td:nth-child(4) .badge').textContent.toLowerCase();
                    
                    if (role === 'all' || userRole === role) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Executar configuração dos filtros
    setupUserRoleFilters();
    
    // Função para simular o banimento imediato de um usuário
    function banUser(userId, userName, userEmail, reason, banIp, banHwid) {
        // Em um sistema real, isto enviaria uma requisição para o servidor
        console.log(`Banindo usuário: ${userName} (${userEmail})`);
        console.log(`Motivo: ${reason}`);
        console.log(`Banimento de IP: ${banIp ? 'Sim' : 'Não'}`);
        console.log(`Banimento de HWID: ${banHwid ? 'Sim' : 'Não'}`);
        
        // Simular adição à lista de banimentos
        const bansTableBody = document.getElementById('bans-table-body');
        const newRow = document.createElement('tr');
        
        // Gerar ID incrementando o último
        const lastBanId = bansTableBody.lastElementChild ? 
            parseInt(bansTableBody.lastElementChild.cells[0].textContent) + 1 : 1;
        
        // Data atual formatada
        const now = new Date();
        const banDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        
        // Simular IP e HWID
        const ip = banIp ? `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` : '-';
        const hwid = banHwid ? Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase() : '-';
        
        // Admin que baniu (usuário atual)
        const adminName = user ? user.name : 'Administrador';
        
        newRow.innerHTML = `
            <td>${lastBanId}</td>
            <td>${userName}</td>
            <td>${userEmail}</td>
            <td>${ip}</td>
            <td>${hwid}</td>
            <td>${reason}</td>
            <td>${banDate}</td>
            <td>${adminName}</td>
            <td>
                <button class="action-btn unban-btn" title="Remover banimento"><i class="fas fa-undo"></i></button>
            </td>
        `;
        
        // Adicionar à tabela
        bansTableBody.appendChild(newRow);
        
        // Adicionar evento ao botão de desbanir
        newRow.querySelector('.unban-btn').addEventListener('click', function() {
            if (confirm('Tem certeza que deseja remover o banimento deste usuário?')) {
                alert('Banimento removido com sucesso!');
                this.closest('tr').remove();
            }
        });
        
        return true;
    }
    
    // Melhorar o formulário de banimento
    const banForm = document.getElementById('ban-form');
    if (banForm) {
        banForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('ban-user-name').textContent.split(' (')[0];
            const userEmail = document.getElementById('ban-user-name').textContent.match(/\((.*?)\)/)[1];
            const reason = document.getElementById('ban-reason').value;
            const banIp = document.getElementById('ban-ip').checked;
            const banHwid = document.getElementById('ban-hwid').checked;
            
            if (!reason) {
                alert('Por favor, informe o motivo do banimento');
                return;
            }
            
            // Executar banimento
            if (banUser(null, userName, userEmail, reason, banIp, banHwid)) {
                alert('Usuário banido com sucesso!');
                
                // Fechar modal
                document.getElementById('ban-modal').style.display = 'none';
                
                // Permitir scroll do body novamente
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Botão de adicionar usuário
    const addUserBtn = document.getElementById('add-user-btn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            alert('Funcionalidade de adicionar usuário será implementada em breve!');
        });
    }
    
    // Botão de adicionar banimento
    const addBanBtn = document.getElementById('add-ban-btn');
    if (addBanBtn) {
        addBanBtn.addEventListener('click', function() {
            alert('Funcionalidade de adicionar banimento manualmente será implementada em breve!');
        });
    }
    
    // Filtro de busca para usuários
    const userSearchInput = document.getElementById('user-search');
    if (userSearchInput) {
        userSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const userRows = document.querySelectorAll('#users-table-body tr');
            
            userRows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                
                if (name.includes(searchTerm) || email.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Filtro de busca para banimentos
    const banSearchInput = document.getElementById('ban-search');
    if (banSearchInput) {
        banSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const banRows = document.querySelectorAll('#bans-table-body tr');
            
            banRows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                const reason = row.cells[5].textContent.toLowerCase();
                
                if (name.includes(searchTerm) || email.includes(searchTerm) || reason.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    
    // Botão de banir usuário dentro do modal de detalhes
    const banUserBtn = document.getElementById('ban-user-btn');
    if (banUserBtn) {
        banUserBtn.addEventListener('click', function() {
            // Fechar modal de detalhes
            document.getElementById('user-modal').style.display = 'none';
            
            // Abrir modal de banimento
            openBanModal(
                null, 
                document.getElementById('user-name-detail').textContent,
                document.getElementById('user-email-detail').textContent
            );
        });
    }
    
    // Detectar sistema de hardware e software do usuário
    function detectSystemInfo() {
        const systemInfo = {
            os: getOperatingSystem(),
            browser: getBrowser(),
            device: getDevice(),
            // Na versão real, esses dados seriam coletados por scripts mais avançados
            // ou pelo backend com permissões adequadas
            cpu: 'Informação não disponível',
            gpu: 'Informação não disponível',
            ram: 'Informação não disponível',
            hwid: 'Calculado no servidor'
        };
        
        return systemInfo;
    }
    
    function getOperatingSystem() {
        const userAgent = window.navigator.userAgent;
        
        if (userAgent.indexOf("Windows") !== -1) return "Windows";
        if (userAgent.indexOf("Mac") !== -1) return "macOS";
        if (userAgent.indexOf("Linux") !== -1) return "Linux";
        if (userAgent.indexOf("Android") !== -1) return "Android";
        if (userAgent.indexOf("iOS") !== -1) return "iOS";
        
        return "Sistema Operacional desconhecido";
    }
    
    function getBrowser() {
        const userAgent = window.navigator.userAgent;
        
        if (userAgent.indexOf("Chrome") !== -1) return "Chrome";
        if (userAgent.indexOf("Firefox") !== -1) return "Firefox";
        if (userAgent.indexOf("Safari") !== -1) return "Safari";
        if (userAgent.indexOf("Edge") !== -1) return "Edge";
        if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) return "Internet Explorer";
        
        return "Navegador desconhecido";
    }
    
    function getDevice() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return "Mobile";
        }
        return "Desktop";
    }
    
    // Detectar o IP do usuário (simulado, em um ambiente real seria feito pelo servidor)
    async function getIpAddress() {
        try {
            // Simulação - em um ambiente real seria feito pelo backend
            const simulatedIp = "192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255);
            return simulatedIp;
        } catch (error) {
            console.error("Erro ao obter endereço IP:", error);
            return "Desconhecido";
        }
    }
    
    // Apenas para demonstração - simular coleta de dados do sistema
    (async function() {
        const systemInfo = detectSystemInfo();
        const ipAddress = await getIpAddress();
        
        console.log("Informações do Sistema:", systemInfo);
        console.log("Endereço IP:", ipAddress);
    })();
    
    // Filtros de visualização para usuários por cargo
    const roleFilters = document.querySelectorAll('.role-filter');
    if (roleFilters.length > 0) {
        roleFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remover classe ativa de todos os filtros
                roleFilters.forEach(f => f.classList.remove('active'));
                
                // Adicionar classe ativa ao filtro clicado
                this.classList.add('active');
                
                const role = this.getAttribute('data-role');
                
                // Filtrar a tabela com base no cargo selecionado
                const rows = document.querySelectorAll('#users-table-body tr');
                rows.forEach(row => {
                    const userRole = row.querySelector('td:nth-child(4) .badge').textContent.toLowerCase();
                    
                    if (role === 'all' || userRole.includes(role)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Função para fechar o modal de usuário
    function closeUserModal() {
        const modal = document.getElementById('user-modal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Função para salvar alterações do usuário
    function saveUserChanges() {
        const modal = document.getElementById('user-modal');
        const userId = parseInt(modal.dataset.userId);
        const userEmail = modal.dataset.userEmail;
        const newRole = document.getElementById('user-role-select').value;
        
        // Encontra o usuário na tabela e atualiza o cargo
        const userRows = document.querySelectorAll('#users-table-body tr');
        userRows.forEach(row => {
            if (row.querySelector('td:first-child').textContent == userId) {
                const roleCell = row.querySelector('td:nth-child(4)');
                const roleBadge = roleCell.querySelector('.badge');
                
                // Atualiza a classe e o texto da badge de acordo com o novo cargo
                roleBadge.className = 'badge';
                
                if (newRole === 'admin') {
                    roleBadge.classList.add('admin');
                    roleBadge.textContent = 'Admin';
                } else if (newRole === 'moderator') {
                    roleBadge.classList.add('moderator');
                    roleBadge.textContent = 'Moderador';
                } else if (newRole === 'vip') {
                    roleBadge.classList.add('vip');
                    roleBadge.textContent = 'VIP';
                } else {
                    roleBadge.textContent = 'Usuário';
                }
            }
        });
        
        // Exibe uma notificação de sucesso
        const toastContainer = document.getElementById('toast-container');
        if (toastContainer) {
            const toast = document.createElement('div');
            toast.className = 'toast success';
            toast.innerHTML = `
                <div class="toast-header">
                    <i class="fas fa-check-circle"></i>
                    <span>Sucesso</span>
                    <button class="toast-close">&times;</button>
                </div>
                <div class="toast-body">
                    Cargo do usuário atualizado com sucesso.
                </div>
            `;
            toastContainer.appendChild(toast);
            
            // Remove o toast após 5 segundos
            setTimeout(() => {
                toast.remove();
            }, 5000);
            
            // Adiciona evento para fechar o toast
            toast.querySelector('.toast-close').addEventListener('click', () => {
                toast.remove();
            });
        } else {
            // Fallback se o toast container não for encontrado
            alert('Alterações salvas com sucesso!');
        }
        
        // Fecha o modal
        closeModal('user-modal');
        
        console.log(`Alterado cargo do usuário ${userEmail} (ID: ${userId}) para ${newRole}`);
    }
    
    // Inicializar botões de visualização
    function initializeViewButtons() {
        const viewButtons = document.querySelectorAll('.view-btn');
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const userId = row.cells[0].textContent;
                const userName = row.cells[1].textContent;
                const userEmail = row.cells[2].textContent;
                
                openUserModal(userId, userName, userEmail);
            });
        });
    }
    
    initializeViewButtons();
    
    // Botão de salvar alterações do usuário
    const saveUserBtn = document.getElementById('save-user-btn');
    if (saveUserBtn) {
        saveUserBtn.addEventListener('click', saveUserChanges);
    }
});

// Gerenciamento de Logs
document.addEventListener('DOMContentLoaded', function() {
    // Filtros de logs
    const applyLogFilters = document.getElementById('apply-log-filters');
    const clearLogFilters = document.getElementById('clear-log-filters');
    
    if (applyLogFilters) {
        applyLogFilters.addEventListener('click', function() {
            const typeFilter = document.getElementById('log-type-filter').value;
            const dateFilter = document.getElementById('log-date-filter').value;
            
            // Aplicar filtros na tabela de logs
            filterLogs(typeFilter, dateFilter);
        });
    }
    
    if (clearLogFilters) {
        clearLogFilters.addEventListener('click', function() {
            // Limpar filtros
            document.getElementById('log-type-filter').value = 'all';
            document.getElementById('log-date-filter').value = '';
            document.getElementById('log-search').value = '';
            
            // Restaurar tabela original
            filterLogs('all', '');
        });
    }
    
    // Exportar logs
    const exportLogsBtn = document.getElementById('export-logs-btn');
    if (exportLogsBtn) {
        exportLogsBtn.addEventListener('click', function() {
            exportLogsToCSV();
        });
    }
    
    // Busca nos logs
    const logSearch = document.getElementById('log-search');
    if (logSearch) {
        logSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchLogs(searchTerm);
        });
    }
});

// Função para filtrar logs
function filterLogs(type, date) {
    const logRows = document.querySelectorAll('#logs-table-body tr');
    
    logRows.forEach(row => {
        let showRow = true;
        
        // Filtrar por tipo
        if (type !== 'all') {
            const logType = row.querySelector('td:nth-child(3) .badge').textContent.toLowerCase();
            if (!logType.includes(type.toLowerCase())) {
                showRow = false;
            }
        }
        
        // Filtrar por data
        if (date && showRow) {
            const logDate = row.querySelector('td:nth-child(2)').textContent.split(' ')[0];
            const formattedDate = formatDateForComparison(logDate);
            if (formattedDate !== date) {
                showRow = false;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// Função para formatar data DD/MM/AAAA para AAAA-MM-DD
function formatDateForComparison(dateStr) {
    const parts = dateStr.split('/');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

// Função para buscar nos logs
function searchLogs(term) {
    const logRows = document.querySelectorAll('#logs-table-body tr');
    
    logRows.forEach(row => {
        const rowText = row.textContent.toLowerCase();
        row.style.display = rowText.includes(term) ? '' : 'none';
    });
}

// Função para exportar logs para CSV
function exportLogsToCSV() {
    const logRows = document.querySelectorAll('#logs-table-body tr:not([style*="display: none"])');
    let csvContent = "ID,Data/Hora,Tipo,Usuário,IP,Ação\n";
    
    logRows.forEach(row => {
        const id = row.querySelector('td:nth-child(1)').textContent;
        const datetime = row.querySelector('td:nth-child(2)').textContent;
        const type = row.querySelector('td:nth-child(3) .badge').textContent;
        const user = row.querySelector('td:nth-child(4)').textContent;
        const ip = row.querySelector('td:nth-child(5)').textContent;
        const action = row.querySelector('td:nth-child(6)').textContent;
        
        csvContent += `${id},"${datetime}","${type}","${user}","${ip}","${action}"\n`;
    });
    
    // Criar um blob e baixar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `logs_sumbler_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Gerenciamento de Configurações
document.addEventListener('DOMContentLoaded', function() {
    // Tabs de configuração
    const configTabs = document.querySelectorAll('.tab-btn');
    
    if (configTabs.length > 0) {
        configTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remover classe ativa de todas as tabs
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.config-content').forEach(c => c.classList.remove('active'));
                
                // Adicionar classe ativa à tab clicada
                this.classList.add('active');
                
                // Mostrar conteúdo correspondente
                const tabId = this.getAttribute('data-config-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Upload de avatar
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    const avatarUpload = document.getElementById('avatar-upload');
    
    if (changeAvatarBtn && avatarUpload) {
        changeAvatarBtn.addEventListener('click', function() {
            avatarUpload.click();
        });
        
        avatarUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const currentAvatar = document.querySelector('.current-avatar');
                    currentAvatar.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Formulário de perfil do admin
    const adminProfileForm = document.getElementById('admin-profile-form');
    if (adminProfileForm) {
        adminProfileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAdminProfile();
        });
    }
    
    // Formulário de configurações do site
    const siteConfigForm = document.getElementById('site-config-form');
    if (siteConfigForm) {
        siteConfigForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSiteConfig();
        });
    }
    
    // Formulário de configurações de email
    const emailConfigForm = document.getElementById('email-config-form');
    if (emailConfigForm) {
        emailConfigForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEmailConfig();
        });
    }
    
    // Seletor de template de email
    const emailTemplateSelect = document.getElementById('email-template-select');
    if (emailTemplateSelect) {
        emailTemplateSelect.addEventListener('change', function() {
            loadEmailTemplate(this.value);
        });
    }
    
    // Botão de enviar email de teste
    const testEmailBtn = document.getElementById('test-email-btn');
    if (testEmailBtn) {
        testEmailBtn.addEventListener('click', function() {
            sendTestEmail();
        });
    }
    
    // Geração de backup
    const createBackupBtn = document.getElementById('create-backup-btn');
    if (createBackupBtn) {
        createBackupBtn.addEventListener('click', function() {
            createBackup();
        });
    }
    
    // Restauração de backup
    const restoreBackupBtn = document.getElementById('restore-backup-btn');
    const backupFileInput = document.getElementById('backup-file-input');
    
    if (restoreBackupBtn && backupFileInput) {
        restoreBackupBtn.addEventListener('click', function() {
            backupFileInput.click();
        });
        
        backupFileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                restoreBackup(this.files[0]);
            }
        });
    }
});

// Função para salvar o perfil do administrador
function saveAdminProfile() {
    const name = document.getElementById('admin-name-input').value;
    const email = document.getElementById('admin-email-input').value;
    const phone = document.getElementById('admin-phone-input').value;
    const currentPassword = document.getElementById('admin-current-password').value;
    const newPassword = document.getElementById('admin-new-password').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    
    // Validação básica
    if (!name || !email) {
        showNotification('error', 'Erro', 'Nome e email são campos obrigatórios.');
        return;
    }
    
    // Validação de senha se estiver alterando
    if (currentPassword || newPassword || confirmPassword) {
        if (!currentPassword) {
            showNotification('error', 'Erro', 'Informe a senha atual para alterá-la.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('error', 'Erro', 'As senhas não conferem.');
            return;
        }
        
        if (newPassword.length < 8) {
            showNotification('error', 'Erro', 'A nova senha deve ter pelo menos 8 caracteres.');
            return;
        }
    }
    
    // Simulação de salvamento
    setTimeout(() => {
        // Atualizar nome do admin no cabeçalho
        const adminName = document.querySelector('.user-info h3');
        if (adminName) {
            adminName.textContent = name;
        }
        
        // Limpar campos de senha
        document.getElementById('admin-current-password').value = '';
        document.getElementById('admin-new-password').value = '';
        document.getElementById('admin-confirm-password').value = '';
        
        showNotification('success', 'Sucesso', 'Perfil atualizado com sucesso.');
        
        // Registrar no log
        logAdminAction('Atualização de perfil', `Administrador ${name} atualizou seu perfil`);
    }, 1000);
}

// Função para salvar configurações do site
function saveSiteConfig() {
    const siteName = document.getElementById('site-name').value;
    const siteDescription = document.getElementById('site-description').value;
    const maintenanceMode = document.getElementById('maintenance-mode').checked;
    const registrationEnabled = document.getElementById('registration-enabled').checked;
    const vipDaysDefault = document.getElementById('vip-days-default').value;
    const hwidResetLimit = document.getElementById('hwid-reset-limit').value;
    const loginAttempts = document.getElementById('login-attempts').value;
    
    // Validação básica
    if (!siteName) {
        showNotification('error', 'Erro', 'Nome do site é obrigatório.');
        return;
    }
    
    // Simulação de salvamento
    setTimeout(() => {
        showNotification('success', 'Sucesso', 'Configurações do site atualizadas com sucesso.');
        
        // Registrar no log
        logAdminAction('Configuração do site', `Alterações nas configurações gerais do site`);
    }, 1000);
}

// Função para salvar configurações de email
function saveEmailConfig() {
    const smtpServer = document.getElementById('smtp-server').value;
    const smtpPort = document.getElementById('smtp-port').value;
    const smtpUsername = document.getElementById('smtp-username').value;
    const smtpPassword = document.getElementById('smtp-password').value;
    const smtpEncryption = document.getElementById('smtp-encryption').value;
    const templateContent = document.getElementById('email-template-content').value;
    const selectedTemplate = document.getElementById('email-template-select').value;
    
    // Validação básica
    if (!smtpServer || !smtpPort || !smtpUsername) {
        showNotification('error', 'Erro', 'Todos os campos são obrigatórios.');
        return;
    }
    
    // Simulação de salvamento
    setTimeout(() => {
        showNotification('success', 'Sucesso', 'Configurações de email atualizadas com sucesso.');
        
        // Registrar no log
        logAdminAction('Configuração de email', `Alterações nas configurações de email`);
    }, 1000);
}

// Função para carregar template de email
function loadEmailTemplate(templateType) {
    const templateContent = document.getElementById('email-template-content');
    
    // Simulação de templates
    const templates = {
        'welcome': `Olá {nome},

Bem-vindo à SUMBLER Cheats! Estamos animados por você fazer parte da nossa comunidade.

Seus detalhes de acesso:
Email: {email}
Senha: (a senha que você cadastrou)

Se tiver qualquer dúvida, entre em contato com nosso suporte.

Atenciosamente,
Equipe SUMBLER`,
        'password-reset': `Olá {nome},

Recebemos uma solicitação para redefinir sua senha.
Para continuar, clique no link abaixo:

{reset_link}

Este link expira em 24 horas. Se você não solicitou esta alteração, ignore este email.

Atenciosamente,
Equipe SUMBLER`,
        'purchase': `Olá {nome},

Obrigado por sua compra!

Detalhes da compra:
Produto: {produto}
Valor: R$ {valor}
Data: {data}

Para acessar seu produto, faça login em sua conta.

Atenciosamente,
Equipe SUMBLER`,
        'license-expiry': `Olá {nome},

Sua licença para {produto} expirará em {dias} dias.

Para continuar utilizando nossos serviços, realize a renovação em sua área de cliente.

Atenciosamente,
Equipe SUMBLER`
    };
    
    if (templateContent && templates[templateType]) {
        templateContent.value = templates[templateType];
    }
}

// Função para enviar email de teste
function sendTestEmail() {
    const testEmail = prompt('Digite o email para enviar o teste:');
    
    if (!testEmail) return;
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
        showNotification('error', 'Erro', 'Email inválido.');
        return;
    }
    
    // Simulação de envio
    showNotification('info', 'Enviando...', 'Enviando email de teste...');
    
    setTimeout(() => {
        showNotification('success', 'Sucesso', `Email de teste enviado para ${testEmail}`);
        
        // Registrar no log
        logAdminAction('Email de teste', `Email de teste enviado para ${testEmail}`);
    }, 2000);
}

// Função para criar backup
function createBackup() {
    showNotification('info', 'Backup', 'Gerando backup do sistema...');
    
    // Simulação de backup
    setTimeout(() => {
        showNotification('success', 'Sucesso', 'Backup gerado com sucesso.');
        
        // Adicionar novo backup à tabela
        const backupsTable = document.getElementById('backups-table-body');
        if (backupsTable) {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            
            const dateStr = `${day}/${month}/${year} ${hours}:${minutes}`;
            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${dateStr}</td>
                <td>24.8 MB</td>
                <td>Manual</td>
                <td>${document.getElementById('admin-name-input').value || 'Administrador'}</td>
                <td>
                    <button class="action-btn download-btn" title="Baixar"><i class="fas fa-download"></i></button>
                    <button class="action-btn restore-btn" title="Restaurar"><i class="fas fa-undo"></i></button>
                    <button class="action-btn delete-btn" title="Excluir"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            backupsTable.insertBefore(newRow, backupsTable.firstChild);
        }
        
        // Registrar no log
        logAdminAction('Backup', 'Backup manual criado');
    }, 3000);
}

// Função para restaurar backup
function restoreBackup(file) {
    if (confirm(`Tem certeza que deseja restaurar o backup "${file.name}"?\nEsta ação irá substituir todos os dados atuais.`)) {
        showNotification('info', 'Restauração', 'Restaurando backup do sistema...');
        
        // Simulação de restauração
        setTimeout(() => {
            showNotification('success', 'Sucesso', 'Sistema restaurado com sucesso.');
            
            // Registrar no log
            logAdminAction('Restauração', `Backup "${file.name}" restaurado`);
        }, 4000);
    }
}

// Função para mostrar notificação
function showNotification(type, title, message) {
    const toastContainer = document.getElementById('toast-container');
    
    if (!toastContainer) {
        // Criar container se não existir
        const newContainer = document.createElement('div');
        newContainer.id = 'toast-container';
        document.body.appendChild(newContainer);
        toastContainer = newContainer;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${title}</span>
            <button class="toast-close">&times;</button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove o toast após 5 segundos
    setTimeout(() => {
        toast.remove();
    }, 5000);
    
    // Adiciona evento para fechar o toast
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
}

// Função para registrar ações do admin no log
function logAdminAction(action, details) {
    console.log(`[ADMIN LOG] ${action}: ${details}`);
    
    // Em um sistema real, essa função enviaria os dados para o servidor
    // Aqui vamos apenas simular adicionando à tabela de logs
    const logsTable = document.getElementById('logs-table-body');
    
    if (logsTable) {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        const dateStr = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        
        // Gerar ID único para o log
        const logId = 1000 + Math.floor(Math.random() * 1000);
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${logId}</td>
            <td>${dateStr}</td>
            <td><span class="badge admin">Admin</span></td>
            <td>${document.getElementById('admin-email-input').value || 'admin@sumbler.com'}</td>
            <td>127.0.0.1</td>
            <td>${action}</td>
            <td>
                <button class="action-btn view-btn" title="Ver detalhes"><i class="fas fa-eye"></i></button>
            </td>
        `;
        
        logsTable.insertBefore(newRow, logsTable.firstChild);
    }
} 