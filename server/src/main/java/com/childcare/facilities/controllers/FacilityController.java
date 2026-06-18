package com.childcare.facilities.controllers;

import com.childcare.facilities.model.facilities.Facility;
import com.childcare.facilities.service.FacilityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityService.getAllFacilities();
    }

    @PostMapping("/ids")
    public List<Facility> getFacilitiesByIds(@RequestBody List<String> ids) {
        return facilityService.getFacilitiesByIds(ids);
    }

    @GetMapping("/type/{type}")
    public List<Facility> getFacilitiesByType(@PathVariable String type) {
        return facilityService.getFacilitiesByType(type);
    }

    @GetMapping("/{id}")
    public Optional<Facility> getFacilityById(@PathVariable String id) {
        return facilityService.getFacilityById(id);
    }

    @PostMapping
    public Facility createFacility(@RequestBody Facility facility) {
        return facilityService.saveFacility(facility);
    }

    @DeleteMapping("/{id}")
    public void deleteFacility(@PathVariable String id) {
        facilityService.deleteFacility(id);
    }

    @GetMapping("/types")
    public List<Map<String, Object>> getFacilitiesTypes() {
        return facilityService.getFacilitiesTypes();
    }
}
