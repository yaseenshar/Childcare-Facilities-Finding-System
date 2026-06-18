package com.childcare.facilities.dto.response;

import com.childcare.facilities.model.favorite.FavoritePlace;
import com.childcare.facilities.model.user.Address;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String phoneNumber;
    private int status;
    private String token;
    private List<String> roles;
    private List<FavoritePlace> favoritePlaces;
    private List<Address> addresses;

    public UserInfoResponse(String id, String username, String email, String token, List<String> roles, List<FavoritePlace> favoritePlaces) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
        this.roles = roles;
        this.favoritePlaces = favoritePlaces;
    }
}
