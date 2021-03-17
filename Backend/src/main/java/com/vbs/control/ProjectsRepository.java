package com.vbs.control;

import com.vbs.entity.Invoice;
import com.vbs.entity.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
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
    public Project addInvoiceToProject(Invoice invoice , String projectNumber) {
        Query query = entityManager.createNamedQuery(Project.FIND_BY_PROJECTNUM, Project.class);
        query.setParameter("projectNumber", String.valueOf(projectNumber));
        Project project = (Project) query.getSingleResult();
        project.addInvoice(invoice);
        entityManager.merge(project);
        logger.info(project.toString());
        return project;
    }


}
