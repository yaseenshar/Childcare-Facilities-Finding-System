package com.childcare.facilities.mapper;

import com.childcare.facilities.dto.response.UserInfoResponse;
import com.childcare.facilities.model.favorite.FavoritePlace;
import com.childcare.facilities.model.user.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ModelMapper {

    public UserInfoResponse mapToUserInfoObject(User user, List<FavoritePlace> favoritePlaces) {


        final List<String> roleList = user.getRoles().stream()
                .map(role -> role.getName().name())
                .toList();

        return new UserInfoResponse(user.getId(), user.getFirstName(), user.getLastName(),
                user.getUsername(), user.getEmail(), user.getPhoneNumber(),
                user.getStatus(), "", roleList, favoritePlaces, user.getAddresses());
    }
}
