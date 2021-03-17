import { MatChipInputEvent } from "@angular/material/chips";

import { FuseUtils } from "@fuse/utils";

export class Service {
    id: string;
    active: boolean;
    serviceName: string;
    description: string;
    price: number;
    taxRate: number;
    totalPrice: number;



    constructor(service) {
        service = service || {};
        this.id = service.id;
        this.active = service.active;
        this.serviceName = service.serviceName;
        this.description = service.description;
        this.price = service.price;
        this.taxRate = service.taxRate;
        this.totalPrice = service.price * (1 + (this.taxRate / 100));
    }
}
