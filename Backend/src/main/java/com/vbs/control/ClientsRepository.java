package com.vbs.control;

import com.vbs.entity.Client;
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

    public boolean createClient(Client client) {
        entityManager.persist(client);
        return true;
    }

    public List<Client> retrieveClients() {
        return entityManager.createNamedQuery(Client.FIND_ALL, Client.class).getResultList();
    }

    public List<Client> retrieveClientsByIds(Long[] ids) {
        List<Client> clients = new ArrayList<>();
        for (int i = 0; i < ids.length; i++) {
            clients.add(findById(ids[i]));
        }
        return clients;
    }

    public Client findById(Long Id) {
        logger.info("CLients: retrieving client by id {}", Id);
        try {
            Query query = entityManager.createNamedQuery(Client.FIND_BY_ID, Client.class);
            query.setParameter("id", String.valueOf(Id));
            Client result = (Client) query.getSingleResult();
            entityManager.merge(result);
            //             auditClient.audit("Database Query Succeeded",
            //                 "Method name findCompanyByComRegNumber - returned result for"
            //                     + " company using registration number "
            //                     + regNum);
            return result;
        } catch (NoResultException e) {
            //             auditClient.audit("Database Query Failed",
            //                 "Method name findCompanyByName - returned no result using "
            //                     + "registration number "
            //                     + regNum);
            return null;
        }
    }

}
