package JavaJDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DatabaseInitializer {
    public static void main(String[] args) {
        String createTablesSql = "CREATE TABLE IF NOT EXISTS Orders (\n"
                + " order_id integer PRIMARY KEY,\n"
                + " order_date text NOT NULL\n"
                + ");"
                + "CREATE TABLE IF NOT EXISTS Products (\n"
                + " product_id integer PRIMARY KEY,\n"
                + " product_name text NOT NULL,\n"
                + " product_description text,\n"
                + " product_price real NOT NULL\n"
                + ");"
                + "CREATE TABLE IF NOT EXISTS OrderDetails (\n"
                + " order_id integer,\n"
                + " product_id integer,\n"
                + " quantity integer NOT NULL,\n"
                + " FOREIGN KEY(order_id) REFERENCES Orders(order_id),\n"
                + " FOREIGN KEY(product_id) REFERENCES Products(product_id)\n"
                + ");";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(createTablesSql)) {
            pstmt.execute();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        for (int i = 1; i <= 5; i++) {
            String insertOrderSql = "INSERT INTO Orders(order_id, order_date) VALUES(?, CURRENT_DATE)";
            executeUpdate(insertOrderSql, i);

            String insertProductSql = "INSERT INTO Products(product_id, product_name, product_description, product_price) VALUES(?, 'Product" + i + "', 'Description" + i + "', " + (i * 10.0) + ")";
            executeUpdate(insertProductSql, i);

            String insertOrderDetailSql = "INSERT INTO OrderDetails(order_id, product_id, quantity) VALUES(?, ?, 5)";
            executeUpdate(insertOrderDetailSql, i, i);
        }
    }

    private static void executeUpdate(String sql, Object... parameters) {
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            for (int i = 0; i < parameters.length; i++) {
                pstmt.setObject(i + 1, parameters[i]);
            }

            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}