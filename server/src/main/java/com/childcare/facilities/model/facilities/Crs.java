package com.childcare.facilities.model.facilities;

import lombok.Data;

@Data
public class Crs {
    private String type;
    private Properties properties;

    @Data
    public static class Properties {
        private String name;
    }
}
