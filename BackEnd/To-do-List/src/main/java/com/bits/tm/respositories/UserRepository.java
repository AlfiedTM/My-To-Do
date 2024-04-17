package com.bits.tm.respositories;

import com.bits.tm.Dtos.UserDto;
import com.bits.tm.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    /** Find user by email
     * @param email
     * @return
     * */
    User findUserByEmail(String email);

    /** Find user by Id
     * @param userId
     * @return
     * */
    UserDto findUserById(Long userId);
}
