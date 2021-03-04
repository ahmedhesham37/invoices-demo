export class Client {
    CompanyName: String;
    Address: String;
    website: String;
    Email: String;
    PhoneNumber: String;
    SecondPhoneNumber: String;

    constructor(ClientName: String, CompanyName: String, Address: String, website: String, Email: String, PhoneNumber: String, SecondPhoneNumber: String) {
        this.CompanyName = CompanyName;
        this.Address = Address;
        this.website = website;
        this.Email = Email;
        this.PhoneNumber = PhoneNumber;
        this.SecondPhoneNumber = SecondPhoneNumber;
    }


}