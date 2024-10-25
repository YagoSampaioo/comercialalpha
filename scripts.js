const responsaveis = {
    'gabriel.lopes@assessorialpha.com': { senha: '12345678', comissao: 0.07 },
    'angelo@assessorialpha.com': { senha: '12345678', comissao: 0.07 },
    'macsuel.silva@assessorialpha.com': { senha: '12345678', comissao: 0.06 },
    'eduardo.sacardo@assessorialpha.com': { senha: '12345678', comissao: 0.06 },
    'Iago.ramalho@assessorialpha.com': { senha: '12345678', comissao: 0.07 },
    'gabriel.silva@assessorialpha.com': { senha: '12345678', comissao: 0.07 },
    'Lucas.moraes@assessorialpha.com': { senha: '12345678', comissao: 0.06 },
    'enzo.gaioso@assessorialpha.com': { senha: '12345678', comissao: 0.07 },
    'gabriel.ramalho@assessorialpha.com': { senha: '12345678', comissao: 0.08 }
};

// Função para exibir mensagens
function mostrarMensagem(mensagem, elemento) {
    elemento.innerText = mensagem;
}

// Lógica de Login
document.getElementById('loginBtn').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (responsaveis[email] && responsaveis[email].senha === senha) {
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('vendaDiv').style.display = 'block';
        document.getElementById('configuracaoIcon').style.display = 'block';
    } else {
        mostrarMensagem('E-mail ou senha incorretos.', document.getElementById('loginMessage'));
    }
});

// Envio do Formulário de Venda
document.getElementById('vendaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const valorVendaInput = document.getElementById('valor').value;
    const valorVenda = parseFloat(valorVendaInput.replace('R$', '').replace('.', '').replace(',', '.'));

    if (isNaN(valorVenda)) {
        alert('Preencha o valor corretamente.');
        return;
    }

    const emailResponsavel = document.getElementById('email').value;
    const cliente = document.getElementById('cliente').value; // Captura o cliente
    const responsavel = responsaveis[emailResponsavel];

    if (responsavel) {
        const porcentagem = responsavel.comissao;
        const valorComissao = (valorVenda * porcentagem).toFixed(2);

        fetch('https://script.google.com/macros/s/AKfycbwZttHhJEkFft75u_JSUcDr8qbYYEPhtNzEOOANEUWHY3E4dVJEuQ31xmpSPhqjwHkYaQ/exec', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'valor': valorVenda.toFixed(2),
                'responsavel': emailResponsavel,
                'cliente': cliente, // Envia o cliente
                'porcentagem': porcentagem, 
                'valorComissao': valorComissao 
            })
        })
        .then(response => response.text())
        .then(data => {
            mostrarMensagem(`Enviado com sucesso! O valor da comissão é R$ ${valorComissao}.`, document.getElementById('mensagem'));
        })
        .catch(error => {
            console.error('Erro:', error);
            mostrarMensagem('Erro ao enviar os dados.', document.getElementById('mensagem'));
        });
    } else {
        alert('Responsável não encontrado.');
    }
});
