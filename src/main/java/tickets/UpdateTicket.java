package tickets;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import database.ConnectionDb;
import security.CookieSystem;

@WebServlet(value = "/ticket-update")
public class UpdateTicket extends HttpServlet {

    private String valueToStringOrEmpty(Map<String, ?> map, String key) {
        Object value = map.get(key);
        return value == null ? "" : value.toString();
    }

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

            String getTicketID = req.getParameter("ticketID");
            String ticketStatus = req.getParameter("ticketStatus");
            String description = req.getParameter("ticketDescription");
            String getDate = req.getParameter("ticketDate");

            ConnectionDb conn = new ConnectionDb();

            PreparedStatement stmt = null;
            int resultSet = 0;

            String sql = "update tickets set status = ? where id = ?";

            stmt = conn.dbConn().prepareStatement(sql);
            stmt.setInt(1, Integer.parseInt(ticketStatus));
            stmt.setInt(2, Integer.parseInt(getTicketID));
            resultSet = stmt.executeUpdate();

            // NO RESULTS UPDATE -----------------------------------------------
            if (resultSet == 0) {

                resp.getWriter().print("ticket-is-not-saved");

                return;
            }

            sql = "insert into reports ( ticketID, description, interactionDate ) ";
            sql += " values ( '"+Integer.parseInt(getTicketID)+"', '"+description+"', '"+getDate+"' )";
            stmt = conn.dbConn().prepareStatement(sql);

            resultSet = stmt.executeUpdate();

            // NO RESULTS INSERT -----------------------------------------------
            if (resultSet == 0) {

                resp.getWriter().print("ticket-is-not-saved");

                return;
            }

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setContentType("application/json");
            hsr.setCharacterEncoding("UTF8");

            resp.getWriter().print(resultSet);

        } catch (Exception e) {
            System.out.println(e);

            HttpServletResponse hsr = (HttpServletResponse) resp;
            hsr.setStatus(500);

            resp.getWriter().print("server-error");
        }

    }

}
