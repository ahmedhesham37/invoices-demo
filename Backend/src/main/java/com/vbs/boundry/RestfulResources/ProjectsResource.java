package com.vbs.boundry.RestfulResources;

import com.vbs.control.ProjectsRepository;
import com.vbs.entity.Invoice;
import com.vbs.entity.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("projects")
@RequestScoped
public class ProjectsResource {


    private static final Logger logger = LoggerFactory.getLogger(ProjectsResource.class);

    @Inject
    ProjectsRepository projectsRepository;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Project> retrieveProjects() {
        return projectsRepository.retrieveProjects();
    }


    @GET
    @Path("{projectNumber}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findProjectByProjectNumber(@PathParam("projectNumber") String projectNumber) {
        try {
            Project project = projectsRepository.findByProjectNumber(projectNumber);
            return Response.ok(project).build();
        } catch (Exception e) {
            return Response.ok(false).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createProject(Project project) {
        return projectsRepository.createProject(project) ? Response.ok(project).build() :
                Response.ok(false).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProject(Project project) {
        return projectsRepository.updateProject(project) ? Response.ok(project).build() :
                Response.ok(false).build();
    }

    @POST
    @PathParam("{projectNumber}/add-invoice")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addInvoiceToProject(@PathParam("projectNumber") String projectNumber, Invoice invoice) {
        try {
            Project project = projectsRepository.addInvoiceToProject(invoice, projectNumber);
            return Response.ok(project).build();
        } catch (Exception e) {
            return Response.ok(e).build();
        }
    }

}
