import { Client } from "./Client";

export class Invoice {
    Id: String;
    InvoiceNumber: String;
    Price: Number;
    Tax: Number;
    Discount: Number;
    InvoiceDate: Date;
    DueDate: Date;
    TotalDue: Number;
    Clients: [Client];
    Services: [Service];
}
