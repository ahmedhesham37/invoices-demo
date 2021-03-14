import { InMemoryDbService } from "angular-in-memory-web-api";

import { ECommerceFakeDb } from "app/fake-db/e-commerce";
import { InvoiceFakeDb } from "app/fake-db/invoice";
import { IconsFakeDb } from "app/fake-db/icons";

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            // E-Commerce
            "e-commerce-products": ECommerceFakeDb.products,
            "e-commerce-orders": ECommerceFakeDb.orders,

            // Invoice
            invoice: InvoiceFakeDb.invoice,

            // Icons
            icons: IconsFakeDb.icons,
        };
    }
}
