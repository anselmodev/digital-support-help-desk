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
import org.json.simple.JSONObject;

@WebServlet(value = "/users-login")
public class LoginUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String formEmail = req.getParameter("email");
        String formPassword = req.getParameter("password");

        int resUserNumber = 0;
        String resEmail = null;
        String resPassword = null;
        String resName = null;

        JSONObject resultLogin = new JSONObject();


        try {

            ConnectionDb conn = new ConnectionDb();

            Statement stmt = null;
            ResultSet resultSet = null;

            DefinePass hasPass = new DefinePass();
            String hashPassworForm = hasPass.hashPassword(formPassword);

            String sql = "select userNumber, fullName, email, password from users where email = '" + formEmail
                    + "' and password = '" + hashPassworForm + "'";

            stmt = conn.dbConn().createStatement();
            resultSet = stmt.executeQuery(sql);

            while (resultSet.next()) {
                resUserNumber = resultSet.getInt("userNumber");
                resEmail = resultSet.getString("email");
                resPassword = resultSet.getString("password");

                resultLogin.put("8e3c824e1d6254b74a013799c1565538", resultSet.getInt("userNumber")); // 8e3c824e1d6254b74a013799c1565538
                resultLogin.put("a0fbf479272cd38c220fbf726678d8d6", resultSet.getString("fullName")); // a0fbf479272cd38c220fbf726678d8d6
                resultLogin.put("authSuccess", "authentication-success");
            }

            if (resEmail == null || resPassword == null) {

                resp.getWriter().print("authentication-error");

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(401);

                return;

            }

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setContentType("application/json");
            hsr.setCharacterEncoding("UTF-8");
            resp.getWriter().print(resultLogin);


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
