export class Client {
    companyName: string;
    address: string;
    website: string;
    email: string;
    phoneNumber: string;
    secondPhoneNumber: string;

    /** Constructor
     *
     * @param invoice
     */
    constructor(client) {
        client = client || {};
        this.companyName = client.companyName;
        this.address = client.address;
        this.website = client.website;
        this.email = client.email;
        this.phoneNumber = client.phoneNumber;
        this.secondPhoneNumber = client.secondPhoneNumber;
    }

}
