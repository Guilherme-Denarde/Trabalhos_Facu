//AuthenticationService.java
package app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import app.config.JwtServiceGenerator;
import app.dto.LoginDTO;
import app.dto.UserDTO;
import app.entity.User;
import app.repository.LoginRepository;

@Service
public class LoginService {
	
	@Autowired
	private LoginRepository repository;
	@Autowired
	private JwtServiceGenerator jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;


	public UserDTO logar(LoginDTO loginDTO) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						loginDTO.getUsername(),
						loginDTO.getPassword()
						)
				);
		User user = repository.findByUsername(loginDTO.getUsername()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		
		return toUserDTO(user, jwtToken);
	}

	private UserDTO toUserDTO(User user, String token) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setRole(user.getRole());
		userDTO.setToken(token);
		userDTO.setUsername(user.getUsername());
		return userDTO;
	}

}
