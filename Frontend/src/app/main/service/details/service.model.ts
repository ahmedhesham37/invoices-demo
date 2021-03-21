export class Service {
    id: string;
    active: boolean;
    serviceName: string;
    description: string;
    price: number;
    taxRate: number;

    constructor(service) {
        service = service || {};
        this.id = service.id;
        this.active = service.active;
        this.serviceName = service.serviceName;
        this.description = service.description;
        this.price = service.price;
        this.taxRate = service.taxRate;
    }
}
