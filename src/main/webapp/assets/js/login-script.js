$(document).ready(function() {

	function spinner(show) {
		if(!!show) {
		
			$('#btn-login').css('opacity', 0).attr('disabled', true);
			$('#login-spinner').css('visibility', 'inherit');
			
		} else {
		
			$('#btn-login').css('opacity', 1).attr('disabled', false);
			$('#login-spinner').css('visibility', 'hidden');
			
		}
	}

	/* ######### PACOTE DE ÍCONES UTILIZADO ######### */
	// https://github.com/feathericons/feather#feather
	feather.replace();

	const SET_LOGIN = () => {
		
		const getMail = $('#login-input-email').val();
		const getPass = $('#login-input-password').val();

		// se não preencher campos
		if (!getMail.length || !getPass.length) {
			alert('Atenção! É obrigatório o preenchimento de E-MAIL e SENHA!');
			return false;
		}

		// se a senha não possuir o mínimo de 6 caracteres
		if (getPass.length < 6) {
			alert('Atenção! A SENHA deve possuir o mínimo de 6 caracteres!');
			return false;
		}
		
		// Show Spinner
		spinner(true);

		// Verificar dados do usuário e autenticar
		$.post("users-login", { email: getMail, password: getPass })

			.done(function(data) { console.log(data);
				if(data && data.authSuccess === 'authentication-success') {
					localStorage.setItem('8e3c824e1d6254b74a013799c1565538', data['8e3c824e1d6254b74a013799c1565538']);
					localStorage.setItem('a0fbf479272cd38c220fbf726678d8d6', data['a0fbf479272cd38c220fbf726678d8d6']);
					window.location.href = "home.jsp";
				}
			})
			.fail(function(data) { console.log(data);
				if(data.responseText === 'server-error') {
					alert('Atenção! Erro de servidor. Por favor, contate a administração.');
					return;
				}
				
				alert("Atenção! Dados Inválidos ou Usuário Inexistente.");

				$('#login-input-email').select();
				$('#login-input-password').val("");
				
			}).always(function() {
				// Show Spinner
				spinner(false);
			});
	};

	/* VALIDAÇÃO, LOGIN ----------------------------------------------- */
	$('#btn-login').click(function() {
		SET_LOGIN();
	});

	$('#login-input-email, #login-input-password').on('keypress', function(e) {
		if (e.which == 13) {
			SET_LOGIN();
		}
	});
	/* VALIDAÇÃO, LOGIN ----------------------------------------------- */
	

});
