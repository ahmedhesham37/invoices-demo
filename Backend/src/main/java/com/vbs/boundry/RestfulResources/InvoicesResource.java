package com.vbs.boundry.RestfulResources;

import com.vbs.control.InvoicesRepository;
import com.vbs.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("invoices")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InvoicesResource {


    private static final Logger logger = LoggerFactory.getLogger(InvoicesResource.class);

    @Inject
    InvoicesRepository invoicesRepository;

    @GET
    public List<Invoice> retrieveInvoices() {
        return invoicesRepository.retrieveInvoices();
    }

    @POST
    public Response createInvoice(Invoice invoice) {
        return invoicesRepository.createInvoice(invoice) ? Response.ok(true).build() : Response.ok(false).build();
    }

    @PUT
    public Response updateInvoice(Invoice invoice) {
        return invoicesRepository.updateInvoice(invoice) ? Response.ok(true).build() : Response.ok(false).build();
    }

    @GET
    @Path("{id}")
    public Response findInvoiceById(@PathParam("id") Long id) {
        try {
            invoicesRepository.findById(id);
            return Response.ok(true).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }

}
