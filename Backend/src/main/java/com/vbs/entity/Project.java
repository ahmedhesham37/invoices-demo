package com.vbs.entity;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static com.vbs.entity.Project.FIND_ALL;
import static com.vbs.entity.Project.FIND_BY_PROJECTNUM;


@Entity
@Table(name = "project")
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select p from Project p "),
        @NamedQuery(name = FIND_BY_PROJECTNUM, query = "Select i from Project i where i.projectNumber = :projectNumber"),
})
public class Project {

    public static final String FIND_ALL = "Project.finaAll";
    public static final String FIND_BY_PROJECTNUM = "find project by projectNumber" ;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "projectNumber" , unique = true)
    private String projectNumber;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "project" , cascade = CascadeType.PERSIST)
    private List<Invoice> invoices = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "project" , cascade = CascadeType.PERSIST)
    private List<Service> services = new ArrayList<>();

    @ManyToOne
    private Client client;

    @Column(name = "remainingPayment")
    private double remainingPayment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectNumber() {
        return projectNumber;
    }

    public void setProjectNumber(String projectNumber) {
        this.projectNumber = projectNumber;
    }

    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public double getRemainingPayment() {
        return remainingPayment;
    }

    public void setRemainingPayment(double remainingPayment) {
        this.remainingPayment = remainingPayment;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectNumber='" + projectNumber + '\'' +
                ", invoices=" + invoices +
                ", services=" + services +
                ", client=" + client +
                ", remainingPayment=" + remainingPayment +
                '}';
    }

    public void addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
    }
}
