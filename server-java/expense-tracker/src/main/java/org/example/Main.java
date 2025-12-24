package org.example;

import io.undertow.Undertow;
import org.jboss.resteasy.plugins.server.undertow.UndertowJaxrsServer;

public class Main {
    public static final String BASE_URI = "http://localhost:5000/";
    private static UndertowJaxrsServer server;

    public static UndertowJaxrsServer startServer() {
        server = new UndertowJaxrsServer();
        server.deploy(JaxRsApplication.class);
        
        server.start(Undertow.builder()
                .addHttpListener(5000, "localhost"));
        
        return server;
    }

    public static void main(String[] args) {
        try {
            startServer();
            System.out.println("JAX-RS application started with RESTEasy");
            System.out.println("REST API is running at: " + BASE_URI + "api/transactions");
            System.out.println("Hit enter to stop it...");
            
            // Keep server running
            System.in.read();
            server.stop();
        } catch (Exception e) {
            System.err.println("Error starting server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
