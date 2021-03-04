package com.vbs.boundry.RestfulResources;

import com.vbs.control.ServicesRepository;
import com.vbs.entity.Invoice;
import com.vbs.entity.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("services")
@RequestScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServicesResource {

    private static final Logger logger = LoggerFactory.getLogger(ServicesResource.class);

    @Inject
    ServicesRepository servicesRepository;


    @GET
    public List<Service> retrieveServices() {
        return servicesRepository.retrieveServices();
    }

    @GET
    @Path("{id}")
    public Response findServiceById(@PathParam("id") Long id) {
        try {
            Service service = servicesRepository.findById(id);
            return Response.ok(service).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }

    @POST
    public Response createService(Service service) {
        return servicesRepository.createService(service) ? Response.ok(service).build() : Response.ok(false).build();
    }

    @PUT
    public Response updateService(Service service) {
        return servicesRepository.updateService(service) ? Response.ok(service).build() : Response.ok(false).build();
    }

    @DELETE
    public Response deleteService(Service service) {
        return servicesRepository.deleteService(service) ? Response.ok(service).build() : Response.ok(false).build();
    }

    @GET
    @Path("{serviceId}/invoices")
    public Response findInvoicesByService(@PathParam("serviceId") Long id) {
        try {
            List<Invoice> invoices = servicesRepository.findInvoicesByServiceId(id);
            return Response.ok(invoices).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }
}
