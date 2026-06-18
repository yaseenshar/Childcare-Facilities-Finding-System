package com.childcare.facilities.service;

import com.childcare.facilities.model.facilities.Facility;
import com.childcare.facilities.repository.FacilityRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FacilityService {

    private final FacilityRepository facilityRepository;

    private final MongoTemplate mongoTemplate;

    public FacilityService(FacilityRepository facilityRepository, MongoTemplate mongoTemplate) {
        this.facilityRepository = facilityRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public List<Facility> getFacilitiesByType(String type) {
        return facilityRepository.findByType(type);
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public List<Facility> getFacilitiesByIds(List<String> ids) {
        return facilityRepository.findByIdIn(ids);
    }

    public Facility saveFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public void deleteFacility(String id) {
        facilityRepository.deleteById(id);
    }

    public List<Map<String, Object>> getFacilitiesTypes() {

        Query query = new Query();
        query.fields().include("id").include("name").include("features.properties");
        List<Facility> facilities = mongoTemplate.find(query, Facility.class);

        List<Map<String, Object>> list = facilities.stream().map(facility -> {
            Map<String, Object> facilityData = new HashMap<>();
            facilityData.put("id", facility.getId());
            facilityData.put("name", facility.getName());
            facilityData.put("count", facility.getFeatures().size());
            return facilityData;
        }).toList();

        return list;
    }
}
