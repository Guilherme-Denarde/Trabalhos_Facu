package com.workshop.gui.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public String teste() {
        return "<h1> Nice tu tem accesso </h1>";
    }
    @GetMapping("/livre")
    public String publicRote() {
        return "<h1> Aqui td esta permitido</h1>";
    }
}
