package com.vbs.entity;

import javax.persistence.*;
import javax.validation.constraints.Future;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.vbs.entity.Invoice.*;

@Entity
@Table(name = "invoices")
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select i from Invoice i "),
        @NamedQuery(name = FIND_BY_INVOICENUM, query = "Select i from Invoice i where i.invoiceNumber = :invoiceNumber"),
//        @NamedQuery(name = FIND_BY_INVOICENUM, query = "Select i from Invoice i where i.invoiceNumber = :invoiceNumber"),
//        @NamedQuery(name= FIND_INVOICE_SERVICE , query = "select s from Service s where s.id = (select service_id from INVOICE_SERVICE i_s where i_s.invoice_id = :id)")
})
public class Invoice implements Serializable {

    public static final String FIND_ALL = "Invoice.finaAll";
    public static final String FIND_BY_ID = "find invoice by id";
    public static final String FIND_BY_INVOICENUM = "find invoice by invoiceNumber";

//    public static final String FIND_INVOICE_SERVICE = "find services in invoice";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "invoiceName")
    private String invoiceName;

    @Column(name = "invoiceNumber" )
    private String invoiceNumber;

    @Column(name = "price")
    private double price;

    @Column(name = "tax")
    private double tax;

    @Column(name = "discount")
    private double discount;

    @Column(name = "invoiceDate")
    private Date invoiceDate;

    @Future
    @Column(name = "dueDate")
    private Date dueDate;

    @Column(name = "totalDue")
    private double totalDue;

    @Column(name = "type")
    private InvoiceType type;

    @Column(name = "hasInstallments")
    private boolean hasInstallments;

    @Column(name = "invoiceStatus")
    private InvoiceStatus invoiceStatus;

    @OneToOne
    private Payment payment;

    @ManyToOne
//    @JoinTable(
//            name = "INVOICE_CLIENT",
//            joinColumns = @JoinColumn(name = "invoice_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "client_id", referencedColumnName = "id")
//    )
    private Client client = new Client();

    @ManyToMany
//    @JoinTable(
//            name = "INVOICE_SERVICE",
//            joinColumns = @JoinColumn(name = "invoice_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
//    )
    private List<Service> services = new ArrayList<>();

    public Invoice() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceName() {
        return invoiceName;
    }

    public void setInvoiceName(String invoiceName) {
        this.invoiceName = invoiceName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getTax() {
        return tax;
    }

    public void setTax(double tax) {
        this.tax = tax;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public Date getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(Date invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
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

    public boolean isHasInstallments() {
        return hasInstallments;
    }

    public void setHasInstallments(boolean hasInstallments) {
        this.hasInstallments = hasInstallments;
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
                ", invoiceName='" + invoiceName + '\'' +
                ", invoiceNumber='" + invoiceNumber + '\'' +
                ", price=" + price +
                ", tax=" + tax +
                ", discount=" + discount +
                ", invoiceDate=" + invoiceDate +
                ", dueDate=" + dueDate +
                ", totalDue=" + totalDue +
                ", type=" + type +
                ", hasInstallments=" + hasInstallments +
                ", payment=" + payment +
                ", client=" + client +
                ", services=" + services +
                '}';
    }
}

