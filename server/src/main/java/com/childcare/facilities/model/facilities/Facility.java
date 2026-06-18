package com.childcare.facilities.model.facilities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "facilities")
public class Facility {
    @Id
    private String id;
    @JsonIgnore
    private String type;
    private String name;
    @JsonIgnore
    private Crs crs;
    private List<Feature> features;
}
