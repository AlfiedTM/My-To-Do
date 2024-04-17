package com.bits.tm.managers;

import com.bits.tm.Dtos.AuthDto;
import com.bits.tm.Dtos.UserDto;
import com.bits.tm.mappers.UserMapper;
import com.bits.tm.models.User;
import com.bits.tm.respositories.UserRepository;
import com.bits.tm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserManager implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    /**
     * Find User by id
     *
     * @param userId
     * @return User
     */
    @Override
    public UserDto findUserById(Long userId) {
        return userRepository.findUserById(userId);
    }

    /**
     * Find user by email
     *
     * @param email
     * @return User
     */
    @Override
    public UserDto findUserByEmail(String email) {
        User user =  userRepository.findUserByEmail(email);
        return userMapper.mapToUserDto(user);
    }

    /** Find user by authenticated user
     * @param user
     * @return User
     * */
    @Override
    public User findUserByLogin(AuthDto user) {
        return userRepository.findUserByEmail(user.getEmail());
    }

    /** Persist a record of type user
     * @param user
     * @return User
     * */
    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

   }
