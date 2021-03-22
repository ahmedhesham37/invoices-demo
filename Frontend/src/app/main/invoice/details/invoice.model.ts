import { Service } from "app/main/service/details/service.model";
import { Client } from "./client.model";

export class Invoice {
    id: number;
    description: string;
    invoiceNumber: string;
    price: number;
    invoiceDate: Date;
    totalDue: number;
    client: Client;
    services: Service[];
    payment: Payment[];

    constructor(invoice) {
        invoice = invoice || {};
        this.id = invoice.id;
        this.description = invoice.description;
        this.invoiceNumber = invoice.invoiceNumber;
        this.price = invoice.price;
        // this.invoiceDate = invoice.invoiceDate == null ? '' : invoice.invoiceDate.replace("[UTC]" , "");
        this.invoiceDate = new Date(invoice.invoiceDate);
        this.totalDue = invoice.totalDue;
        this.client = invoice.client;
        this.services = invoice.services;
        this.payment = invoice.payment;
    }
}

class Payment {
    id;
    transactionId;
    paymentMethod;
    chequeNumber;
    amount;
}
