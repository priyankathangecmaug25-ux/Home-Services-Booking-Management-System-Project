package com.homeservicebooking.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.util.List;

@Entity
@Table(name = "services")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class HomeServices extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Long serviceId;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    private long price;

    private boolean status;

//    // SERVICE (1) ---> (M) PAYMENTS
//    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
//    private List<Payment> payments;
}
