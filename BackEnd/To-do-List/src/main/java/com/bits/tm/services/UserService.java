package com.bits.tm.services;

import com.bits.tm.Dtos.AuthDto;
import com.bits.tm.Dtos.UserDto;
import com.bits.tm.models.User;

public interface UserService {
    /** find user by id
     * @param userId
     * @return
     * */
    UserDto findUserById(Long userId);

    /**
     * Find user by email
     *
     * @param email
     * @return
     */
    UserDto findUserByEmail(String email);

    /** Find user by Login
     * @param user
     * @return User
     * */
    User findUserByLogin(AuthDto user);

    /** Save/Update User
     * @param user
     * @return
     * */
    User saveUser(User user);

    /** Save/Update User
     * @param email
     * @return
     * */
    User findByEmail(String email);
}
