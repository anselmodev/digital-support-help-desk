/* SPINNER */
function spinner(elementID, show) {
	if (!!show) {

		$(elementID).css('visibility', 'inherit');

	} else {

		$(elementID).css('visibility', 'hidden');

	}
}

// converte status para exibir em texto (condição ternária)
function setStatus(status) {
	return status === 1 ? '<span class="statusOn">Em Atendimento</span>' : '<span class="statusOff">Finalizado</span>';
};

// Converter data (DD/MM/YYYY hh:mm:ss)
function convertDate(dateToFormat) {
	const splitDateAndHour = dateToFormat.split(' ');

	const splitDate = splitDateAndHour[0].split('-');

	return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]} às ${splitDateAndHour[1]} h`;
}

/* VALIDAR E-MAIL */
function validateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	}
	return false;
}

/* VALIDAR SENHA */
function checkPassword(str) {
	// pelo menos um número, uma letra minúscula e uma letra maiúscula
	// mínimo de 6 caracteres
	var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	return re.test(str);
}


/* ########## GERADOR DE NÚMEROS RANDÔNICOS ######### */
function randomNumber() {
	return Math.floor(Math.random() * (100 - 9999999 + 1)) + 9999999;
}

/* ########## DEFINE DATA ATUAL ######### */
function setDate(format) {
	return jQuery.format.toBrowserTimeZone(new Date(), format || 'dd/MM/yyyy - HH:mm');
}

// Prepara lista de interações para exibir em: <div class="list-interacions" id="interaction">
function interactionsPrepare(data) {

	// Limpa últimas listas de interações
	$('#interaction').html('');

	// percorre lista
	data.interactions.map(function(item) {
		$('#interaction').append(
			'<p class="list-interacions-title">Últimas Interações</p>' +
			'<p>EM: <b>' + convertDate(item.interactionDate) + '</b></p>' +
			'<p class="text-interacion">' + item.description + '</p>'
		);
	});

	// Preenche os dados no formulário em: <form class="modal-form">
	$('#customerName').val(data.ticketCustomerName);
	$('#subject').val(data.ticketSubjectSupport);
	$("#status").val(data.ticketStatus).change();
	$(".protocol-number").text(`Protocolo: #${data.ticketNumber}`);

	return true;

};


/* LOAD HOME DATA */
function dataHome() {
	spinner('#homeSpinner', true);

	$.get("tickets-all")
		.done(function(data) {
			if (data !== 'tickets-not-found' && Object.keys(data).length) {
				// render resume counters
				$('#resumeAttendance').text(data.resumeCount.pending);
				$('#resumeFinalized').text(data.resumeCount.finished);

				// render front-end list
				data.resultTickets.map(function(item, index) {
					$('#list-items').append(
						'<tr>' +
						'<th scope="row">#' + item.ticketNumber + '</th>' +
						'<td>' + item.ticketCustomerName + '</td>' +
						'<td>' + convertDate(item.ticketUpdatedAt) + '</td>' +
						'<td>' + setStatus(item.ticketStatus) + '</td>' +
						'<td>' +
						'<a class="list-edit-item" data-id="' + item.ticketID + '">' +
						`
					            <svg xmlns="http://www.w3.org/2000/svg" 
					              xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 25 25">
					              <defs>
					                <style>.a{clip-path:url(#b);}.b{fill:none;stroke:#a358bc;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.c{fill:transparent;}</style>
					                <clipPath id="b">
					                  <rect width="25" height="25"/>
					                </clipPath>
					              </defs>
					              <g id="a" class="a">
					                <rect class="c" width="25" height="25"/>
					                <g transform="translate(-1.598 -1.416)">
					                  <path class="b" d="M13.029,6h-7.8A2.229,2.229,0,0,0,3,8.229v15.6a2.229,2.229,0,0,0,2.229,2.229h15.6a2.229,2.229,0,0,0,2.229-2.229v-7.8" transform="translate(0 -1.044)"/>
					                  <path class="b" d="M22.583,3.444a2.138,2.138,0,0,1,3.024,3.024l-9.575,9.575L12,17.051l1.008-4.032Z" transform="translate(-1.037)"/>
					                </g>
					              </g>
					            </svg>
					            `+
						'</a>' +
						'</td>' +
						'</tr>'
					);
				});

				// CLICK OPEN MODAL
				$('.list-edit-item').on('click', function() {
					const getTicketID = $(this).attr('data-id');
					// limpa campo de nova interação
					$("#report").val('');

					// desabilita campos nome e assunto
					$('#customerName, #subject').attr('disabled', true);


					// Exibe a lista de interações em: <div class="list-interacions">
					$('.list-interacions').show();

					// Abre o modal de edição do ticket
					$('#modalTicket').modal('show');

					// carregar e exibir dados do ticket
					$('#modalTicket').one('shown.bs.modal', function() { 
						if(getTicketID !== '') {
							spinner('#modalSpinner', true);
						}
						

						$.get("ticket-open?ticketid=" + getTicketID)
							.done(function(data) {

								if (data !== 'tickets-not-found' && Object.keys(data).length) {
									if (!!interactionsPrepare(data)) {
										spinner('#modalSpinner', false);
									}
								}
							}
							).fail(function(data) {
								spinner('#modalSpinner', false);

								if (data.responseText === 'server-error') {
									alert('Atenção! Erro de servidor. Por favor, contate a administração.');
									return;
								} else if (data.responseText === 'login-required') {
									window.location.href = "./?setlogin=1";
									return;
								}
							});;

					})
				});

			} else {
				// render empty list
				$('#list-items').html('<p class="empty-list">Nenhum Ticket para Exibir!</p>');
			}

			spinner('#homeSpinner', false);
		})
		.fail(function(data) {
			spinner('#homeSpinner', false);

			if (data.responseText === 'server-error') {
				alert('Atenção! Erro de servidor. Por favor, contate a administração.');
				return;
			} else if (data.responseText === 'login-required') {
				window.location.href = "./?setlogin=1";
				return;
			}
		});


};