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

    // TODO : Create a function to add invoice to the project
    public Project addInvoiceToProject(Invoice invoice, String projectNumber) {
        Query query = entityManager.createNamedQuery(Project.FIND_BY_PROJECTNUM, Project.class);
        query.setParameter("projectNumber", String.valueOf(projectNumber));
        Project project = (Project) query.getSingleResult();
        project.addInvoice(invoice);
        entityManager.merge(project);
        logger.info(project.toString());
        return project;
    }

//    private String getNewProjectNumber(Client client) {
//        String newProjectNumber = "";
//        List<Project> projects = new ArrayList<>();
//        if (client != null)
//            projects = findProjectsByClient(client.getId());
//
//        newProjectNumber = "P-" + client.getCompanyName().substring(0, 2).toUpperCase() + "-" + projects.size();
//
//        return newProjectNumber;
//    }
//
//    public List<Project> findProjectsByClient(Long clientId) {
//        logger.info("Project: retrieving projects by client {} ", clientId);
//        try {
//            Query query = entityManager.createNamedQuery(Project.FIND_BY_CLIENT_ID, Project.class);
//            query.setParameter("companyName", String.valueOf(clientId));
//            List<Project> projects = query.getResultList();
//            logger.info(projects.toString());
//            return projects;
//        } catch (NoResultException e) {
//            return null;
//        }
//    }
}
