package com.childcare.facilities.controllers;

import com.childcare.facilities.dto.response.UserInfoResponse;
import com.childcare.facilities.model.favorite.FavoritePlace;
import com.childcare.facilities.model.user.User;
import com.childcare.facilities.model.user.UserStatus;
import com.childcare.facilities.service.FavoritePlaceService;
import com.childcare.facilities.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final FavoritePlaceService favoritePlaceService;

    public UserController(UserService userService, FavoritePlaceService favoritePlaceService) {
        this.userService = userService;
        this.favoritePlaceService = favoritePlaceService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/status/active")
    public List<User> getActiveUsers() {
        return userService.getUsersByStatus(UserStatus.ACTIVE);
    }
    @GetMapping("/status/inactive")
    public List<User> getInActiveUsers() {
        return userService.getUsersByStatus(UserStatus.INACTIVE);
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserInfoResponse updateUser(@PathVariable String id, @RequestBody User userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @PostMapping("/{userId}/favorite-places")
    public UserInfoResponse addFavoritePlace(@PathVariable String userId, @RequestBody FavoritePlace favoritePlace) {
        Optional<User> optionalUser = userService.getUserById(userId);
        if (optionalUser.isPresent()) {

            favoritePlace = favoritePlaceService.addFavoritePlace(favoritePlace);

            User user = optionalUser.get();
            List<String> favoritePlaceIds = user.getFavoritePlaceIds();
            if (favoritePlaceIds == null) {
                favoritePlaceIds = new ArrayList<>();
            }
            favoritePlaceIds.add(favoritePlace.getId());
            user.setFavoritePlaceIds(favoritePlaceIds);
            return userService.updateUser(userId, user);
        } else {
            return null;
        }
    }


    @DeleteMapping("/{favoritePlaceId}/favorite-places")
    public ResponseEntity<?> removeFavoritePlace(@PathVariable String favoritePlaceId) {

        FavoritePlace favoritePlace = favoritePlaceService.getFavoritePlaceById(favoritePlaceId);

        Optional<User> optionalUser = userService.getUserById(favoritePlace.getUserId());
        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            List<String> favoritePlaceIds = user.getFavoritePlaceIds();
            favoritePlaceIds.remove(favoritePlaceId);
            user.setFavoritePlaceIds(favoritePlaceIds);

            favoritePlaceService.removeFavoritePlace(favoritePlaceId);

            return ResponseEntity.ok().body(userService.updateUser(user.getId(), user));
        } else {
            return null;
        }
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }
}
