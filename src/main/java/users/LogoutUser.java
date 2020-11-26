package users;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import security.CookieSystem;

@WebServlet(value = "/users-logout")
public class LogoutUser extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {

            // Set Cookie on success ------------------------------------------
            CookieSystem ck = new CookieSystem();
            String setLogout = ck.removeCookie(req, resp);

            if(setLogout.equals("logout-success")) {

                resp.getWriter().print("logout-success");

            } else {

                resp.getWriter().print("autenthication-error");

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(500);

            }


        } catch (Exception e) {
            System.out.println(e);
        }

    }


}
