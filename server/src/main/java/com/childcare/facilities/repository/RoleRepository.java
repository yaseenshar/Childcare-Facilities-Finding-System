package com.childcare.facilities.repository;

import com.childcare.facilities.model.role.Role;
import com.childcare.facilities.model.role.RoleConstants;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(RoleConstants name);
}
