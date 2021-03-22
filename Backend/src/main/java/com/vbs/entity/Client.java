package com.vbs.entity;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.vbs.entity.Client.*;

@Entity
@Table(name = "clients")
@Access(AccessType.FIELD)
@NamedQueries({
        @NamedQuery(name = FIND_ALL, query = "select c from Client c "),
        @NamedQuery(name = FIND_BY_ID, query = "Select c from Client c where c.id = :id"),
        @NamedQuery(name = FIND_BY_COMPANY, query = "Select c from Client c where c.companyName = :companyName")
//        @NamedQuery(name= FIND_INVOICE_CLIENT, query = "select c from Client c INNER JOIN Invoice i on c.id = i.id"),
})
public class Client implements Serializable {

    public static final String FIND_ALL = "Client.finaAll";
    public static final String FIND_BY_ID = "find client by id";
    public static final String FIND_BY_COMPANY = "find client by companyName";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "companyName" , unique = true)
    private String companyName;

    @Column(name = "address")
    private String address;

    @Column(name = "website")
    private String website;

    @Column(name = "email")
    private String email;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    @Column(name = "secondPhoneNumber")
    private String secondPhoneNumber;

//    @LazyCollection(LazyCollectionOption.FALSE)
//    @OneToMany(mappedBy = "client" , cascade = CascadeType.ALL)
//    private List<Invoice> invoices = new ArrayList<>();

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "client" , cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();


    public Client() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getSecondPhoneNumber() {
        return secondPhoneNumber;
    }

    public void setSecondPhoneNumber(String secondPhoneNumber) {
        this.secondPhoneNumber = secondPhoneNumber;
    }


    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", companyName='" + companyName + '\'' +
                ", address='" + address + '\'' +
                ", website='" + website + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", secondPhoneNumber='" + secondPhoneNumber + '\'' +
                '}';
    }

}
