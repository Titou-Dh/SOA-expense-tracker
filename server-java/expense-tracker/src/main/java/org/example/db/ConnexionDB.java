package org.example.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnexionDB {

    String url = "jdbc:mysql://localhost:3306/expense_tracker";
    String login = "root";
    String password = "root";
    static Connection cn;

    private ConnexionDB() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            cn = DriverManager.getConnection(url, login, password);
            System.out.println("Database connection established successfully");
        } catch (Exception e) {
            System.out.println("Database connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static Connection getConnexion() {
        if (cn == null) {
            new ConnexionDB();
        }
        return cn;
    }
}

