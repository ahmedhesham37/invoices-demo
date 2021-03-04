package com.vbs.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
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

    @Column(name = "serviceUnit")
    private String unit;

    @Column(name = "unitPrice")
    private double unitPrice;

    @Column(name = "currency")
    private String currency;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "totalPrice")
    private double totalPrice;

    @ManyToMany(mappedBy = "services", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Invoice> invoices = new ArrayList<>();

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

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    //    public List<Invoice> getInvoices() {
//        return invoices;
//    }
//
//    public void setInvoices(List<Invoice> invoices) {
//        this.invoices = invoices;
//    }

    @Override
    public String toString() {
        return "Service{" +
                "id=" + id +
                ", serviceName='" + serviceName + '\'' +
                ", description='" + description + '\'' +
                ", unit='" + unit + '\'' +
                ", unitPrice=" + unitPrice +
                ", currency='" + currency + '\'' +
                ", quantity=" + quantity +
                ", totalPrice=" + totalPrice +
                '}';
    }

//    @Override
//    public String toString() {
//        return "Service{" +
//                "id=" + id +
//                ", serviceName='" + serviceName + '\'' +
//                ", description='" + description + '\'' +
//                ", unit='" + unit + '\'' +
//                ", unitPrice=" + unitPrice +
//                ", quantity=" + quantity +
//                ", totalPrice=" + totalPrice +
//                ", invoices=" + invoices +
//                '}';
//    }
}
