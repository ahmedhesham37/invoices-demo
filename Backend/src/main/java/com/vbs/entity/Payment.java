package com.vbs.entity;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "transactionId")
    private Long transactionId;

    @Column(name = "paymentMethod")
    @Enumerated(EnumType.STRING)    // To show in the database strings instead of numbers
    private PaymentMethod paymentMethod;

    @OneToMany(mappedBy = "payment")
    private List<Cheque> chequeNumber;

    @Column(name = "amount")
    private double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public List<Cheque> getChequeNumber() {
        return chequeNumber;
    }

    public void setChequeNumber(List<Cheque> chequeNumber) {
        this.chequeNumber = chequeNumber;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "id=" + id +
                ", transactionId=" + transactionId +
                ", paymentMethod=" + paymentMethod +
                ", chequeNumber=" + chequeNumber +
                ", amount=" + amount +
                '}';
    }
}
