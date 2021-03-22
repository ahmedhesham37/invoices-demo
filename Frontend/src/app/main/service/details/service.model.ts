export class Service {
    id: string;
    serviceName: string;
    description: string;
    price: number;
    taxRate: number;

    constructor(service) {
        service = service || {};
        this.id = service.id;
        this.serviceName = service.serviceName;
        this.description = service.description;
        this.price = service.price;
        this.taxRate = service.taxRate;
    }
}
