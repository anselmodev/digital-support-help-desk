package users;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.ConnectionDb;
import security.DefinePass;
import security.CookieSystem;

@WebServlet(value = "/users-login")
public class LoginUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String formEmail = req.getParameter("email");
        String formPassword = req.getParameter("password");

        int resUserNumber = 0;
        String resEmail = null;
        String resPassword = null;


        try {

            ConnectionDb conn = new ConnectionDb();

            Statement stmt = null;
            ResultSet resultSet = null;

            DefinePass hasPass = new DefinePass();
            String hashPassworForm = hasPass.hashPassword(formPassword);

            String sql = "select userNumber, email, password from users where email = '" + formEmail
                    + "' and password = '" + hashPassworForm + "'";

            stmt = conn.dbConn().createStatement();
            resultSet = stmt.executeQuery(sql);

            while (resultSet.next()) {
                resUserNumber = resultSet.getInt("userNumber");
                resEmail = resultSet.getString("email");
                resPassword = resultSet.getString("password");
            }

            if (resEmail == null || resPassword == null) {

                resp.getWriter().print("autenthication-error");

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(401);

                return;

            }

            resp.getWriter().print("autenthication-success");


            // Set Cookie on success ------------------------------------------
            CookieSystem ck = new CookieSystem();
            ck.setCookie(resp, "userNumber", Integer.toString(resUserNumber));


        } catch (Exception e) {
            System.out.println(e);

            resp.getWriter().print("server-error");

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            return;
        }

    }


}
