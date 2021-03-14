package com.vbs.boundry.RestfulResources;

import com.vbs.control.ClientsRepository;
import com.vbs.entity.Client;
import com.vbs.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("clients")
@RequestScoped
public class ClientsResource {

    private static final Logger logger = LoggerFactory.getLogger(ClientsResource.class);

    @Inject
    ClientsRepository clientsRepository;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Client> retrieveClients() {
        return clientsRepository.retrieveClients();
    }


    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findClientById(@PathParam("id") Long id) {
        try {
            Client client = clientsRepository.findById(id);
            return Response.ok(client).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createClient(Client client) {
        return clientsRepository.createClient(client) ? Response.ok(client).build() :
                Response.ok(false).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateClient(Client client) {
        return clientsRepository.updateClient(client) ? Response.ok(client).build() :
                Response.ok(false).build();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public Response deleteClient(Client client) {
        return clientsRepository.deleteClient(client) ? Response.ok(true).build() :
                Response.ok(false).build();
    }

    @GET
    @Path("{clientId}/invoices")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findInvoicesByClient(@PathParam("clientId") Long id) {
        try {
            List<Invoice> invoices = clientsRepository.findInvoicesByClientId(id);
            return Response.ok(invoices).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }
}

