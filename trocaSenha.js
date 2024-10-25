// Configurações de Senha
document.getElementById('configuracaoIcon').addEventListener('click', function () {
    const formVenda = document.getElementById('vendaDiv');
    const formSenha = document.getElementById('alterarSenha');

    // Alterna entre o formulário de venda e o formulário de senha
    if (formVenda.style.display === 'none') {
        formVenda.style.display = 'block';  // Mostra o formulário de venda
        formSenha.style.display = 'none';   // Esconde o formulário de senha
    } else {
        formVenda.style.display = 'none';   // Esconde o formulário de venda
        formSenha.style.display = 'block';  // Mostra o formulário de senha
    }
});

// Cancelar a alteração da senha
document.getElementById('cancelarAlteracao').addEventListener('click', function () {
    document.getElementById('alterarSenha').style.display = 'none';
    document.getElementById('vendaDiv').style.display = 'block';
});

// Lógica para alterar a senha
document.getElementById('senhaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const novaSenha = document.getElementById('novaSenha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;

    if (novaSenha !== confirmaSenha) {
        alert('As senhas não conferem.');
        return;
    }

    const emailResponsavel = document.getElementById('email').value;
    responsaveis[emailResponsavel].senha = novaSenha;  // Atualiza a senha do responsável

    alert('Senha alterada com sucesso!');
    document.getElementById('alterarSenha').style.display = 'none'; // Fecha o formulário
    document.getElementById('vendaDiv').style.display = 'block';
});
