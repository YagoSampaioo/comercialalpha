// Função de Logout
function logout() {
    // Aqui você pode adicionar lógica para limpar os dados de login, se necessário
    document.getElementById('vendaDiv').style.display = 'none'; // Esconde o formulário de venda
    document.getElementById('loginDiv').style.display = 'block'; // Mostra o formulário de login
    document.getElementById('sairLink').style.display = 'none'; // Esconde o link de sair
    document.getElementById('loginMessage').innerText = ''; // Limpa a mensagem de erro
}