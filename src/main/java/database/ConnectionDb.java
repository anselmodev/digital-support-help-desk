package database;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnectionDb {
    // Parametro de conexão
    private String  databaseName = "digitalsupport";
    private String	driver = "com.mysql.cj.jdbc.Driver";
    private String	url = "jdbc:mysql://127.0.0.1:8889/"+ databaseName +"?useTimezone=true&serverTimezone=UTC&useUnicode=true&characterEncoding=UTF-8";
    private String	user = "root";
    private String	password = "root";

    //	Metodo de conexão
    private Connection	conectar() {
        Connection con = null;

        try {
            Class.forName(driver);
            con = DriverManager.getConnection(url, user, password);
            return con;
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    };

    public Connection dbConn() {

        try {

            Connection con = conectar();

            return con;


        } catch (Exception e) {

            System.out.println(e);
            return null;
        }

    }
}
