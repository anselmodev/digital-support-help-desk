package users;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.ConnectionDb;
import security.CookieSystem;
import security.DefinePass;

@WebServlet(value = "/user-new")
public class NewUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {

            // Get Cookie is valid to check request
            CookieSystem ck = new CookieSystem();
            String checkLogin = ck.getCookie(req, "userNumber");

            if (checkLogin == null) {

                resp.getWriter().print("login-required");

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(401);

                return;

            }
            // Get Cookie is valid to check request

            ConnectionDb conn = new ConnectionDb();
            String sql = null;

            String userAdmin = req.getParameter("userAdmin");
            String userNumber = req.getParameter("userNumber");
            String userName = req.getParameter("userName");
            String userEmail = req.getParameter("userEmail");
            String userPass = req.getParameter("userPass");
            String typeAccess = req.getParameter("userTypeAccess");

            // Pega TYPEACCESS do usuário atual para verificar nível de acesso
            int getTypeAccess = 0;
            String sqlGetUser = "select typeAccess from users where userNumber = '" + Integer.parseInt(userAdmin) + "'";

            Statement stmtGet = conn.dbConn().createStatement();
            ResultSet resultSetGet = stmtGet.executeQuery(sqlGetUser);

            while (resultSetGet.next()) {
                getTypeAccess = resultSetGet.getInt("typeAccess");
            }

            if (getTypeAccess != 0) {

                PreparedStatement stmt = null;
                int resultSet = 0;

                // Hash Password
                DefinePass hasPass = new DefinePass();
                String hashPassworForm = hasPass.hashPassword(userPass);

                // insere a descrição do ticket
                sql = "insert into users ( userNumber, fullName, email, password, typeAccess ) ";
                sql += " values ( '" + userNumber + "', '" + userName + "', '" + userEmail + "', '" + hashPassworForm + "', '" + typeAccess + "' ) ";
                stmt = conn.dbConn().prepareStatement(sql);

                resultSet = stmt.executeUpdate();

                // NO RESULTS INSERT -----------------------------------------------
                if (resultSet == 0) {

                    resp.getWriter().print("user-is-not-saved");

                    return;
                }

                // pega ID do novo usuário
                int getIDUser = 0;
                String sqlGetNewUser = "select id from users where userNumber = '"+Integer.parseInt(userNumber)+"'";

                Statement stmtGetNewUser = conn.dbConn().createStatement();
                ResultSet resultSetGetNewUser = stmtGetNewUser.executeQuery(sqlGetNewUser);

                while (resultSetGetNewUser.next()) {
                    getIDUser = resultSetGetNewUser.getInt("id");
                }

                if(getIDUser != 0) {

                    HttpServletResponse hsr = (HttpServletResponse) resp;
                    hsr.setContentType("application/json");
                    hsr.setCharacterEncoding("UTF8");

                    resp.getWriter().print(getIDUser);

                }

            } else {

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(401);

                resp.getWriter().print("user-is-not-authorized");

            }

        } catch (Exception e) {
            System.out.println(e);

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            resp.getWriter().print("server-error");
        }

    }
}
