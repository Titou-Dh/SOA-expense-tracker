package org.example.service;

import org.example.db.ConnexionDB;
import org.example.model.Transaction;
import org.example.model.TransactionList;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TransactionServiceImpl implements TransactionService {

    Connection cn = ConnexionDB.getConnexion();
    Statement st = null;
    PreparedStatement pst = null;

    @Override
    public TransactionList getTransactions() {
        TransactionList transactionList = new TransactionList();
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions ORDER BY date DESC";
        try {
            st = cn.createStatement();
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Transaction transaction = new Transaction();
                transaction.setId(rs.getInt("id"));
                transaction.setDescription(rs.getString("description"));
                transaction.setAmount(rs.getDouble("amount"));
                transaction.setType(rs.getString("type"));
                transaction.setCategory(rs.getString("category"));
                transaction.setDate(rs.getTimestamp("date"));
                transaction.setNote(rs.getString("note"));
                transaction.setCreatedAt(rs.getTimestamp("created_at"));
                transaction.setUpdatedAt(rs.getTimestamp("updated_at"));
                transactions.add(transaction);
            }
            transactionList.setTransactions(transactions);
            return transactionList;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error getting transactions: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Transaction getTransaction(int id) {
        Transaction transaction = null;
        String sql = "SELECT * FROM transactions WHERE id = ?";
        try {
            pst = cn.prepareStatement(sql);
            pst.setInt(1, id);
            ResultSet rs = pst.executeQuery();
            if (rs.next()) {
                transaction = new Transaction();
                transaction.setId(rs.getInt("id"));
                transaction.setDescription(rs.getString("description"));
                transaction.setAmount(rs.getDouble("amount"));
                transaction.setType(rs.getString("type"));
                transaction.setCategory(rs.getString("category"));
                transaction.setDate(rs.getTimestamp("date"));
                transaction.setNote(rs.getString("note"));
                transaction.setCreatedAt(rs.getTimestamp("created_at"));
                transaction.setUpdatedAt(rs.getTimestamp("updated_at"));
            }
            return transaction;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error getting transaction: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Transaction createTransaction(Transaction transaction) {
        String sql = "INSERT INTO transactions (description, amount, type, category, date, note) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            pst = cn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            pst.setString(1, transaction.getDescription());
            pst.setDouble(2, transaction.getAmount());
            pst.setString(3, transaction.getType());
            pst.setString(4, transaction.getCategory());
            pst.setTimestamp(5, new Timestamp(transaction.getDate().getTime()));
            pst.setString(6, transaction.getNote());
            int result = pst.executeUpdate();
            
            if (result > 0) {
                ResultSet generatedKeys = pst.getGeneratedKeys();
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    return getTransaction(id);
                }
            }
            System.out.println("Transaction created successfully");
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error creating transaction: " + e.getMessage());
            return null;
        }
    }

    @Override
    public boolean updateTransaction(int id, Transaction transaction) {
        String sql = "UPDATE transactions SET description = ?, amount = ?, type = ?, category = ?, date = ?, note = ? WHERE id = ?";
        try {
            pst = cn.prepareStatement(sql);
            pst.setString(1, transaction.getDescription());
            pst.setDouble(2, transaction.getAmount());
            pst.setString(3, transaction.getType());
            pst.setString(4, transaction.getCategory());
            pst.setTimestamp(5, new Timestamp(transaction.getDate().getTime()));
            pst.setString(6, transaction.getNote());
            pst.setInt(7, id);
            int result = pst.executeUpdate();
            System.out.println("Transaction updated successfully");
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error updating transaction: " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteTransaction(int id) {
        String sql = "DELETE FROM transactions WHERE id = ?";
        try {
            pst = cn.prepareStatement(sql);
            pst.setInt(1, id);
            int result = pst.executeUpdate();
            System.out.println("Transaction deleted successfully");
            return result > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error deleting transaction: " + e.getMessage());
            return false;
        }
    }
}

