/* VARS */
let ticketId = null;
let ticketSaved = false;
let userNumber = 0;
let userRemovable = null;
let userID = null;
let showPassUser = false;

/* SPINNER */
function spinner(elementID, show) {
    if (!!show) {

        $(elementID).css('visibility', 'inherit');

    } else {

        $(elementID).css('visibility', 'hidden');

    }
}

/* Dica modal Usuários */
function usersTips(type, getName) {

    if (type === 'edit') {

        $('.tip-user').html(`* Edição do Usuário:  ${getName}`)
            .removeClass('tip-user-new').addClass('tip-user-edit');

    } else if (type === 'new') {

        $('.tip-user').html(` Preencha para adicionar um novo usuário ou clique em "Editar"!`)
            .removeClass('tip-user-edit').addClass('tip-user-new');

    }

};

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

/* DEFINE DATA ATUAL */
function setDate(format) {
    return jQuery.format.toBrowserTimeZone(new Date(), format || 'dd/MM/yyyy - HH:mm');
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

/* GERADOR DE NÚMEROS RANDÔNICOS */
function randomNumber() {
    return Math.floor(Math.random() * (100 - 999999 + 1)) + 999999;
}

// Prepara lista de interações para exibir em: <div class="list-interacions" id="interaction">
function interactionsPrepare(data) {

    // Limpa últimas listas de interações
    $('#interaction').html('');

    // percorre lista
    data.interactions.map(function (item) {
        $('#interaction').append(
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

/* ALERTA DE SUCESSO */
function successAlert(textAlert, timer, element) {
    const getElement = element || '#success-alert';
    // mostra alerta
    $(getElement).show();
    $(`${getElement} span`).text(textAlert || 'Chamado salvo com sucesso');

    // esconde alerta depois do timer definido
    setTimeout(() => {
        $(getElement).hide();
        $(`${getElement} span`).text('');
    }, timer || 3000);
};

/* SALVAR NOVA INTERAÇÃO PELO ID DO CHAMADO  */
function setInteraction(dataUpdated) {
    // se existir mensagem no campo NOVA INTERAÇÃO
    if (Object.keys(dataUpdated).length) {
        $('#interaction').append(
            '<p>EM: <b>' + convertDate(dataUpdated.ticketDate) + '</b></p>' +
            '<p class="text-interacion">' + dataUpdated.ticketDescription + '</p>'
        );
        $("#interaction").scrollTop(999999);
    }

    // limpa campo de NOVA INTERAÇÃO
    $("#report").val('');

    // se o chamado for finalizado, fechar o modal ao salvar
    if (Number(dataUpdated.ticketStatus) === 2) {
        $('#modalTicket').modal('hide');
    } else {
        successAlert('Chamado Atualizado com Sucesso');
    }

}

/* LOAD HOME DATA */
function dataHome() {
    spinner('#homeSpinner', true);
    $('#list-items').html(''); //clear lista to update

    $.get("tickets-all")
        .done(function (data) {
            if (data !== 'tickets-not-found' && Object.keys(data).length) {
                // render resume counters
                $('#resumeAttendance').text(data.resumeCount.pending);
                $('#resumeFinalized').text(data.resumeCount.finished);

                // render front-end list
                data.resultTickets.map(function (item, index) {
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
					            ` +
                        '</a>' +
                        '</td>' +
                        '</tr>'
                    );
                });

                // CLICK OPEN MODAL
                $('.list-edit-item').on('click', function () {
                    $('.list-interacions-title').css('visibility', 'inherit');

                    const getTicketID = $(this).attr('data-id');
                    ticketId = getTicketID;

                    // limpa campo de nova interação
                    $("#report").val('');

                    // desabilita campos nome e assunto
                    $('#customerName, #subject').attr('disabled', true);


                    // Exibe a lista de interações em: <div class="list-interacions">
                    $('.list-interacions').show();

                    // Abre o modal de edição do ticket
                    $('#modalTicket').modal('show');

                    // carregar e exibir dados do ticket
                    $('#modalTicket').one('shown.bs.modal', function () {
                        if (getTicketID !== '') {
                            spinner('#modalSpinner', true);
                        }

                        $.get("ticket-open?ticketid=" + getTicketID)
                            .done(function (data) {
                                    if (data !== 'tickets-not-found' && Object.keys(data).length) {
                                        if (!!interactionsPrepare(data)) {
                                            spinner('#modalSpinner', false);
                                            $("#interaction").scrollTop(999999);
                                        }
                                    }
                                }
                            ).fail(function (data) {
                            spinner('#modalSpinner', false);

                            if (data.responseText === 'server-error') {
                                alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                                return;
                            } else if (data.responseText === 'login-required') {
                                window.location.href = "./?setlogin=1";
                                return;
                            }
                        });
                        ;

                    });

                    // Ao fechar modal
                    $('#modalTicket').on('hidden.bs.modal', function () {
                        if (!!ticketSaved) {
                            dataHome();
                            ticketId = null;
                            ticketSaved = false;
                        }


                    });
                });

            } else {
                // render empty list
                $('#list-items').html('<p class="empty-list">Nenhum Ticket para Exibir!</p>');
            }

            spinner('#homeSpinner', false);
        })
        .fail(function (data) {
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

/* Update Ticket */
function updateTicket(dataToUpdate) {
    spinner('#modalSpinner', false);

    $.post('ticket-update', dataToUpdate)
        .done(function (data) {
            if (data === 1) {
                setInteraction(dataToUpdate);
                ticketSaved = true;
            } else {
                console.log('Nenhuma alteração aplicada!');
            }
        })
        .fail(function (data) {
            spinner('#modalSpinner', false);

            if (data.responseText === 'server-error') {
                alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                return;
            } else if (data.responseText === 'login-required') {
                window.location.href = "./?setlogin=1";
                return;
            }
        });
};

/* SALVAR NOVO CHAMADO */
function setNewItcket() {
    // pega os valores do input
    var getName = $('#customerName').val();
    var getSubject = $('#subject').val();
    var getStatus = $("#status").val();
    var getReport = $("#report").val();

    // valida preenchimento antes de salvar
    if (!getName.length || !getSubject.length || !getReport.length) {

        alert('É obrigatórios preencher todos os campos do formulário!');

    } else {
        spinner('#modalSpinner', true);

        // define data
        const dateNow = setDate('yyyy-MM-dd HH:mm:ss');

        // pega dados do formulario
        const dataTicket = {
            ticketNumber: Number('2020' + randomNumber()),
            ticketCustomerName: getName,
            ticketSubject: getSubject,
            ticketDescription: getReport,
            ticketDate: dateNow,
            ticketStatus: Number(getStatus)
        };

        $.post('ticket-new', dataTicket)
            .done(function (data) {
                if (data === 1) {
                    ticketSaved = true;

                    $('#modalTicket').modal('hide');

                    // Ao fechar modal
                    $('#modalTicket').on('hidden.bs.modal', function () {
                        if (!!ticketSaved) {
                            dataHome();
                            ticketSaved = false;
                        }
                    });
                } else {
                    console.log('Nenhuma alteração aplicada!');
                }

                spinner('#modalSpinner', false);
            })
            .fail(function (data) {
                spinner('#modalSpinner', false);

                if (data.responseText === 'server-error') {
                    alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                    return;
                } else if (data.responseText === 'login-required') {
                    window.location.href = "./?setlogin=1";
                    return;
                }
            });

    }
};

/* User Name and number */
function userInfo() {
    return {
        userName: localStorage.getItem('a0fbf479272cd38c220fbf726678d8d6').split(' ')[0],
        userNumber: localStorage.getItem('8e3c824e1d6254b74a013799c1565538')
    };
};

/* validar usuário */
function checkUser() {
    // dados do usuário vindo do form
    const userName = $('#userName').val();
    const userEmail = $('#userEmail').val();
    const userPass = $('#userPass').val();

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

    // se novo usuário
    if (!userID) {
        if (!checkPassword(userPass)) {
            alert("A senha de possuir ao menos 6 caracteres entre maiúsculas, minúsculas e números!");
            return false;
        }
    } else {
        if (userPass.length && !checkPassword(userPass)) {
            alert("A senha de possuir ao menos 6 caracteres entre maiúsculas, minúsculas e números!");
            return false;
        }
    }

    return {
        userID: userID,
        userName: userName,
        userEmail: userEmail,
        userPass: userPass
    }
};

/* Abrir usuário */
function openUser(element) {

    const getBtnElUser = $(element);
    userID = getBtnElUser.attr('data-id');
    const getName = getBtnElUser.attr('data-name');
    const getEmail = getBtnElUser.attr('data-email');
    const getAccess = getBtnElUser.attr('data-access');
    userNumber = getBtnElUser.attr('data-number');

    // alterar dica do modal
    usersTips('edit', getName);

    // Setar info do usuário no Form
    $('#userName').val(getName);
    $('#userEmail').val(getEmail);
    $("#accessType").val(getAccess).change();

};

/* User html Table */
function userTableItem(itemData) {
    $('#list-items-users').append(
        '<tr>' +
        '<td class="name-user">' + itemData.userName + ' <small><em>'+(!itemData.userRemovable ? '( não editável )' : '')+'</em></small></td>' +
        '<td>' +
        '<a class="list-edit-item user-item '+(!itemData.userRemovable ? 'blocked-edit' : '')+'" data-id="' + itemData.userID + '" data-name="' + itemData.userName + '" data-email="' + itemData.userEmail + '" data-access="' + itemData.userTypeAccess + '" data-number="' + itemData.userNumber + '">' +
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
            ` +
        '</a>' +
        '</td>' +
        '</tr>'
    );
};

/* Abrir e Alterar Usuário */
function setUser(element) {

    if (userID) {
        const validateUser = checkUser();

        if (validateUser !== false) {
            spinner('#modalSpinnerUsers', true);

            $.post('user-update', {
                userAdmin: localStorage.getItem('8e3c824e1d6254b74a013799c1565538'),
                userRemovable,
                userID,
                userName: $('#userName').val(),
                userEmail: $('#userEmail').val(),
                userPass: $('#userPass').val(),
                userTypeAccess:  $('#accessType').val()
            })
                .done(function (data) {
                    if (data === 'user-is-not-authorized') {
                        alert('Sua conta não tem autorização para criar ou editar um usuários!');

                        return false;
                    }

                    if (data === 'user-is-not-saved') {
                        alert('Nenhuma Alteração Efetuada!');

                        return false;
                    }

                    // Atualizar lista de usuários
                    $('#list-items-users').html('');
                    getUsersList();

                    spinner('#modalSpinnerUsers', false);

                    usersTips('edit', $('#userName').val());

                    // alerta de salvo com sucesso
                    successAlert('Usuário Atualizado com Sucesso!', 3000, '#success-alert-user');
                })
                .fail(function (data) {
                    spinner('#modalSpinnerUsers', false);

                    if (data.responseText === 'server-error') {
                        alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                        return;
                    } else if (data.responseText === 'login-required') {
                        window.location.href = "./?setlogin=1";
                        return;
                    }
                });
        }
    } else if (!userID) {
        const validateUser = checkUser();

        if (validateUser !== false) {
            spinner('#modalSpinnerUsers', true);

            $.post('user-new', {
                userAdmin: localStorage.getItem('8e3c824e1d6254b74a013799c1565538'),
                userNumber: randomNumber(),
                userName: $('#userName').val(),
                userEmail: $('#userEmail').val(),
                userPass: $('#userPass').val(),
                userTypeAccess:  $('#accessType').val()
            })
                .done(function (data) {
                    if (data === 'user-is-not-authorized') {
                        alert('Sua conta não tem autorização para criar ou editar um usuários!');

                        return false;
                    }

                    if (data === 'user-is-not-saved') {
                        alert('Nenhuma Alteração Efetuada!');

                        return false;
                    }

                    // Atualizar lista de usuários
                    $('#list-items-users').html('');
                    getUsersList();

                    // Limpar Formulário
                    $('#userName').val('');
                    $('#userEmail').val('');
                    $('#userPass').val('');
                    $('#accessType').val(0).change();

                    // resetar o input password
                    $('#userPass').attr('type', 'password');
                    $('#eye-hide').show();
                    $('#eye-show').hide();

                    spinner('#modalSpinnerUsers', false);

                    // alerta de salvo com sucesso
                    successAlert('Usuário Salvo com Sucesso!', 3000, '#success-alert-user');

                })
                .fail(function (data) {
                    spinner('#modalSpinnerUsers', false);

                    if (data.responseText === 'server-error') {
                        alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                        return;
                    } else if (data.responseText === 'login-required') {
                        window.location.href = "./?setlogin=1";
                        return;
                    }
                });
        }

    }

};

/* Listar Usuários */
function getUsersList() {
    spinner('#modalSpinnerUsers', true);

    $.get('users-listall')
        .done(function (data) {

            // percorre a lista para inserir as linhas em: <tbody id="list-items">
            data.resultUsers.map(function (item) {
                userTableItem(item);
            });

            spinner('#modalSpinnerUsers', false);

            // Abrir usuário para edição
            $('.user-item').click(function () {
                $('#userPass').val('');
                openUser(this);
            });
        })
        .fail(function (data) {
            spinner('#modalSpinnerUsers', false);

            if (data.responseText === 'server-error') {
                alert('Atenção! Erro de servidor. Por favor, contate a administração.');
                return;
            } else if (data.responseText === 'login-required') {
                window.location.href = "./?setlogin=1";
                return;
            }
        });

};
