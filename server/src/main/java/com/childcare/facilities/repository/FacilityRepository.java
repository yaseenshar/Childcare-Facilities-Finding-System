package com.childcare.facilities.repository;

import com.childcare.facilities.model.facilities.Facility;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends MongoRepository<Facility, String> {
    List<Facility> findByType(String type);

    List<Facility> findByIdIn(List<String> ids);
}
