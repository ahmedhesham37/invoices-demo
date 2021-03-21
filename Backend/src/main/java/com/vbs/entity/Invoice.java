package com.vbs.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.vbs.entity.Invoice.FIND_ALL;
import static com.vbs.entity.Invoice.FIND_BY_INVOICENUM;

@Entity
@Table(name = "invoices")
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select i from Invoice i "),
        @NamedQuery(name = FIND_BY_INVOICENUM, query = "Select i from Invoice i where i.invoiceNumber = :invoiceNumber"),
//        @NamedQuery(name = FIND_BY_PROJECTID, query = "Select i from Invoice i where i.project_id = :projectId"),
})
public class Invoice implements Serializable {

    public static final String FIND_ALL = "Invoice.finaAll";
    public static final String FIND_BY_ID = "find invoice by id";
    public static final String FIND_BY_INVOICENUM = "find invoice by invoiceNumber";
//    public static final String FIND_BY_PROJECTID = "find invoices by Project ";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "invoiceNumber" , unique = true)
    private String invoiceNumber;

    @Column(name = "price")
    private double price;

    @Column(name = "invoiceDate")
    private Date invoiceDate;

    @Column(name = "totalDue")
    private double totalDue;

    @Column(name = "type")
    private InvoiceType type;

    @OneToOne
    private Payment payment;

    @ManyToOne
    private Project project;

    @ManyToOne
    private Client client = new Client();

    @ManyToMany
    @JoinTable(
            name = "INVOICE_SERVICE",
            joinColumns = @JoinColumn(name = "invoice_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
    )
    private List<Service> services = new ArrayList<>();

    public Invoice() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
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

    public String getInvoiceNubmer() {
        return invoiceNumber;
    }

    public void setInvoiceNubmer(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }


    public List<Service> getServices() {
        return services;
    }


    public void setServices(List<Service> services) {
        this.services = services;
    }


    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public InvoiceType getType() {
        return type;
    }

    public void setType(InvoiceType type) {
        this.type = type;
    }


    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    @Override
    public String toString() {
        return "Invoice{" +
                "id=" + id +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", price=" + price +
                ", invoiceDate=" + invoiceDate +
                ", totalDue=" + totalDue +
                ", type=" + type +
                ", payment=" + payment +
                ", client=" + client +
                ", services=" + services +
                '}';
    }

    // To AutoGenerate the invoice Number (instead of generation type Auto)
    @PrePersist
    private void createInvoiceNumber(){

    }
}

