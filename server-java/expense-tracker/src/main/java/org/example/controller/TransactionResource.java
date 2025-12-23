package org.example.controller;

import org.example.model.Transaction;
import org.example.model.TransactionList;
import org.example.service.TransactionService;
import org.example.service.TransactionServiceImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/transactions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TransactionResource {

    private TransactionService transactionService = new TransactionServiceImpl();

    @GET
    public Response getTransactions() {
        try {
            TransactionList transactionList = transactionService.getTransactions();
            if (transactionList != null) {
                return Response.status(Response.Status.OK)
                        .entity(transactionList.getTransactions())
                        .build();
            } else {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("{\"error\": \"Failed to retrieve transactions\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getTransaction(@PathParam("id") int id) {
        try {
            Transaction transaction = transactionService.getTransaction(id);
            if (transaction != null) {
                return Response.status(Response.Status.OK)
                        .entity(transaction)
                        .build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\": \"Transaction not found\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @POST
    public Response createTransaction(Transaction transaction) {
        try {
            // Validation
            if (transaction.getDescription() == null || transaction.getDescription().trim().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Transaction description is required\"}")
                        .build();
            }
            if (transaction.getAmount() < 0) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Amount must be positive\"}")
                        .build();
            }
            if (transaction.getType() == null || (!transaction.getType().equals("income") && !transaction.getType().equals("expense"))) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Type must be 'income' or 'expense'\"}")
                        .build();
            }
            if (transaction.getCategory() == null || transaction.getCategory().trim().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Category is required\"}")
                        .build();
            }
            if (transaction.getDate() == null) {
                transaction.setDate(new java.util.Date());
            }

            Transaction created = transactionService.createTransaction(transaction);
            if (created != null) {
                return Response.status(Response.Status.CREATED)
                        .entity(created)
                        .build();
            } else {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("{\"error\": \"Failed to create transaction\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateTransaction(@PathParam("id") int id, Transaction transaction) {
        try {
            // Check if transaction exists
            Transaction existing = transactionService.getTransaction(id);
            if (existing == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\": \"Transaction not found\"}")
                        .build();
            }

            // Validation
            if (transaction.getDescription() == null || transaction.getDescription().trim().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Transaction description is required\"}")
                        .build();
            }
            if (transaction.getAmount() < 0) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Amount must be positive\"}")
                        .build();
            }
            if (transaction.getType() == null || (!transaction.getType().equals("income") && !transaction.getType().equals("expense"))) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Type must be 'income' or 'expense'\"}")
                        .build();
            }
            if (transaction.getCategory() == null || transaction.getCategory().trim().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Category is required\"}")
                        .build();
            }

            boolean success = transactionService.updateTransaction(id, transaction);
            if (success) {
                Transaction updated = transactionService.getTransaction(id);
                return Response.status(Response.Status.OK)
                        .entity(updated)
                        .build();
            } else {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("{\"error\": \"Failed to update transaction\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteTransaction(@PathParam("id") int id) {
        try {
            // Check if transaction exists
            Transaction existing = transactionService.getTransaction(id);
            if (existing == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("{\"error\": \"Transaction not found\"}")
                        .build();
            }

            boolean success = transactionService.deleteTransaction(id);
            if (success) {
                return Response.status(Response.Status.OK)
                        .entity("{\"message\": \"Transaction deleted successfully\"}")
                        .build();
            } else {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("{\"error\": \"Failed to delete transaction\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}

