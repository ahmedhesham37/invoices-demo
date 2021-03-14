import {Client} from './client.model';
import {Service} from '../service/service.model';

export class Invoice {
    id: number;
    active: any;
    description: string;

    invoiceName: string;
    invoiceNumber: string;
    price: number;
    tax: number;
    discount: number;
    invoiceDate: string;
    dueDate: string;
    totalDue: number;
    client: Client;
    services: Service[];

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
        this.invoiceName = invoice.invoiceName;
        this.invoiceNumber = invoice.invoiceNumber;
        this.price = invoice.price;
        this.tax = invoice.tax;
        this.discount = invoice.discount;
        this.invoiceDate = invoice.invoiceDate;
        this.dueDate = invoice.dueDate;
        this.totalDue = invoice.totalDue;
    }
}
