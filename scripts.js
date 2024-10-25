const responsaveis = {
    'gabriel.lopes@assessorialpha.com': { senha: '57491586000151', comissao: 0.07 },
    'angelo@assessorialpha.com': { senha: '57498021000130', comissao: 0.07 },
    'macsuel.silva@assessorialpha.com': { senha: '57492077000143', comissao: 0.06 },
    'eduardo.sacardo@assessorialpha.com': { senha: '57489005000147', comissao: 0.06 },
    'Iago.ramalho@assessorialpha.com': { senha: '75334183000107', comissao: 0.07 },
    'gabriel.silva@assessorialpha.com': { senha: '05289557130', comissao: 0.07 },
    'Lucas.moraes@assessorialpha.com': { senha: '57489086000185', comissao: 0.06 },
    'enzo.gaioso@assessorialpha.com': { senha: '52523011000150', comissao: 0.07 },
    'gabriel.ramalho@assessorialpha.com': { senha: '54113569000192', comissao: 0.08 },
    'admin@assessorialpha.com': { senha: 'alpha123', comissao: 0.08 }
};

// Lógica de Login
document.getElementById('loginBtn').addEventListener('click', function () {
    realizarLogin(); // Chama a função de login
});

// Adiciona evento de tecla para o formulário de login
document.getElementById('loginForm').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o envio padrão do formulário
        realizarLogin(); // Chama a função de login
    }
});

function realizarLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const lembrarCheckbox = document.getElementById('lembrarCheckbox');

    if (responsaveis[email] && responsaveis[email].senha === senha) {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('vendaDiv').style.display = 'block';
        document.getElementById('sairLink').style.display = 'block'; // Mostra o link de sair
        document.getElementById('configuracaoIcon').style.display = 'block';

        // Se o checkbox estiver marcado, salva o email no localStorage
        if (lembrarCheckbox.checked) {
            localStorage.setItem('emailConectado', email);
        } else {
            localStorage.removeItem('emailConectado');
        }
    } else {
        mostrarMensagem('E-mail ou senha incorretos.', document.getElementById('loginMessage'));
    }
}

// Função para exibir mensagens
function mostrarMensagem(mensagem, elemento) {
    elemento.textContent = mensagem; // Atualiza o texto do elemento
    elemento.style.display = 'block'; // Garante que o elemento esteja visível
}

// Ao carregar a página, verifica se há um email salvo
window.onload = function () {
    const emailConectado = localStorage.getItem('emailConectado');
    if (emailConectado) {
        document.getElementById('email').value = emailConectado; // Preenche o campo de email
        document.getElementById('lembrarCheckbox').checked = true; // Marca o checkbox
    }
};

// Função para enviar a venda
function enviarVenda(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const valorVendaInput = document.getElementById('valor').value;
    const valorVenda = parseFloat(valorVendaInput.replace('R$', '').replace('.', '').replace(',', '.'));

    if (isNaN(valorVenda)) {
        alert('Preencha o valor corretamente.');
        return;
    }

    const emailResponsavel = document.getElementById('email').value;
    const cliente = document.getElementById('cliente').value;
    const responsavel = responsaveis[emailResponsavel];

    if (responsavel) {
        const porcentagem = responsavel.comissao;
        const valorComissao = (valorVenda * porcentagem).toFixed(2);

        // Mostra o loading abaixo do botão
        document.getElementById('loading').style.display = 'block';

        fetch('https://script.google.com/macros/s/AKfycbwZttHhJEkFft75u_JSUcDr8qbYYEPhtNzEOOANEUWHY3E4dVJEuQ31xmpSPhqjwHkYaQ/exec', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'valor': valorVenda.toFixed(2),
                'responsavel': emailResponsavel,
                'cliente': cliente,
                'porcentagem': porcentagem,
                'valorComissao': valorComissao
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            // Esconde o loading e exibe a mensagem de sucesso
            document.getElementById('loading').style.display = 'none';
            mostrarMensagem(`Enviado com sucesso! O valor da comissão é de R$ ${valorComissao}.`, document.getElementById('mensagem'));

            // Reseta os campos do formulário
            document.getElementById('vendaForm').reset();
        })
        .catch(error => {
            // Esconde o loading e exibe a mensagem de erro
            document.getElementById('loading').style.display = 'none';
            mostrarMensagem('Erro ao enviar os dados: ' + error.message, document.getElementById('mensagem'));
        });
    } else {
        alert('Responsável não encontrado.');
    }
}

// Adiciona o evento de submit para o formulário de venda
document.getElementById('vendaForm').addEventListener('submit', enviarVenda);
