package com.vbs.dto;

import com.vbs.entity.Client;
import com.vbs.entity.Invoice;
import com.vbs.entity.ProjectStatus;
import com.vbs.entity.Service;

import java.util.ArrayList;
import java.util.List;

public class ProjectDTO {

    private Long id;

    private String projectName;

    private String projectNumber;

    private ProjectStatus status;

    private List<Invoice> invoices = new ArrayList<>();

    private List<Service> services = new ArrayList<>();

    private Client client = new Client();

    private double remainingPayment;

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

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
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

    public double getTotalDue() {
        return totalDue;
    }

    public void setTotalDue(double totalDue) {
        this.totalDue = totalDue;
    }
}
