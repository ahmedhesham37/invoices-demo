import { Invoice } from 'app/main/invoice/invoice.model';
import { Service } from '../service/service.model';
import { Client } from '../invoice/client.model';

export class Project {
    id : number;
    projectName: string;
    projectNumber : string;
    invoices : Invoice[];
    services : Service[];
    client : Client;
    totalDue: number;
    remainingPayment : number;
    status: string;

    constructor(project) {
        project = project || {};
        this.id = project.id;
        this.projectName = project.projectName;
        this.projectNumber = project.projectNumber;
        this.invoices = project.invoices;
        this.services = project.services;
        this.client = project.client;
        this.remainingPayment = project.remainingPayment;
        this.totalDue = project.totalDue;
        this.status = project.status;
    }
}