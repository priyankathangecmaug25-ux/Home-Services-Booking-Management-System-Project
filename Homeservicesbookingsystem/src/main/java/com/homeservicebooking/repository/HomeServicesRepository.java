package com.homeservicebooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homeservicebooking.entities.HomeServices;

public interface HomeServicesRepository  extends JpaRepository<HomeServices, Long> {
	//derived query - existsBy
	boolean existsByName(String homeservicesName);
	//boolean existsByService_name(String homeservicesservice_name);
	  List<HomeServices> findByCategory(String category);
	}


