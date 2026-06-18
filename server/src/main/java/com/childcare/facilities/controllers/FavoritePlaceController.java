package com.childcare.facilities.controllers;

import com.childcare.facilities.model.favorite.FavoritePlace;
import com.childcare.facilities.service.FavoritePlaceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/favorite-places")
public class FavoritePlaceController {

    private final FavoritePlaceService favoritePlaceService;

    public FavoritePlaceController(FavoritePlaceService favoritePlaceService) {
        this.favoritePlaceService = favoritePlaceService;
    }

    @PostMapping
    public FavoritePlace addFavoritePlace(@RequestBody FavoritePlace favoritePlace) {
        return favoritePlaceService.addFavoritePlace(favoritePlace);
    }

    @GetMapping("/user/{userId}")
    public List<FavoritePlace> getFavoritePlacesByUserId(@PathVariable String userId) {
        return favoritePlaceService.getFavoritePlacesByUserId(userId);
    }
}
