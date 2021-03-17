import { Service } from "app/main/service/service.model";
import { Client } from "./client.model";

export class Invoice {
    id: number;
    active: any;
    description: string;

    invoiceNumber: string;
    price: number;
    tax: number;
    invoiceDate: string;
    totalDue: number;
    client: Client;
    services: Service[];

    type: string;
    hasInstallments: boolean;
    payment: Payment[];
    invoiceStatus: string;

    /**
     * Constructor
     *
     * @param invoice
     */
    constructor(invoice) {
        invoice = invoice || {};
        this.id = invoice.id;
        this.active = invoice.active;
        this.description = invoice.description;
        this.invoiceNumber = invoice.invoiceNumber;
        this.price = invoice.price;
        this.tax = invoice.tax;

        this.invoiceDate = invoice.invoiceDate;

        this.totalDue = invoice.totalDue;
    }
}

class Payment {
    id;
    transactionId;
    paymentMethod;
    chequeNumber;
    amount;
}
