package com.bits.tm.models;

import com.bits.tm.contants.Status;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "DESCRIPTION", nullable = false)
    private String description;

    @Column(name = "DUE_DATE")
    @DateTimeFormat(pattern = "dd/MM/YYYY")
    private Date dueDate;

    @Column(name = "START_DATE")
    @DateTimeFormat(pattern = "dd/MM/YYYY")
    private Date startDate;

    @Column(name = "STATUS", nullable = false)
    private String status = Status.NOT_STARTED.getStatus();


    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    @JsonIgnore
    private User user;
}
