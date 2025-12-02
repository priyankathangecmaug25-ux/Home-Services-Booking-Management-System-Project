package com.homeservicebooking.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.homeservicebooking.dto.ApiResponse;
import com.homeservicebooking.entities.HomeServices;
import com.homeservicebooking.exceptions.ApiException;
import com.homeservicebooking.exceptions.ResourceNotFoundException;
import com.homeservicebooking.repository.HomeServicesRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor //OR @AllArgsConstructor
public class HomeServicesServiceImpl implements HomeServicesService {

    private final HomeServicesRepository homeservicesRepository;

    @Override
    public List<HomeServices> getAllHomeServices() {
        return homeservicesRepository.findAll();
    }

    @Override
    public ApiResponse addHomeServices(HomeServices homeservices) {
    	// validate if its dup restaurant name
    			if (!homeservicesRepository.existsByName(homeservices.getName())) {
    				//  - TRANSIENT (id=Long -> null)
    				homeservices.setStatus(true);// setting available status
    				// call dao's method - inherited API
    				HomeServices homeservices2 = homeservicesRepository.save(homeservices);
    				return new ApiResponse("New HomeServices added with ID="+homeservices2.getServiceId(), "Success");
    			}
    			// => dup restaurant name 
    			throw new ApiException("Dup Services  name!!!!!!!!!");
    		}
    @Override
    public HomeServices getDetailsById(Long homeservicesId) {
        return homeservicesRepository.findById(homeservicesId)
                   .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
    }

    @Override
    public String updateDetails(Long homeservicesId, HomeServices homeservices) {
        HomeServices details = getDetailsById(homeservicesId);
        details.setName(homeservices.getName());
		details.setDescription(homeservices.getDescription());
		details.setPrice(homeservices.getPrice());
		//details.setImage_url(homeservices.getImage_url()); 
		details.setCategory(homeservices.getCategory());
        return "Service updated successfully";
    }

    @Override
	public String deleteDetails(Long homeservicesId) {
		if (homeservicesRepository.existsById(homeservicesId)) {
			homeservicesRepository.deleteById(homeservicesId);
			return "Deleted Homeservices details....";
		}
		return "Invalid homeservices id - can't delelte details !!!!!!!!!!";
	}
    
    @Override
    public List<HomeServices> getByCategory(String cat) {
        return homeservicesRepository.findByCategory(cat);
    }

}