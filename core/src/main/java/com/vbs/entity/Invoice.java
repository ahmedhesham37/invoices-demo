package com.vbs.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static com.vbs.entity.Invoice.FIND_ALL;
import static com.vbs.entity.Invoice.FIND_BY_INVOICENUM;

@Entity
@Table(name = "INVOICE")
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select i from Invoice i "),
        @NamedQuery(name = FIND_BY_INVOICENUM, query = "Select i from Invoice i where i.invoiceNumber = :invoiceNumber"),
})
public class Invoice implements Serializable {

    public static final String FIND_ALL = "Invoice.finaAll";
    public static final String FIND_BY_ID = "find invoice by id";
    public static final String FIND_BY_INVOICENUM = "find invoice by invoiceNumber";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "invoiceNumber" , unique = true)
    private String invoiceNumber;

    @Column(name = "description")
    private String description;

    @Column(name = "invoiceDate")
    private Date invoiceDate;

    @Column(name = "totalDue")
    private double totalDue;

    @OneToOne
    private Payment payment;

    @ManyToOne
    private Client client = new Client();

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(
            name = "INVOICE_SERVICE",
            joinColumns = @JoinColumn(name = "invoice_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
    )
    private List<Service> services = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="project_id", nullable=false)
    @JsonBackReference
    private Project project;

    public Invoice() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public double getTotalDue() {
        return totalDue;
    }

    public void setTotalDue(double totalDue) {
        this.totalDue = totalDue;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Service> getServices() {
        return services;
    }

    public void setServices(List<Service> services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "id=" + id +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", description='" + description + '\'' +
                ", invoiceDate=" + invoiceDate +
                ", totalDue=" + totalDue +
                ", payment=" + payment +
                ", client=" + client +
                ", services=" + services +
                '}';
    }

    @PrePersist
    private void addInvoiceNumber(){
        // There needs to be a check that this id is unique
        String lUUID = String.format("%040d", new BigInteger(UUID.randomUUID().toString().replace("-", ""), 16)).substring(0,8);
        this.setInvoiceNumber(String.valueOf(lUUID));
    }
}

