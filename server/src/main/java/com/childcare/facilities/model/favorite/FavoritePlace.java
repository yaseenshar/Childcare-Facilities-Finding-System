package com.childcare.facilities.model.favorite;

import lombok.Data;
import nonapi.io.github.classgraph.json.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("favorite_places")
@Data
public class FavoritePlace {

    @Id
    private String id;

    private String userId;
    private String placeId;
    private String categoryId;
}
