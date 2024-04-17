package com.bits.tm.utils;

import com.bits.tm.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;

@Component
public class JwtUtils {

    private SecretKey secretKey;

    private static final long EXPIRATION_TIME = 24*60*1000; //24 hours

    public JwtUtils (){
        String key = "3e247c813b6886388496758d116777015794e139a39bd7ebaa06d481a13e5613415db1a74e30b378b7f66b290fbb554e09cf0f7a10784b2936d4e57d4016eb2f7f7b2c499285a28286b70ad8dfdb8feeb2a9b0af0440e6af74ad5d7a496c831ff2e902de9e603b6766877b76e60da29a0cf682ccdd1d9f510f2a2ff4a8228c0173d34c2ae8d901e8959b8c8608ba763289888c1c0efcb50cd667b776818293555066761e03f335f7358f06774c7d2af2aac88e3d7bbc56dbc1dfa3f8c5743efa25d2a3608be24b72c57c2f51dbe0c717bd9fd07152614fc0ed65c10ffc3c785908af1b38433b419a6d39c6c73d7e3c0f75d8f141144a7d41d90cc7ca23265a98";
        byte[] keyBytes = Base64.getDecoder().decode(key.getBytes(StandardCharsets.UTF_8));
        this.secretKey = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateKey(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date (System.currentTimeMillis() +EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public String generateRefreshKey(HashMap<String, Object> claims, UserDetails userDetails){
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date (System.currentTimeMillis() +EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public String extractUserName(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload());
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())&&isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        try{
            return extractClaims(token, Claims::getExpiration).after(new Date());
        }catch (ExpiredJwtException e){
            // Token has expired
            System.out.println("Token has expired: " + e.getMessage());
            return false;
        }catch (Exception e){
            System.out.println("Invalid token: " + e.getMessage());
            return false;
        }

    }

}
