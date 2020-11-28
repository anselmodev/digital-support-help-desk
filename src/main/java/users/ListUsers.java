package users;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.ConnectionDb;
import security.CookieSystem;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

@WebServlet(value = "/users-listall")
public class ListUsers extends HttpServlet {

    private String valueToStringOrEmpty(Map<String, ?> map, String key) {
        Object value = map.get(key);
        return value == null ? "" : value.toString();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

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

            ConnectionDb conn = new ConnectionDb();

            Statement stmt = null;
            ResultSet resultSet = null;

            String sql = "select id as userID, fullName as userName, email as userEmail, typeAccess as userTypeAccess from users ORDER BY id DESC LIMIT 30";

            stmt = conn.dbConn().createStatement();
            resultSet = stmt.executeQuery(sql);

            int countPending = 0, countFinished = 0;

            JSONObject allUsers = new JSONObject();
            JSONObject resultTickets = new JSONObject();
            JSONArray arrayUsers = new JSONArray();


            while (resultSet.next()) {

                JSONObject userItem = new JSONObject();

                userItem.put("userID", resultSet.getInt("userID"));
                userItem.put("userTypeAccess", resultSet.getInt("userTypeAccess"));
                userItem.put("userName", resultSet.getString("userName"));
                userItem.put("userEmail", resultSet.getString("userEmail"));

                // add to JSON array
                arrayUsers.add(userItem);
                allUsers.put("resultUsers", arrayUsers);

            }

            // NO RESULTS -----------------------------------------------
            if (allUsers.size() == 0) {

                resp.getWriter().print("tickets-not-found");

                return;
            }

            // WITH RESULTS ---------------------------------------------

            // add count to Array results
            resultTickets.put("pending", countPending);
            resultTickets.put("finished", countFinished);


            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setContentType("application/json");
            hsr.setCharacterEncoding("UTF-8");
            resp.getWriter().print(allUsers);

        } catch (Exception e) {
            System.out.println(e);


            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            resp.getWriter().print("server-error");

            return;
        }

    }

}
