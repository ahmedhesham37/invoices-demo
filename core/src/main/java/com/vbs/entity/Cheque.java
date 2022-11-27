package com.vbs.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "CHEQUE")
public class Cheque {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "chequeNumber")
    private String chequeNumber;

    @Column(name = "dueDate")
    private Date dueDate;

    @ManyToOne
    private Payment payment;
}
