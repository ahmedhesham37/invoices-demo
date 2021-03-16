import { MatChipInputEvent } from "@angular/material/chips";

import { FuseUtils } from "@fuse/utils";

export class Service {
    id: string;
    active: boolean;
    serviceName: string;
    description: string;
    unit: string;
    unitPrice: number;
    currency: string;
    quantity: number;
    totalPrice: number;



    constructor(service) {
        service = service || {};
        this.id = service.id;
        this.active = service.active;
        this.serviceName = service.serviceName;
        this.description = service.description;
        this.unit = service.unit;
        this.unitPrice = service.unitPrice;
        this.currency = service.currency;
        this.quantity = service.quantity;
        this.totalPrice = service.totalPrice;
    }
}
