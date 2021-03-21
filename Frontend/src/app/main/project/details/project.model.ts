import { Invoice } from 'app/main/invoice/details/invoice.model';
import { Service } from '../../service/details/service.model';
import { Client } from '../../invoice/details/client.model';

export class Project {
    id : number;
    projectName: string;
    projectNumber : string;
    invoices : Invoice[];
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
        this.client = project.client;
        this.remainingPayment = project.remainingPayment;
        this.totalDue = project.totalDue;
        this.status = project.status || 'Started';
    }
}