package com.childcare.facilities.model.role;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("roles")
@Data
public class Role {

    @Id
    private String id;

    private RoleConstants name;


    public Role(RoleConstants name) {
        this.name = name;
    }

}
