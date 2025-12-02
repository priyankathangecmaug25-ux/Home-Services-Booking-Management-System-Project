package com.homeservicebooking.service;

import java.util.List;

import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.HomeServices;

public interface HomeServicesService {

    List<HomeServices> getAllHomeServices();

    ApiResponse addHomeServices(HomeServices homeservices);

    HomeServices getDetailsById(Long homeservicesId);

    String updateDetails(Long homeservicesId, HomeServices homeservices);

    String deleteDetails(Long homeservicesId);

	List<HomeServices> getByCategory(String cat);
}
