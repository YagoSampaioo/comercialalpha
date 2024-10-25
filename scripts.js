const responsaveis = {
    'gabriel.lopes@assessorialpha.com': { senha: '57491586000151', comissao: 0.07 }, // Gabriel Lopes Rodrigues
    'angelo@assessorialpha.com': { senha: '57498021000130', comissao: 0.07 }, // Gabriel Ângelo da Silva Simões
    'macsuel.silva@assessorialpha.com': { senha: '57492077000143', comissao: 0.06 }, // Macsuel Rosal Silva
    'eduardo.sacardo@assessorialpha.com': { senha: '57489005000147', comissao: 0.06 }, // Eduardo Sacardo Pontes
    'Iago.ramalho@assessorialpha.com': { senha: '75334183000107', comissao: 0.07 }, // Iago Cevola Navarro Ramalho
    'gabriel.silva@assessorialpha.com': { senha: '05289557130', comissao: 0.07 }, // Gabriel Silva
    'Lucas.moraes@assessorialpha.com': { senha: '57489086000185', comissao: 0.06 }, // Lucas Moraes dos Santos
    'enzo.gaioso@assessorialpha.com': { senha: '52523011000150', comissao: 0.07 }, // Enzo Lucas Rodrigues Gaioso
    'gabriel.ramalho@assessorialpha.com': { senha: '54113569000192', comissao: 0.08 }, // Gabriel Coelho Ramalho
    'admin@assessorialpha.com': { senha: 'alpha123', comissao: 0.08 } // Gabriel Coelho Ramalho
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

    if (responsaveis[email] && responsaveis[email].senha === senha) {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('vendaDiv').style.display = 'block';
        document.getElementById('sairLink').style.display = 'block'; // Mostra o link de sair
        document.getElementById('configuracaoIcon').style.display = 'block';
    } else {
        mostrarMensagem('E-mail ou senha incorretos.', document.getElementById('loginMessage'));
    }
}

// Adiciona o evento de tecla para o formulário de venda
document.getElementById('vendaForm').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Impede o envio padrão do formulário
        enviarVenda(); // Chama a função para enviar a venda
    }
});

// Função para enviar a venda
function enviarVenda() {
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
        .then(response => response.text())
        .then(data => {
            // Esconde o loading e exibe a mensagem de sucesso
            document.getElementById('loading').style.display = 'none';
            mostrarMensagem(`Enviado com sucesso! O valor da comissão é de R$ ${valorComissao}.`, document.getElementById('mensagem'));
        })
        .catch(error => {
            // Esconde o loading e exibe a mensagem de erro
            document.getElementById('loading').style.display = 'none';
            mostrarMensagem('Erro ao enviar os dados.', document.getElementById('mensagem'));
        });
    } else {
        alert('Responsável não encontrado.');
    }
}
