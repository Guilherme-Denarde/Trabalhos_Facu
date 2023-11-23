package app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PedidoDTO {

	private Long id;
	private String obs;

	private List<ProdutoDTO> produtos;

}
