package com.vbs.boundry.RestfulResources;

import com.vbs.control.ClientsRepository;
import com.vbs.entity.Client;
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
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClientsResource {

    private static final Logger logger = LoggerFactory.getLogger(ClientsResource.class);

    @Inject
    ClientsRepository clientsRepository;

    @GET
    public List<Client> retrieveClients() {
        return clientsRepository.retrieveClients();
    }

    @POST
    public Response createClient(Client client) {
        return clientsRepository.createClient(client) ? Response.ok(true).build() :
                Response.ok(false).build();
    }

    @Path("{id}")
    @GET
    public Response findClientById(@PathParam("id") Long id) {
        try {
            Client client = clientsRepository.findById(id);
            return Response.ok(client).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }
}
