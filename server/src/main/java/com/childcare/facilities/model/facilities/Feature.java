package com.childcare.facilities.model.facilities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class Feature {
    @JsonIgnore
    private String type;
    private Properties properties;
    private Geometry geometry;
}
