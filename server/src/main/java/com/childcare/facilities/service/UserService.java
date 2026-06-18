package com.childcare.facilities.service;

import com.childcare.facilities.dto.request.LoginRequest;
import com.childcare.facilities.dto.request.SignupRequest;
import com.childcare.facilities.dto.response.UserInfoResponse;
import com.childcare.facilities.mapper.ModelMapper;
import com.childcare.facilities.model.role.Role;
import com.childcare.facilities.model.user.User;
import com.childcare.facilities.model.role.RoleConstants;
import com.childcare.facilities.model.user.UserStatus;
import com.childcare.facilities.repository.RoleRepository;
import com.childcare.facilities.repository.UserRepository;
import com.childcare.facilities.security.jwt.JwtUtils;
import com.childcare.facilities.service.impl.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder encoder;

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    private final FavoritePlaceService favoritePlaceService;

    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, FavoritePlaceService favoritePlaceService, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.favoritePlaceService = favoritePlaceService;
        this.modelMapper = modelMapper;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public List<User> getUsersByStatus(int status) {
        return userRepository.findByStatus(status);
    }

    public UserInfoResponse updateUser(String id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setPassword(userDetails.getPassword());
            user.setStatus(userDetails.getStatus());

            if (userDetails.getAddresses() != null)
                user.setAddresses(userDetails.getAddresses());

            if (userDetails.getFavoritePlaceIds() != null)
                user.setFavoritePlaceIds(userDetails.getFavoritePlaceIds());

            if (userDetails.getRoles() != null && !userDetails.getRoles().isEmpty())
                user.setRoles(userDetails.getRoles());

            user = userRepository.save(user);

            final var favoritePlaces = favoritePlaceService.getFavoritePlacesByUserId(user.getId());

            return modelMapper.mapToUserInfoObject(user, favoritePlaces);
        } else {
            throw new RuntimeException("Error: User is not available.");
        }
    }

    public void deleteUser(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            user.setStatus(UserStatus.INACTIVE);

            userRepository.save(user);

        }  else {
            throw new RuntimeException("Error: User is unavailable.");
        }
    }

    public String createUser(SignupRequest signUpRequest) {

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleConstants.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "POWER_USER":
                        Role adminRole = roleRepository.findByName(RoleConstants.POWER_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "GUEST":
                        Role modRole = roleRepository.findByName(RoleConstants.GUEST)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleConstants.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return "User registered successfully!";
    }


    public UserInfoResponse authenticateUser(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        if (userDetails.isEnabled()) {

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwtToken = jwtUtils.createToken(userDetails);

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            final var favoritePlaces = favoritePlaceService.getFavoritePlacesByUserId(userDetails.getId());

            return new UserInfoResponse(userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(), jwtToken,
                    roles, favoritePlaces);
        }  else {
           throw  new RuntimeException("Error: User is in active.");
        }
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


}
