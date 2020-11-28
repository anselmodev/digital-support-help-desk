<%
    String getSession = session.getId();

    if (getSession != null) {
        CookieSystem ck = new CookieSystem();
        String checkUserNumber = ck.getCookie(request, "userNumber");

        if (checkUserNumber == null) {
            String redirectURL = "./";
            response.sendRedirect(redirectURL);
        }
    }

%>
<%@page import="security.CookieSystem" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="robots" content="noindex"/>
    <!-- Não ser indexado em buscadores -->

    <!-- Bootstrap styles -->
    <link rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous">

    <!-- Local styles -->
    <link rel="stylesheet" href="./assets/css/bootstrap-replace.css">
    <link rel="stylesheet" href="./assets/css/styles-home.css">

    <title>Suporte Digital - Home</title>
</head>

<body>
<!-- MAIN CONTENT -->
<main class="container-fluid main-content">
    <!-- watermark -->
    <div class="watermark">
        <svg viewBox="0 0 652.3 921">
            <path style="fill: #51569A;"
                  d="M238,917.009a19.188,19.188,0,0,1-3.492-26.9C384.33,695.471,384.175,501.6,383.676,480.11a57.582,57.582,0,1,0-115.162-.461c.23,6.178,4.912,170.308-125.294,339.772a19.185,19.185,0,0,1-30.433-23.37c121.841-158.6,117.619-309.341,117.39-315.71,0-53.61,43.016-96.667,95.936-96.667a96.021,96.021,0,0,1,95.937,95.936c.575,22.334,1,228.446-157.109,433.831A19,19,0,0,1,249.709,921,19.272,19.272,0,0,1,238,917.009Zm92.215,1a19.182,19.182,0,0,1-5.909-26.479c49.006-77.134,91.755-177.6,92.178-178.6,3.146-7.443,10.283-12.587,18.765-11.665A19.168,19.168,0,0,1,452.559,715c.039.077,8.635,29.242,17.845,56.757l23.1,73.564A19.184,19.184,0,1,1,456.894,856.8l-22.987-73.182c-1.036-3.031-2.035-6.14-3.071-9.21-17.574,37.378-44.476,91.026-74.178,137.767a19.187,19.187,0,0,1-26.439,5.834ZM168.2,880.475A19.208,19.208,0,0,1,165.17,853.5c54.646-68.346,94.517-144.136,118.541-225.184a19.345,19.345,0,0,1,23.869-12.972,19.128,19.128,0,0,1,12.931,23.831c-25.442,85.845-67.616,166.01-125.371,238.308a19.209,19.209,0,0,1-26.939,2.993Zm350.325-79.59L500.8,743.937c-31.927-99.661-39.028-208.031-40.409-263.751,0-74.524-60.25-134.811-134.313-134.811-74.025,0-134.235,61.476-134.235,137,.114,31.7-6.14,143.1-91.525,266.246a19.193,19.193,0,1,1-31.544-21.874c81.01-116.852,84.731-223.535,84.694-243.719,0-97.358,77.441-176.026,172.65-176.026S498.8,384.479,498.8,479.687c1.074,42.711,6.983,153.923,38.6,252.7l17.807,57.1a19.175,19.175,0,0,1-12.626,24.021,18.453,18.453,0,0,1-5.719.884A19.22,19.22,0,0,1,518.526,800.886Zm55.911-88.8-21.951-72.3c-13.354-60.671-14.466-116.046-15.119-149.164l-.23-10.438a210.5,210.5,0,0,0-12.01-70.725,19.177,19.177,0,1,1,36.149-12.816,248.045,248.045,0,0,1,14.237,83.042l.23,10.209c.652,31.659,1.688,84.694,13.853,140.184l21.606,70.84a19.193,19.193,0,0,1-12.779,23.946,20.4,20.4,0,0,1-5.6.806A19.27,19.27,0,0,1,574.437,712.085ZM37.381,669.108a19.19,19.19,0,0,1-7.33-26.133l10.784-19.188c23.1-47.587,36-97.09,35.881-138.343,0-69.918,25.788-133.928,72.643-181.321A246.723,246.723,0,0,1,326.114,230.25,249.442,249.442,0,0,1,514.151,315.9a19.2,19.2,0,0,1-28.934,25.252,211.02,211.02,0,0,0-159.1-72.529A208.693,208.693,0,0,0,176.644,331.1C136.964,371.242,115.09,425.7,115.09,484.41c.153,48.583-13.777,102.613-40.256,157.183l-11.32,20.184a19.179,19.179,0,0,1-16.73,9.786A19.443,19.443,0,0,1,37.381,669.108ZM316.75,575.317a19.208,19.208,0,0,1-15.888-21.989c7.138-44.476,6.064-72.529,6.064-72.8a19.2,19.2,0,0,1,18.343-19.994c10.9.346,19.533,7.676,19.993,18.305.038,1.266,1.342,31.852-6.484,80.587a19.223,19.223,0,0,1-18.958,16.118A21.123,21.123,0,0,1,316.75,575.317Zm297.177-95.631c0-158.72-129.093-287.812-287.813-287.812a289.911,289.911,0,0,0-71.3,8.864,19.173,19.173,0,1,1-9.518-37.146A326.074,326.074,0,0,1,326.114,153.5C505.977,153.5,652.3,299.823,652.3,479.686a19.188,19.188,0,1,1-38.376,0ZM18.884,498.874A19.17,19.17,0,0,1,0,479.381c1.382-87.456,35.035-168.849,94.785-229.252a327.943,327.943,0,0,1,67.541-52.574,19.2,19.2,0,0,1,19.381,33.156,288.986,288.986,0,0,0-59.635,46.433c-52.765,53.3-82.467,125.371-83.7,202.85a19.182,19.182,0,0,1-19.188,18.88ZM44.1,224.684a19.2,19.2,0,0,1-.152-27.131C122,118.539,219.586,76.748,326.114,76.748c106.952,0,204.615,41.791,282.4,120.844a19.185,19.185,0,1,1-27.362,26.9c-70.417-71.57-158.642-109.368-255.039-109.368-96.053,0-184.162,37.838-254.886,109.444a19.305,19.305,0,0,1-13.662,5.679A19.106,19.106,0,0,1,44.1,224.684ZM510.122,75.024C456.7,50.694,394.842,38.376,326.19,38.376c-69.113,0-130.974,12.318-183.855,36.61A19.18,19.18,0,0,1,126.3,40.141C184.241,13.507,251.474,0,326.19,0,400.368,0,467.6,13.507,526.009,40.1a19.186,19.186,0,0,1-7.943,36.649A19.508,19.508,0,0,1,510.122,75.024Z"/>
        </svg>
    </div>

    <!-- HEADER -->
    <header class="home-header">
        <div id="search-alert" class="alert alert-warning alert-search"
             role="alert">Nenhum Resultado Encontrado!
        </div>
        <!-- logo -->
        <div class="home-logo">
            <div class="home-logo-icon">
                <svg viewBox="0 0 652.3 921">
                    <path style="fill: white;"
                          d="M238,917.009a19.188,19.188,0,0,1-3.492-26.9C384.33,695.471,384.175,501.6,383.676,480.11a57.582,57.582,0,1,0-115.162-.461c.23,6.178,4.912,170.308-125.294,339.772a19.185,19.185,0,0,1-30.433-23.37c121.841-158.6,117.619-309.341,117.39-315.71,0-53.61,43.016-96.667,95.936-96.667a96.021,96.021,0,0,1,95.937,95.936c.575,22.334,1,228.446-157.109,433.831A19,19,0,0,1,249.709,921,19.272,19.272,0,0,1,238,917.009Zm92.215,1a19.182,19.182,0,0,1-5.909-26.479c49.006-77.134,91.755-177.6,92.178-178.6,3.146-7.443,10.283-12.587,18.765-11.665A19.168,19.168,0,0,1,452.559,715c.039.077,8.635,29.242,17.845,56.757l23.1,73.564A19.184,19.184,0,1,1,456.894,856.8l-22.987-73.182c-1.036-3.031-2.035-6.14-3.071-9.21-17.574,37.378-44.476,91.026-74.178,137.767a19.187,19.187,0,0,1-26.439,5.834ZM168.2,880.475A19.208,19.208,0,0,1,165.17,853.5c54.646-68.346,94.517-144.136,118.541-225.184a19.345,19.345,0,0,1,23.869-12.972,19.128,19.128,0,0,1,12.931,23.831c-25.442,85.845-67.616,166.01-125.371,238.308a19.209,19.209,0,0,1-26.939,2.993Zm350.325-79.59L500.8,743.937c-31.927-99.661-39.028-208.031-40.409-263.751,0-74.524-60.25-134.811-134.313-134.811-74.025,0-134.235,61.476-134.235,137,.114,31.7-6.14,143.1-91.525,266.246a19.193,19.193,0,1,1-31.544-21.874c81.01-116.852,84.731-223.535,84.694-243.719,0-97.358,77.441-176.026,172.65-176.026S498.8,384.479,498.8,479.687c1.074,42.711,6.983,153.923,38.6,252.7l17.807,57.1a19.175,19.175,0,0,1-12.626,24.021,18.453,18.453,0,0,1-5.719.884A19.22,19.22,0,0,1,518.526,800.886Zm55.911-88.8-21.951-72.3c-13.354-60.671-14.466-116.046-15.119-149.164l-.23-10.438a210.5,210.5,0,0,0-12.01-70.725,19.177,19.177,0,1,1,36.149-12.816,248.045,248.045,0,0,1,14.237,83.042l.23,10.209c.652,31.659,1.688,84.694,13.853,140.184l21.606,70.84a19.193,19.193,0,0,1-12.779,23.946,20.4,20.4,0,0,1-5.6.806A19.27,19.27,0,0,1,574.437,712.085ZM37.381,669.108a19.19,19.19,0,0,1-7.33-26.133l10.784-19.188c23.1-47.587,36-97.09,35.881-138.343,0-69.918,25.788-133.928,72.643-181.321A246.723,246.723,0,0,1,326.114,230.25,249.442,249.442,0,0,1,514.151,315.9a19.2,19.2,0,0,1-28.934,25.252,211.02,211.02,0,0,0-159.1-72.529A208.693,208.693,0,0,0,176.644,331.1C136.964,371.242,115.09,425.7,115.09,484.41c.153,48.583-13.777,102.613-40.256,157.183l-11.32,20.184a19.179,19.179,0,0,1-16.73,9.786A19.443,19.443,0,0,1,37.381,669.108ZM316.75,575.317a19.208,19.208,0,0,1-15.888-21.989c7.138-44.476,6.064-72.529,6.064-72.8a19.2,19.2,0,0,1,18.343-19.994c10.9.346,19.533,7.676,19.993,18.305.038,1.266,1.342,31.852-6.484,80.587a19.223,19.223,0,0,1-18.958,16.118A21.123,21.123,0,0,1,316.75,575.317Zm297.177-95.631c0-158.72-129.093-287.812-287.813-287.812a289.911,289.911,0,0,0-71.3,8.864,19.173,19.173,0,1,1-9.518-37.146A326.074,326.074,0,0,1,326.114,153.5C505.977,153.5,652.3,299.823,652.3,479.686a19.188,19.188,0,1,1-38.376,0ZM18.884,498.874A19.17,19.17,0,0,1,0,479.381c1.382-87.456,35.035-168.849,94.785-229.252a327.943,327.943,0,0,1,67.541-52.574,19.2,19.2,0,0,1,19.381,33.156,288.986,288.986,0,0,0-59.635,46.433c-52.765,53.3-82.467,125.371-83.7,202.85a19.182,19.182,0,0,1-19.188,18.88ZM44.1,224.684a19.2,19.2,0,0,1-.152-27.131C122,118.539,219.586,76.748,326.114,76.748c106.952,0,204.615,41.791,282.4,120.844a19.185,19.185,0,1,1-27.362,26.9c-70.417-71.57-158.642-109.368-255.039-109.368-96.053,0-184.162,37.838-254.886,109.444a19.305,19.305,0,0,1-13.662,5.679A19.106,19.106,0,0,1,44.1,224.684ZM510.122,75.024C456.7,50.694,394.842,38.376,326.19,38.376c-69.113,0-130.974,12.318-183.855,36.61A19.18,19.18,0,0,1,126.3,40.141C184.241,13.507,251.474,0,326.19,0,400.368,0,467.6,13.507,526.009,40.1a19.186,19.186,0,0,1-7.943,36.649A19.508,19.508,0,0,1,510.122,75.024Z"/>
                </svg>
            </div>

            <h1>
                <img src="./assets/img/logo-text-white.png" alt="Suporte Digital"
                     title="Suporte Digital">
            </h1>
        </div>

        <!-- search and menu -->
        <div class="home-search-menu">

            <!-- menu user -->
            <div class="dropdown">
                <a class="home-user" href="#" id="dropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i data-feather="user" width="35" color="white"></i>
                </a>

                <div class="dropdown-menu home-user-menu"
                     aria-labelledby="dropdownMenuLink">
                    <a id="user-profile" class="dropdown-item disabled">Usuário: <b>Silvia
                        Alencar</b></a>
                    <div class="dropdown-divider"></div>
                    <a id="user-register" class="dropdown-item">Cadastros de
                        Usuários</b>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a id="user-logout" class="dropdown-item">Sair</a>
                </div>
            </div>
        </div>
    </header>

    <!-- HOME SPINNER -->
    <div class="home-spinner" id="homeSpinner">
        <div class="overlay"></div>

        <div class="spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>

    <!-- CONTENT-HOME -->
    <section class="container-fluid content-home">

        <!-- resume -->
        <div class="resume-container">
            <div class="resume">
                <div class="resume-item">
                    <!-- svg image -->
                    <img src="./assets/svg/icon-resume-time.svg" alt="Em Atendimento"
                         title="Em Atendimento">
                    <div class="resume-data">
                        <p id="resumeAttendance">0</p>
                        <span>Em Atendimento</span>
                    </div>
                </div>

                <div class="resume-item">
                    <!-- svg image -->
                    <img src="./assets/svg/icon-resume-check.svg" alt="Em Atendimento"
                         title="Em Atendimento">
                    <div class="resume-data">
                        <p id="resumeFinalized">0</p>
                        <span>Finalizados</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- new ticket button -->
        <div class="result-search">
            <button id="btn-new-ticket" type="submit" class="btn btn-primary">
                NOVO CHAMADO
            </button>
            <p></p>
        </div>

        <!-- modal form tickets -->
        <div class="modal fade" id="modalTicket" data-backdrop="static"
             tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel"
             aria-hidden="true">

            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">

                    <div class="home-spinner" id="modalSpinner">
                        <div class="overlay"></div>

                        <div class="spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Chamado de Suporte</h5>
                        <a type="button" class="close" data-dismiss="modal"
                           aria-label="Close"> <span aria-hidden="true">&times;</span>
                        </a>
                    </div>

                    <!-- modal form content -->
                    <div class="modal-body">
                        <p class="protocol-number">NOVO CHAMADO</p>

                        <form class="modal-form">
                            <div class="form-group">
                                <label class="label-form" for="customerName">Nome do
                                    Cliente</label> <input type="text" class="form-control"
                                                           id="customerName" placeholder="Digite ...">
                            </div>
                            <div class="form-group">
                                <label class="label-form" for="subject">Assunto /
                                    Motivo</label> <input type="text" class="form-control" id="subject"
                                                          placeholder="Digite ...">
                            </div>

                            <p class="list-interacions-title">Últimas Interações</p>

                            <div class="list-interacions" id="interaction"></div>

                            <div class="form-group">
                                <label class="label-form" for="report">NOVA INTERAÇÃO <i>(descrição)</i></label>
                                <textarea class="form-control form-text-area" id="report"
                                          rows="7"></textarea>
                            </div>
                        </form>

                        <p class="success-save" id="success-alert">
                            <span class="badge badge-success"> </span>
                        </p>

                    </div>
                    <div class="modal-footer">
                        <div class="form-group select-status">
                            <select class="form-control status-form" id="status">
                                <option value="1">Em Atendimento</option>
                                <option value="2">Finalizado</option>
                            </select>
                        </div>

                        <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">CANCELAR
                        </button>
                        <button type="button" class="btn btn-primary" id="save-ticket">SALVAR</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal register user -->
        <div class="modal fade" id="modalUser" data-backdrop="static"
             tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel"
             aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="home-spinner" id="modalSpinnerUsers">
                        <div class="overlay"></div>

                        <div class="spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Usuários do
                            Sistema</h5>
                        <a type="button" class="close" data-dismiss="modal"
                           aria-label="Close"> <span aria-hidden="true">&times;</span>
                        </a>
                    </div>

                    <!-- modal form content -->
                    <div class="modal-body">
                        <p class="tip-user tip-user-new">* Preencha para adicionar um novo usuário ou clique em <b>"Editar"</b>!</p>
                        <form class="modal-form">
                            <div class="form-group">
                                <label class="label-form" for="userName">Nome Completo</label>
                                <input type="text" class="form-control" id="userName"
                                       placeholder="Digite ...">
                            </div>
                            <div class="form-group">
                                <label class="label-form" for="userEmail">E-mail</label> <input
                                    type="email" class="form-control" id="userEmail"
                                    placeholder="Digite ...">
                            </div>
                            <div class="form-group pass-user">
                                <label class="label-form" for="userPass">Definir Senha</label>
                                <input type="password" class="form-control" id="userPass"
                                       placeholder="Digite ..."> <a class="btn-eye"
                                                                    id="show-hide-pass"> <i data-feather="eye"
                                                                                            width="35"
                                                                                            color="#A358BC"
                                                                                            id="eye-show"></i> <i
                                    data-feather="eye-off"
                                    width="35" color="#A358BC" id="eye-hide"></i>
                            </a>
                            </div>
                        </form>

                        <div class="list-users">
                            <table class="table table-list">
                                <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Editar</th>
                                </tr>
                                </thead>
                                <tbody id="list-items-users"></tbody>
                            </table>
                        </div>

                        <p class="success-save" id="success-alert">
                            <span class="badge badge-success"> </span>
                        </p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">CANCELAR
                        </button>
                        <button type="button" class="btn btn-outline-secondary"
                                id="new-user">NOVO
                        </button>
                        <button type="button" class="btn btn-primary" id="save-user">SALVAR</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- list -->
        <div class="ticket-list">

            <table class="table table-list">
                <thead>
                <tr>
                    <th scope="col">Protocolo</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Última Alteração</th>
                    <th scope="col">Status</th>
                    <th scope="col">Editar</th>
                </tr>
                </thead>
                <tbody id="list-items">
                </tbody>
            </table>

        </div>
    </section>

    <!-- footer -->
    <footer class="footer">
        <p>© 2020 - Suporte Digital Ltda.</p>
    </footer>
</main>

<script src="https://unpkg.com/feather-icons"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous">

</script>
<script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous">

</script>
<script src="./assets/js/jquery-dateformat.min.js"></script>
<script src="./assets/js/home-functions.js"></script>
<script src="./assets/js/home-script.js"></script>
</body>

</html>