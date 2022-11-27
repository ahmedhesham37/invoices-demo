package com.vbs.control;

import com.vbs.boundry.RestfulResources.InvoicesResource;
import com.vbs.entity.Invoice;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
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

    public Invoice findByInvoiceNumber(String invoiceNumber) {
        logger.info("Invoices: retrieving invoice by invoiceNumber {}", invoiceNumber);
        try {
            Query query = entityManager.createNamedQuery(Invoice.FIND_BY_INVOICENUM, Invoice.class);
            query.setParameter("invoiceNumber", String.valueOf(invoiceNumber));
            Invoice invoice = (Invoice) query.getSingleResult();
            entityManager.merge(invoice);
            logger.info(invoice.toString());
            return invoice;
        } catch (NoResultException e) {
            return null;
        }
    }

    public List<Invoice> retrieveInvoices() {
        List<Invoice> invoices = entityManager.createNamedQuery(Invoice.FIND_ALL, Invoice.class).getResultList();
        logger.info(invoices.toString());
        return invoices;
    }

    public boolean createInvoice(Invoice invoice) {
        // Create Project Number
//        int invoiceNumber = 1001 + (retrieveInvoices().size());
//        invoice.setInvoiceNumber(String.valueOf(invoiceNumber));

        entityManager.persist(invoice);
        logger.info(invoice.toString());
        return true;
    }

    // Invoices will never be updated ??
//    public boolean updateInvoice(Invoice invoice) {
//        entityManager.merge(invoice);
//        return true;
//    }

//    private String getNewInvoiceNumber(Project project) {
//        String newInvoiceNumber = "";
//        List<Invoice> invoices = new ArrayList<>();
//        if (project != null)
//            invoices = findInvoicesByProject(project.getId());
//        newInvoiceNumber = "P-" + project.getClient().getCompanyName().substring(0,2).toUpperCase() + "-I" + "-" + invoices.size();
//
//        return newInvoiceNumber;
//    }

//    public List<Invoice> findInvoicesByProject(Long projectId) {
//        logger.info("Project: retrieving projects by client {} ", projectId);
//        try {
//            Query query = entityManager.createNamedQuery(Invoice.FIND_BY_PROJECTID, Invoice.class);
//            query.setParameter("companyName", String.valueOf(projectId));
//            List<Invoice> invoices = query.getResultList();
//            logger.info(invoices.toString());
//            return invoices;
//        } catch (NoResultException e) {
//            return null;
//        }
//    }

}
