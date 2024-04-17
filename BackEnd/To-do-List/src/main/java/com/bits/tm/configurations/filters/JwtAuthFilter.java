package com.bits.tm.configurations.filters;

import com.bits.tm.configurations.security.TodoUserDetailsService;
import com.bits.tm.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private TodoUserDetailsService todoUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String jwtToken;
        String userEmail;

//        If header is empty go to the next filter
        if(authHeader == null || authHeader.isBlank()){
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = authHeader.substring(7);
        try{

            userEmail = jwtUtils.extractUserName(jwtToken);

            if(userEmail !=null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails = todoUserDetailsService.loadUserByUsername(userEmail);

                if(jwtUtils.isTokenValid(jwtToken, userDetails)){
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities()
                    );
                    token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    context.setAuthentication(token);
                    SecurityContextHolder.setContext(context);
                }
            }
        }catch (Exception e){
            System.out.println("Token Exception: "+e.getMessage());
        }
        filterChain.doFilter(request, response);
    }
}
