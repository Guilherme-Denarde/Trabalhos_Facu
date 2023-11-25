package app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.dto.PedidoDTO;
import app.service.PedidoService;

@RestController
@RequestMapping("/api/pedido")
@CrossOrigin(origins = "http://localhost:4200")
public class PedidoController {
	
	@Autowired
	private PedidoService pedidoService;
	
	@GetMapping
	private ResponseEntity<List<PedidoDTO>> listAll(){
		try {		
			List<PedidoDTO> lista = pedidoService.listAll();
			return new ResponseEntity<>(lista, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping
	private ResponseEntity<PedidoDTO> save(@RequestBody PedidoDTO pedidoDTO){
		try {		
			PedidoDTO pedidoSalva = pedidoService.save(pedidoDTO);
			return new ResponseEntity<>(pedidoSalva, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("erro")
	private ResponseEntity<List<PedidoDTO>> exemploErro(){
		return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	}

}
