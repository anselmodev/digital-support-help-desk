$(document).ready(function () {
    /* ######### PACOTE DE ÍCONES UTILIZADO ######### */
    // https://github.com/feathericons/feather#feather
    feather.replace();

    /* LOGOUT ----------------------------------------------- */
    $('#user-logout').click(function () {

        if (window.confirm("Você realmente quer sair?")) {

            // Verificar dados do usuário e autenticar
            $.post("users-logout")
                .done(function (data) {
                    if (data === 'logout-success') {

                        window.location.href = "./";

                    }
                })
                .fail(function (data) {
                    if (data.responseText === 'server-error') {
                        alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                        return;
                    }
                    alert("Atenção! Erro ao efetuar o Logout!");
                });

        }
    });
    /* LOGOUT ----------------------------------------------- */

    /* USERS */
    const getUserInfo = userInfo();
    $('#user-profile').text(`Usuário: ${getUserInfo.userName}`);

    /* GET HOME DATA */
    dataHome();

    $('#show-hide-pass').click(function () {
        if (!showPassUser) {
            // define o tipo do input password
            showPassUser = true;

            // muda o tipo de input "password" para "text"
            $('#userPass').attr('type', 'text');

            // muda o tipo de ícone
            $('#eye-hide').hide();
            $('#eye-show').show();

        } else {
            // define o tipo do input password
            showPassUser = false;

            // muda o tipo de input "text" para "password"
            $('#userPass').attr('type', 'password');

            // muda o tipo de ícone
            $('#eye-hide').show();
            $('#eye-show').hide();

        }

    });

    /* ########## MODAL ######### */
    // click novo chamado
    $('#btn-new-ticket').click(function () {
        // limpa últimas infos do form e index
        indexTicket = undefined;
        $('#interaction').html('');
        $('#customerName').val('');
        $('#subject').val('');
        $('#report').val('');
        $("#status").val(1).change();

        // desabilita campos nome e assunto
        $('#customerName, #subject').attr('disabled', false);

        // Esconde a lista de interações
        $('.list-interacions').hide();

        // Exibe "NOVO CHAMADO" no lugar do número de protocolo em: <p class="protocol-number">
        $('.protocol-number').text('NOVO CHAMADO');

        // Abre o modal
        $('.list-interacions-title').css('visibility', 'hidden');
        $('#modalTicket').modal('show');
    });

    // salvar/atualizar chamado
    $('#save-ticket').click(function () {

        if ($('.protocol-number').text() === 'NOVO CHAMADO') {

            setNewItcket();

        } else {

            const dataToUpdate = {
                ticketID: ticketId,
                ticketStatus: $('#status').val(),
                ticketDescription: $('#report').val(),
                ticketDate: setDate('yyyy-MM-dd HH:mm:ss')
            };

            updateTicket(dataToUpdate);
        }

    });

});

// abrir modal cadastro de usuários
$('#user-register, #new-user').click(function () {
    // reseta último ID
    userID = null;

    $('#userName').val('');
    $('#userEmail').val('');
    $('#userPass').val('');
    $('#accessType').val(0).change();

    // Abre o modal
    $('#modalUser').modal('show');

    // resetar o input password
    $('#userPass').attr('type', 'password');
    $('#eye-hide').show();
    $('#eye-show').hide();

    // alterar dica do modal
    usersTips('new');


    // valida o ID do elemento "#new-user" clicado para dar o foco no input name quando NOVO
    if ($(this).attr('id') === 'new-user') {
        $('#userName').focus();

        // alterar dica do modal
        usersTips('new');

    } else {

        // limpar última lista aberta
        $('#list-items-users').html('');

        getUsersList();

    }
});

// salvar/atualizar usuário
$('#save-user').click(function () {

    setUser();

});