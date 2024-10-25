// Função para deslogar
document.getElementById('sairLink').addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir comportamento padrão do link
    // Lógica para deslogar e redirecionar para a tela de login
    document.getElementById('vendaDiv').style.display = 'none';
    document.getElementById('loginDiv').style.display = 'block'; // Mostra novamente a tela de login
});
