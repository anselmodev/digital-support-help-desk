/* VARS */
let ticketSaved = false;
let userSaved = false;

$(document).ready(function() { 
	/* ######### PACOTE DE ÍCONES UTILIZADO ######### */ 
	// https://github.com/feathericons/feather#feather
	feather.replace();

	/* LOGOUT ----------------------------------------------- */ 
	$('#user-logout').click(function() {

		if (window.confirm("Você realmente quer sair?")) { 

			// Verificar dados do usuário e autenticar
			$.post("users-logout")
				.done(function(data) {
					if (data === 'logout-success') {

						window.location.href = "./";

					}
				})
				.fail(function(data) {
					if (data.responseText === 'server-error') {
						alert('Atenção! Erro de servidor. Por favor, contate a administração.');
						return;
					}
					alert("Atenção! Erro ao efetuar o Logout!");
				});

		} 
	});
	/* LOGOUT ----------------------------------------------- */

	/* GET USERS */

	/* GET HOME DATA */
	dataHome();
	
});

/* ########## BANCO DE DADOS SIMULADO (objeto javascript) ######### */
// lista de usuários
var DATA_BASE_SIMULATION_USERS = [
	{
		id: 'user-1',
		name: 'Silvia Alencar',
		email: 'silvia-al@meuemail.com.br',
		password: '123456789'
	}
];


/* ########## ALERTA DE SUCESSO ######### */
function successAlert(textAlert, timer) {
	// mostra alerta
	$('#success-alert').show();
	$('#success-alert span').text(textAlert || 'Chamado salvo com sucesso');

	// esconde alerta depois do timer definido
	setTimeout(() => {
		$('#success-alert').hide();
		$('#success-alert span').text('');
	}, timer || 3000);
};


/* ########## SALVAR NOVO CHAMADO ######### */
function setItcket() {
	// pega os valores do input
	var getName = $('#customerName').val();
	var getSubject = $('#subject').val();
	var getStatus = $("#status").val();
	var getReport = $("#report").val();

	// valida preenchimento antes de salvar
	if (!getName.length || !getSubject.length || !getReport.length) {

		alert('É obrigatórios preencher todos os campos do formulário!');

	} else {

		// define data
		var dateNow = setDate();

		// pega dados do formulario
		var dataTicket = {
			id: 'item-' + randomNumber(),
			ticketNumber: Number('2020' + randomNumber()),
			customerName: getName,
			subject: getSubject,
			reportInfo: [
				{
					date: dateNow,
					message: getReport
				}
			],
			updatedAt: dateNow,
			status: Number(getStatus)
		};

		// adiciona dados no banco: DATA_BASE_SIMULATION
		DATA_BASE_SIMULATION.unshift(dataTicket);

		// atualiza lista de chamados e resumo
		setList(true);
		getResumeAttendance();
		getResumeFinalized();

		$('#modalTicket').modal('hide');

	}
};

/* ########## SALVAR NOVA INTERAÇÃO PELO ID DO CHAMADO ######### */
function setInteraction() {
	var getReport = $("#report").val();
	var getStatus = $("#status").val();

	// atualiza lista de interações, lista de chamados, resumo
	// setList(true);
	// getResumeAttendance();
	// getResumeFinalized();

	// se existir mensagem no campo NOVA INTERAÇÃO
	if (getReport.length) {
		$('#interaction').prepend(
			'<p>EM: <b>' + dataInteraction.date + '</b></p>' +
			'<p class="text-interacion">' + dataInteraction.message + '</p>'
		);
	}

	// limpa campo de NOVA INTERAÇÃO
	$("#report").val('');

	// se o chamado for finalizado, fechar o modal ao salvar
	if (Number(getStatus) === 2) {
		$('#modalTicket').modal('hide');
	} else {
		successAlert('Chamado Atualizado com Sucesso');
	}

}

$('#show-hide-pass').click(function() {
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
$('#btn-new-ticket').click(function() {
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
	$('#modalTicket').modal('show');
});

// salvar/atualizar chamado
$('#save-ticket').click(function() {
	
	if($('.protocol-number').text() === 'NOVO CHAMADO') {
		console.log('salvar ticket');
	} else {
		console.log('atualizar ticket');	
	}
	
});

// abrir modal cadastro de usuários
$('#user-register, #new-user').click(function() {
	// limpa últimas infos do form e index
	indexUser = undefined;

	$('#userName').val('');
	$('#userEmail').val('');
	$('#userPass').val('');

	// Abre o modal
	$('#modalUser').modal('show');

	// resetar o input password
	showPassUser = false;
	$('#userPass').attr('type', 'password');
	$('#eye-hide').show();
	$('#eye-show').hide();


	// valida o ID do elemento "#new-user" clicado para dar o foco no input name quando NOVO
	if ($(this).attr('id') === 'new-user') {
		$('#userName').focus();
	}
});


// salvar/atualizar usuário
$('#save-user').click(function() {
	// dados do usuário vindo do form
	var userName = $('#userName').val();
	var userEmail = $('#userEmail').val();
	var userPass = $('#userPass').val();

	// verifica campos vazios
	if (!userName.length || !userEmail.length) {
		alert("É obrigatório preencher todos os dados do usuário!");
		return false;
	}

	// valida email
	if (!validateEmail(userEmail)) {
		alert("O e-mail digitado não é válido!");
		return false;
	}

	// valida senha (mínimo de 6 caracteres com maiúsculas, minúsculas e números)
	if (userPass.length && !checkPassword(userPass)) {
		alert("A senha de possuir ao menos 6 caracteres entre maiúsculas, minúsculas e números!");
		return false;
	}

	// salvar usuário editado se houver o INDEX
	if (indexUser !== undefined) {

		DATA_BASE_SIMULATION_USERS[indexUser].name = userName;
		DATA_BASE_SIMULATION_USERS[indexUser].email = userEmail;

		// se a senha foi preenchida para alteração
		if (userPass.length) {
			DATA_BASE_SIMULATION_USERS[indexUser].password = userName;
		}

	}

	// salvar novo usuário
	else {

		DATA_BASE_SIMULATION_USERS.unshift({
			id: 'user-' + randomNumber(),
			name: userName,
			email: userEmail,
			password: userPass
		});

		// Limpar form
		$('#userName').val('');
		$('#userEmail').val('');
		$('#userPass').val('');

	}

	// atualiza a lista de usuários e reseta o form
	setListUsers(true);

});