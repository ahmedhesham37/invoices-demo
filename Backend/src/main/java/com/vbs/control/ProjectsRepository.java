package com.vbs.control;

import com.vbs.entity.Client;
import com.vbs.entity.Invoice;
import com.vbs.entity.Project;
import com.vbs.entity.ProjectStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Stateless
public class ProjectsRepository {


    private static final Logger logger = LoggerFactory.getLogger(ProjectsRepository.class);

    @PersistenceContext
    EntityManager entityManager;

    @Inject
    ClientsRepository clientsRepository;


    public Project findByProjectNumber(String projectNumber) {
        logger.info("Project: retrieving project by projectNumber {}", projectNumber);
        try {
            Query query = entityManager.createNamedQuery(Project.FIND_BY_PROJECTNUM, Project.class);
            query.setParameter("projectNumber", String.valueOf(projectNumber));
            Project project = (Project) query.getSingleResult();
            entityManager.merge(project);
            logger.info(project.toString());
            return project;
        } catch (NoResultException e) {
            return null;
        }
    }


    public List<Project> retrieveProjects() {
        List<Project> projects = entityManager.createNamedQuery(Project.FIND_ALL, Project.class).getResultList();
        logger.info(projects.toString());
        return projects;
    }

    public boolean createProject(Project project) {
        // Set Initial Values

        // 1- Create Project Number
        int projectNumber = 10001 + (retrieveProjects().size());
        project.setProjectNumber( String.valueOf(projectNumber));

        // 2- Set project state to STARTED
        project.setStatus(ProjectStatus.STARTED);

        // Create Client in case of new client is chosen
        Client client;
        logger.info(project.toString());
        if (clientsRepository.findById(project.getClient().getId()) == null){
            logger.info("Creating new Client Data");
            clientsRepository.createClient(project.getClient());
            client = clientsRepository.findByCompanyName(project.getClient().getCompanyName());
            logger.info("Client Created");
            project.setClient(client);
        }
        logger.info("Creating new Project " + project.toString());
        entityManager.persist(project);
        logger.info(project.toString());
        return true;
    }

    // Is this redundant ?
    public boolean updateProject(Project project) {
        entityManager.merge(project);
        return true;
    }

    public Project addInvoiceToProject(Invoice invoice, String projectNumber) {
        Query query = entityManager.createNamedQuery(Project.FIND_BY_PROJECTNUM, Project.class);
        query.setParameter("projectNumber", String.valueOf(projectNumber));
        Project project = (Project) query.getSingleResult();
        logger.info("Project Number >> " + project.getProjectNumber());
        invoice.setClient(project.getClient());
        invoice.setServices(project.getServices());
        project.addInvoice(invoice);
        logger.info("Project Number >> " + project.getRemainingPayment());
        logger.info("Project Number >> " + invoice.getTotalDue());
        project.setRemainingPayment(project.getRemainingPayment() - invoice.getTotalDue());
        entityManager.merge(project);
        logger.info(project.toString());
        return project;
    }

    public Project findProjectByInvoiceNumber(String invoiceNumber) {
        logger.info("Project: find project by invoiceNumber {}", invoiceNumber);
        try {
            Query query = entityManager.createNamedQuery(Project.FIND_BY_INVOICENUM, Project.class);
            query.setParameter("invoiceNumber", String.valueOf(invoiceNumber));
            Project project = (Project) query.getSingleResult();
            entityManager.merge(project);
            logger.info(project.toString());
            return project;
        } catch (NoResultException e) {
            return null;
        }
    }
}
