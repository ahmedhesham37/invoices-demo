package com.vbs.control;

import com.vbs.boundry.RestfulResources.InvoicesResource;
import com.vbs.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.io.Serializable;
import java.util.List;


@Stateless
public class InvoicesRepository implements Serializable {


    private static final Logger logger = LoggerFactory.getLogger(InvoicesResource.class);

    @PersistenceContext
    EntityManager entityManager;

    @Inject
    ServicesRepository servicesRepository;

    @Inject
    ClientsRepository clientsRepository;

    public boolean createInvoice(Invoice invoice) {
        entityManager.persist(invoice);
        return true;
    }

    public boolean updateInvoice(Invoice invoice) {
        entityManager.merge(invoice);
        return true;
    }


    public List<Invoice> retrieveInvoices() {
        List<Invoice> invoices = entityManager.createNamedQuery(Invoice.FIND_ALL, Invoice.class).getResultList();
        logger.info(invoices.toString());
        return invoices;
    }

    public Invoice findById(Long Id) {
        logger.info("Invoices: retrieving invoice by id {}", Id);
        try {
            Query query = entityManager.createNamedQuery(Invoice.FIND_BY_ID, Invoice.class);
            query.setParameter("id", String.valueOf(Id));
            Invoice invoice = (Invoice) query.getSingleResult();
            entityManager.merge(invoice);

            return invoice;
        } catch (NoResultException e) {
            return null;
        }
    }


}
