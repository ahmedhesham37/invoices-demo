package com.vbs.entity;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

import static com.vbs.entity.Service.FIND_ALL;
import static com.vbs.entity.Service.FIND_BY_ID;


@Entity
@Table(name = "services")
@Access(AccessType.FIELD)
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select s from Service s "),
        @NamedQuery(name = FIND_BY_ID, query = "Select s from Service s where s.id = :id")
})
public class Service implements Serializable {

    public static final String FIND_ALL = "Service.finaAll";
    public static final String FIND_BY_ID = "find service by id";


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "serviceName")
    private String serviceName;

    @Column(name = "description")
    private String description;

    @Column(name = "currency")
    private String currency;

    @Column(name = "taxRate")
    private double taxRate;

    @Column(name = "price")
    private double price;

    @Column(name = "vat")
    private double vat;

//    @LazyCollection(LazyCollectionOption.FALSE)
//    @ManyToMany(mappedBy = "services", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    private List<Invoice> invoices = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany(mappedBy = "services", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Project> projects;

    public Service() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(double taxRate) {
        this.taxRate = taxRate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public double getVat() {
        return vat;
    }

    public void setVat(double vat) {
        this.vat = vat;
    }

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", description='" + description + '\'' +
                ", currency='" + currency + '\'' +
                ", taxRate=" + taxRate +
                ", price=" + price +
                ", vat=" + vat +
                '}';
    }
}
