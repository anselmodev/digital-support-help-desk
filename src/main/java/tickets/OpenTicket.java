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

@WebServlet(value = "/ticket-open")
public class OpenTicket extends HttpServlet {

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

            String getTicketID = req.getParameter("ticketid");


            ConnectionDb conn = new ConnectionDb();

            Statement stmt = null;
            ResultSet resultSet = null;

            String sql = "SELECT id, ticketNumber, customerName, status, subjectSupport, updatedAt, R.description , R.interactionDate FROM tickets T LEFT JOIN reports R ON T.id = R.ticketID WHERE T.id = '" + getTicketID + "'";

            stmt = conn.dbConn().createStatement();
            resultSet = stmt.executeQuery(sql);

            JSONObject resultTicket = new JSONObject();
            JSONArray arrayReports = new JSONArray();

            while (resultSet.next()) {

                JSONObject resultReports = new JSONObject();

                resultTicket.put("ticketID", resultSet.getInt("id"));
                resultTicket.put("ticketNumber", resultSet.getInt("ticketNumber"));
                resultTicket.put("ticketStatus", resultSet.getInt("status"));
                resultTicket.put("ticketCustomerName", resultSet.getString("customerName"));
                resultTicket.put("ticketSubjectSupport", resultSet.getString("subjectSupport"));
                resultTicket.put("ticketUpdatedAt", resultSet.getString("updatedAt"));

                resultReports.put("description", resultSet.getString("description"));
                resultReports.put("interactionDate", resultSet.getString("interactionDate"));

                // add to JSON array
                arrayReports.add(resultReports);
                resultTicket.put("interactions",arrayReports);

            }

            // NO RESULTS -----------------------------------------------
            if(resultTicket.size() == 0) {

                resp.getWriter().print("reports-not-found");

                return;
            }

            // WITH RESULTS ---------------------------------------------

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setContentType("application/json");
            hsr.setCharacterEncoding("UTF-8");

            resp.getWriter().print(resultTicket);

        } catch (Exception e) {
            System.out.println(e);


            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            resp.getWriter().print("server-error");

            return;
        }

    }

}
