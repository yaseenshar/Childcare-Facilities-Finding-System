package com.childcare.facilities.repository;

import com.childcare.facilities.model.favorite.FavoritePlace;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritePlaceRepository extends MongoRepository<FavoritePlace, String> {

    List<FavoritePlace> findByUserId(String userId);
}
