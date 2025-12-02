package com.homeservicebooking.entities;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
 * Declares a common base class , w/o any table associated with it.
 * Add common fields here.
 */
@MappedSuperclass
@Getter
@Setter
@ToString
public abstract class BaseEntity {

	@CreationTimestamp // to specify creation date | time | TS
	@Column(name = "created_at")
	 private LocalDateTime createdAt;
	@UpdateTimestamp //to specify updation date | time | TS
	@Column(name="last_updated")
	private LocalDateTime updatedAt;

}
