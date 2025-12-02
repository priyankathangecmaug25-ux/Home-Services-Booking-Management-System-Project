package com.homeservicebooking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homeservicebooking.entities.HomeServices;
import com.homeservicebooking.service.HomeServicesService;


//http://localhost:8080/services   (POSTMAN)
@RestController
@RequestMapping("/services")
@CrossOrigin(origins = "*")
//@CrossOrigin(origins = "http://localhost:5173")
public class HomeServicesController {
	private final HomeServicesService homeservicesService;
	
	  public HomeServicesController(HomeServicesService homeservicesService) {
	        this.homeservicesService = homeservicesService;
	    }

    // ---------------------- GET ALL SERVICES ----------------------
    @GetMapping
    public ResponseEntity<?> getAllHomeServices() {
        List<HomeServices> homeservices  = homeservicesService.getAllHomeServices();

        if (homeservices.isEmpty())
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        else
        return ResponseEntity.ok(homeservices);
    }

    // ---------------------- ADD NEW SERVICE -----------------------
    @PostMapping
    public ResponseEntity<?> addNewHomeService(@RequestBody HomeServices homeservices) {
    	System.out.println("in add " + homeservices);
    	try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(homeservicesService.addHomeServices(homeservices));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // ---------------------- GET BY ID -----------------------------
    @GetMapping("/{homeservicesId}")
    public HomeServices getHomeServicesDetailsById(@PathVariable("homeservicesId") Long homeserviceId) {
    	System.out.println("in get details " + homeserviceId);
    	return homeservicesService.getDetailsById(homeserviceId);
    }

    // ---------------------- UPDATE SERVICE ------------------------
    @PutMapping("/{homeservicesId}")
    public String updateHomeServicesDetails(@PathVariable("homeservicesId") Long homeserviceId,
                                       @RequestBody HomeServices homeservices) {
        return homeservicesService.updateDetails(homeserviceId, homeservices);
    }

    // ---------------------- DELETE SERVICE ------------------------
    @DeleteMapping("/{homeservicesId}")
    public String deleteHomeServicesDetails(@PathVariable("homeservicesId") Long homeserviceId) {
        return homeservicesService.deleteDetails(homeserviceId);
    }
    

    @GetMapping("/category/{cat}")
    public List<HomeServices> getByCategory(@PathVariable String cat) {
        return homeservicesService.getByCategory(cat);
    }

}