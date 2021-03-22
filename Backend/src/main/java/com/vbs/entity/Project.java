package com.vbs.entity;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static com.vbs.entity.Project.FIND_ALL;
import static com.vbs.entity.Project.FIND_BY_PROJECTNUM;


@Entity
@Table(name = "projects")
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select p from Project p "),
        @NamedQuery(name = FIND_BY_PROJECTNUM, query = "Select p from Project p where p.projectNumber = :projectNumber"),
//        @NamedQuery(name = FIND_BY_CLIENT_ID, query = "Select p from Project p where p.client_id = :clientId"),

})
public class Project {

    public static final String FIND_ALL = "Project.finaAll";
    public static final String FIND_BY_PROJECTNUM = "find project by projectNumber" ;
//    public static final String FIND_BY_CLIENT_ID = "find project by client id";


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "projectName" , unique = true)
    private String projectName;

    @Column(name = "projectNumber" , unique = true)
    private String projectNumber;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "project" , cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(
            name = "PROJECT_SERVICE",
            joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
    )
    private List<Service> services = new ArrayList<>();

    @ManyToOne
    private Client client = new Client();

    @Column(name = "remainingPayment")
    private double remainingPayment;

    @Column(name = "totalDue")
    private double totalDue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
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

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public double getTotalDue() {
        return totalDue;
    }

    public void setTotalDue(double totalDue) {
        this.totalDue = totalDue;
    }

    @Override
    public String toString() {
        return "Project{" +
                "id=" + id +
                ", projectName='" + projectName + '\'' +
                ", projectNumber='" + projectNumber + '\'' +
                ", status=" + status +
                ", invoices=" + invoices +
                ", services=" + services +
                ", client=" + client +
                ", remainingPayment=" + remainingPayment +
                ", totalDue=" + totalDue +
                '}';
    }

    public void addInvoice(Invoice invoice) {
        this.invoices.add(invoice);
    }
}
