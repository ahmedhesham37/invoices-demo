package com.vbs.boundry.RestfulResources;

import com.vbs.control.InvoicesRepository;
import com.vbs.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("invoices")
@RequestScoped
@RolesAllowed({"CUSTOMER" , "customer"})
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InvoicesResource {


    private static final Logger logger = LoggerFactory.getLogger(InvoicesResource.class);

    @Inject
    InvoicesRepository invoicesRepository;

    @GET
    public Response retrieveInvoices() {
        try {
            List<Invoice> invoices = invoicesRepository.retrieveInvoices();
            return Response.ok(invoices).build();
        }catch (Exception e){
            return Response.ok(e).build();
        }
    }

    @GET
    @Path("{invoiceNumber}")
    public Response findInvoiceByInvoiceNumber(@PathParam("invoiceNumber") String invoiceNumber) {
        try {
            Invoice invoice = invoicesRepository.findByInvoiceNumber(invoiceNumber);
            return Response.ok(invoice).build();
        } catch (Exception e) {
            return Response.ok(e).build();
        }
    }

    @POST
    public Response createInvoice(Invoice invoice) {
        return invoicesRepository.createInvoice(invoice) ? Response.ok(invoice).build() : Response.ok(false).build();
    }

    // Invoice Cannot be updated
//    @PUT
//    public Response updateInvoice(Invoice invoice) {
//        return invoicesRepository.updateInvoice(invoice) ? Response.ok(true).build() : Response.ok(false).build();
//    }

    // Invoice Cannot be deleted ??
//    @DELETE
//    public Response deleteInvoice(Invoice invoice) {
//    }

}
