/* ######### PACOTE DE ÍCONES UTILIZADO ######### */
// https://github.com/feathericons/feather#feather
feather.replace();

/* ########## LOCALSTORAGE PARA SIMULAR LOGIN ######### */
if (localStorage.getItem('home') === 'logged') {

  // redirecionar para a home se estiver logado
  window.location.href = "../../home.jsp";
}

/* ########## Função para definir o login ######### */
function setLogin(login) {
  // Se login for verdadeiro
  if (!!login) {
    localStorage.setItem('home', 'logged');
  }
};

/* ########## VALIDAÇÃO, LOGIN e LOGOUT ######### */
// ação de submit do login
$('#btn-login').click(function () {
  const getMail = $('#login-input-email').val();
  const getPass = $('#login-input-password').val();

  // se não preencher campos
  if (!getMail.length || !getPass.length) {
    alert('Atenção! É obrigatório o preenchimento de E-MAIL e SENHA!')
    return false;
  }

  // se a senha não possuir o mínimo de 6 caracteres
  if (getPass.length < 6) {
    alert('Atenção! A SENHA deve possuir o mínimo de 6 caracteres!')
    return false;
  }

  // efetuar login
  setLogin(true);

  // Redireciona para a home
  window.location.href = "../../home.jsp";
});


/* ########## VALIDAÇÃO DE E-MAIL PARA RECUPERAÇÃO DE SENHA ######### */
$('#btn-recover').click(function () {
  const getMail = $('#login-input-email').val();

  if (!getMail.length) {
    alert('Atenção! É obrigatório o preenchimento de E-MAIL para recuperar o acesso!')
    return false;
  }

  window.location.href = "../../set-pass.jsp";
});


/* ########## VALIDAÇÃO DE NOVA SENHA ######### */
$('#btn-setpass').click(function () {
  const getPass = $('#login-input-password').val();
  const getRepeatPass = $('#login-input-password-repeat').val();


  // se campos vazios
  if (!getRepeatPass.length || !getPass.length) {
    alert('Atenção! É obrigatório o preenchimento das senhas!');
    return false;
  }


  // se senha possuir menos que 6 caracteres
  if (getPass.length < 6) {
    alert('Atenção! A SENHA deve possuir o mínimo de 6 caracteres!');
    return false;
  }

  // se senhas não forem iguais
  if (getRepeatPass.length !== getPass.length) {
    alert('Atenção! As senhas devem ser iguais!');
    return false;
  }

  window.location.href = "./";
});