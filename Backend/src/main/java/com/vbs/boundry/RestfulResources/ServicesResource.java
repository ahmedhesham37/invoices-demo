package com.vbs.boundry.RestfulResources;

import com.vbs.control.ServicesRepository;
import com.vbs.entity.Invoice;
import com.vbs.entity.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("services")
@RequestScoped
//@RolesAllowed({"CUSTOMER" , "customer"})
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServicesResource {

    private static final Logger logger = LoggerFactory.getLogger(ServicesResource.class);

    @Inject
    ServicesRepository servicesRepository;

    @Context
    HttpServletRequest request;



    @GET
    public List<Service> retrieveServices() {
//        logger.info("request auth header " + request.getHeader("Authorization"));
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
    @Path("{id}")
    public Response updateService(@PathParam("id") Long id, Service service ) {
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
