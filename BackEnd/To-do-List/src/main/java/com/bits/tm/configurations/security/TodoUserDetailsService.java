package com.bits.tm.configurations.security;

import com.bits.tm.managers.UserManager;
import com.bits.tm.models.User;
import com.bits.tm.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class TodoUserDetailsService implements UserDetailsService {
    @Autowired
    private UserManager userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userService.findByEmail(username);
        String userName, password = null;
        List<GrantedAuthority> authorities = null;
        if(null!=user){
            userName = user.getEmail();
            authorities = new ArrayList<>();
            password = user.getPassword();
            authorities.add(new SimpleGrantedAuthority("USER"));
        }else{
            throw new UsernameNotFoundException("Invalid user details");
        }
        return new org.springframework.security.core.userdetails.User(userName, password, authorities);
    }
}
