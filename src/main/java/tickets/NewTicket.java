package tickets;

import java.io.IOException;
import java.sql.PreparedStatement;
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

@WebServlet(value = "/ticket-new")
public class NewTicket extends HttpServlet {

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

            String ticketNumber = req.getParameter("ticketNumber");
            String ticketCustomerName = req.getParameter("ticketCustomerName");
            String ticketSubject = req.getParameter("ticketSubject");
            String ticketStatus = req.getParameter("ticketStatus");
            String ticketDescription = req.getParameter("ticketDescription");
            String ticketDate = req.getParameter("ticketDate");

            ConnectionDb conn = new ConnectionDb();

            PreparedStatement stmt = null;
            int resultSet = 0;


            String sql = "insert into tickets ( ticketNumber, customerName, status, subjectSupport, createdAt ) ";
            sql += " values ( '" + Integer.parseInt(ticketNumber) + "', '" + ticketCustomerName + "', '" + ticketStatus + "', ";
            sql += "'" + ticketSubject + "', '" + ticketDate + "' )";
            stmt = conn.dbConn().prepareStatement(sql);

            resultSet = stmt.executeUpdate();

            // NO RESULTS INSERT -----------------------------------------------
            if (resultSet == 0) {

                resp.getWriter().print("ticket-is-not-saved");

                return;
            }

            // pega ID do novo ticket
            int getID = 0;
            String sqlGet = "select id from tickets where ticketNumber = '"+Integer.parseInt(ticketNumber)+"'";

            Statement stmtGet = conn.dbConn().createStatement();
            ResultSet resultSetGet = stmtGet.executeQuery(sqlGet);

            while (resultSetGet.next()) {
                getID = resultSetGet.getInt("id");
            }

            if(getID != 0) {

                // insere a descrição do ticket
                sql = "insert into reports ( ticketID, description, interactionDate ) ";
                sql += " values ( '" + getID + "', '" + ticketDescription + "', '" + ticketDate + "' ) ";
                stmt = conn.dbConn().prepareStatement(sql);

                resultSet = stmt.executeUpdate();

                // NO RESULTS INSERT -----------------------------------------------
                if (resultSet == 0) {

                    resp.getWriter().print("ticket-is-not-saved");

                    return;
                }

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
