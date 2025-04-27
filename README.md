# SUMBLER Cheats - Réplica de Site

Este é um clone do site SUMBLER Cheats, com um sistema de login próprio implementado. O site foi desenvolvido utilizando HTML, CSS e JavaScript puro, sem a necessidade de frameworks ou bibliotecas externas.

## Estrutura de Arquivos

```
site/
├── css/
│   ├── style.css        # Estilos globais
│   ├── auth.css         # Estilos para as páginas de login/cadastro
│   └── dashboard.css    # Estilos para o dashboard
├── js/
│   ├── script.js        # JavaScript global
│   ├── auth.js          # JavaScript para autenticação
│   └── dashboard.js     # JavaScript para o dashboard
├── img/                 # Diretório para imagens
├── index.html           # Página inicial
├── login.html           # Página de login
├── cadastro.html        # Página de cadastro
└── dashboard.html       # Dashboard do usuário
```

## Como Executar

Por se tratar de um site estático, você pode simplesmente abrir os arquivos HTML em seu navegador para visualizar o site. Para uma experiência melhor, recomenda-se utilizar um servidor local:

### Usando Python

Se você tem Python instalado, você pode iniciar um servidor local facilmente:

```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

Depois acesse `http://localhost:8000` no seu navegador.

### Usando Node.js

Se você tem Node.js instalado, você pode usar o pacote `http-server`:

```bash
# Instalar globalmente (uma única vez)
npm install -g http-server

# Iniciar o servidor
http-server
```

Depois acesse `http://localhost:8080` no seu navegador.

### Usando extensões de VS Code

Se você estiver usando o VS Code, pode instalar a extensão "Live Server" e iniciar um servidor local com um clique.

## Funcionalidades Implementadas

- Página inicial com demonstração de produtos
- Sistema de login e cadastro
- Dashboard para usuários logados
- Design responsivo
- Animações e transições
- Armazenamento local para simulação de persistência

## Credenciais para Teste

Você pode usar qualquer e-mail e senha para testar o login, ou usar as credenciais de demonstração:

- E-mail: demo@example.com
- Senha: demo123

## Observações

Este é um projeto de demonstração e não possui funcionalidades reais de backend. Todo o sistema de login é simulado usando armazenamento local (localStorage/sessionStorage) do navegador. 