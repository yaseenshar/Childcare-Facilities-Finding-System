package com.childcare.facilities.service;

import com.childcare.facilities.model.favorite.FavoritePlace;
import com.childcare.facilities.model.user.User;
import com.childcare.facilities.model.user.UserStatus;
import com.childcare.facilities.repository.FavoritePlaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoritePlaceService {

    private final FavoritePlaceRepository favoritePlaceRepository;

    public FavoritePlaceService(FavoritePlaceRepository favoritePlaceRepository) {
        this.favoritePlaceRepository = favoritePlaceRepository;
    }

    public FavoritePlace getFavoritePlaceById(String favoritePlaceId) {

        Optional<FavoritePlace> optionalFavoritePlace = favoritePlaceRepository.findById(favoritePlaceId);
        if (optionalFavoritePlace.isPresent()) {

            FavoritePlace favoritePlace = optionalFavoritePlace.get();

            return favoritePlace;

        }  else {
            throw new RuntimeException("Error: FavoritePlace is unavailable.");
        }
    }

    public FavoritePlace addFavoritePlace(FavoritePlace favoritePlace) {
        return favoritePlaceRepository.save(favoritePlace);
    }

    public List<FavoritePlace> getFavoritePlacesByUserId(String userId) {
        return favoritePlaceRepository.findByUserId(userId);
    }

    public void removeFavoritePlace(String id) {
        favoritePlaceRepository.deleteById(id);
    }
}