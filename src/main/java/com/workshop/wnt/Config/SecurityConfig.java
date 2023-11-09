package com.workshop.gui.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/livre").permitAll()
                        .anyRequest().authenticated());
       http.httpBasic(Customizer.withDefaults());
       return http.build();
    }
    @Bean
    static PasswordEncoder psEncode() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    UserDetailsService user() {
        UserDetails user = User.builder()
                .username("Lizeu")
                .password(psEncode().encode("senhasegura"))
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user);
    }
}
