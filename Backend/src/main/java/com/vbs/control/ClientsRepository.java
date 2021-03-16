package com.vbs.control;

import com.vbs.entity.Client;
import com.vbs.entity.Invoice;
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
public class ClientsRepository {
    private static final Logger logger = LoggerFactory.getLogger(ClientsRepository.class);

    @PersistenceContext
    EntityManager entityManager;

    public List<Client> retrieveClients() {
        List<Client> clients = entityManager.createNamedQuery(Client.FIND_ALL, Client.class).getResultList();
        logger.info(clients.toString());
        return clients;
    }

    public Client findById(Long Id) {
        logger.info("CLients: retrieving client by id {}", Id);
        logger.info(Id.getClass().toString());
        try {
            Query query = entityManager.createNamedQuery(Client.FIND_BY_ID, Client.class);
            query.setParameter("id", Id);
            Client result = (Client) query.getSingleResult();
            entityManager.merge(result);
            return result;
        } catch (NoResultException e) {
            return null;
        }
    }

    public boolean createClient(Client client) {
        entityManager.persist(client);
        return true;
    }

    public boolean updateClient(Client client) {
        logger.info("Updating Client :  ClientID : ", client.getId());
        entityManager.merge(client);
        logger.info("New Service Object >> " , client.toString());
        return true;
    }

    public boolean deleteClient(Client client) {
        entityManager.remove(entityManager.contains(client) ? client : entityManager.merge(client));
        return true;
    }

    public List<Invoice> findInvoicesByClientId(Long clientId) {
        // Find Invoices by clients id
        List<Invoice> invoices = new ArrayList<>();
        Query query = entityManager.createQuery("select i from Invoice i join i.clients i_c where i_c.id = :id", Invoice.class);
        query.setParameter("id", clientId);
        invoices = (List<Invoice>) query.getResultList();
        logger.info(invoices.toString());
        return invoices;
    }

    public Client findByCompanyName(String companyName) {
        logger.info("CLients: retrieving client by companyName {} " + companyName);
                try {
                    Query query = entityManager.createNamedQuery(Client.FIND_BY_COMPANY, Client.class);
                    query.setParameter("companyName", companyName);
                    Client result = (Client) query.getSingleResult();
                    entityManager.merge(result);
                    return result;
                } catch (NoResultException e) {
                    return null;
                }
    }
}
