package com.vbs.control;

import com.vbs.entity.Invoice;
import com.vbs.entity.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Stateless
public class ServicesRepository {
    private static final Logger logger = LoggerFactory.getLogger(ServicesRepository.class);

    @PersistenceContext
    EntityManager entityManager;

    public boolean createService(Service service) {
        entityManager.persist(service);
        return true;
    }

    public boolean updateService(Service service) {
        entityManager.merge(service);
        return true;
    }

    public boolean deleteService(Service service) {
            entityManager.remove(service);
            return true;
        }

    public List<Service> retrieveServices() {
        return entityManager.createNamedQuery(Service.FIND_ALL, Service.class).getResultList();
    }

    public Service findById(Long Id) {
        logger.info("Services: retrieving service by id {}", Id);
        try {
            Query query = entityManager.createNamedQuery(Service.FIND_BY_ID, Service.class);
            query.setParameter("id", String.valueOf(Id));
            Service result = (Service) query.getSingleResult();
            entityManager.merge(result);
            return result;
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<Invoice> findInvoicesByServiceId(Long serviceId) {
        // Find Invoices by services id
        List<Invoice> invoices = new ArrayList<>();
        Query query = entityManager.createQuery("select i from Invoice i join i.services i_s where i_s.id = :id", Invoice.class);
        query.setParameter("id", serviceId);
        invoices = (List<Invoice>) query.getResultList();
        logger.info(invoices.toString());
        return invoices;
    }


}
