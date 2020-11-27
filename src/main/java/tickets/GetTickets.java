package tickets;

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

@WebServlet(value = "/tickets-all")
public class GetTickets extends HttpServlet {

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

            if(checkLogin == null) {

                resp.getWriter().print("login-required");

                HttpServletResponse hsr = (HttpServletResponse) resp;
                hsr.setStatus(401);

                return;

            }

            ConnectionDb conn = new ConnectionDb();

            Statement stmt = null;
            ResultSet resultSet = null;

            String sql = "select * from tickets ORDER BY id DESC LIMIT 30";

            stmt = conn.dbConn().createStatement();
            resultSet = stmt.executeQuery(sql);

            int countPending = 0, countFinished = 0;

            JSONObject allTickets = new JSONObject();
            JSONObject resultTickets = new JSONObject();
            JSONArray arrayTickets = new JSONArray();


            while (resultSet.next()) {

                JSONObject ticketItem = new JSONObject();

                ticketItem.put("ticketID", resultSet.getInt("id"));
                ticketItem.put("ticketNumber", resultSet.getInt("ticketNumber"));
                ticketItem.put("ticketStatus", resultSet.getInt("status"));
                ticketItem.put("ticketCustomerName", resultSet.getString("customerName"));
                ticketItem.put("ticketUpdatedAt", resultSet.getString("updatedAt"));

                // Count ticket Status
                if(resultSet.getInt("status") == 1) {

                    countPending++;

                }

                if(resultSet.getInt("status") == 2) {

                    countFinished++;

                }

                // add to JSON array
                arrayTickets.add(ticketItem);
                allTickets.put("resultTickets",arrayTickets);

            }

            // NO RESULTS -----------------------------------------------
            if(allTickets.size() == 0) {

                resp.getWriter().print("tickets-not-found");

                return;
            }

            // WITH RESULTS ---------------------------------------------

            // add count to Array results
            resultTickets.put("pending", countPending);
            resultTickets.put("finished", countFinished);
            allTickets.put("resumeCount",resultTickets);


            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setContentType("application/json");
            hsr.setCharacterEncoding("UTF-8");

            resp.getWriter().print(allTickets);

        } catch (Exception e) {
            System.out.println(e);


            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            resp.getWriter().print("server-error");

            return;
        }

    }

}
