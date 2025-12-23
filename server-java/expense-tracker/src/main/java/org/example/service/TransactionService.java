package org.example.service;

import org.example.model.Transaction;
import org.example.model.TransactionList;

public interface TransactionService {

    TransactionList getTransactions();

    Transaction getTransaction(int id);

    Transaction createTransaction(Transaction transaction);

    boolean updateTransaction(int id, Transaction transaction);

    boolean deleteTransaction(int id);
}

