package app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.PedidoDTO;
import app.dto.ProdutoDTO;
import app.entity.Pedido;
import app.entity.Produto;
import app.repository.PedidoRepository;

@Service
public class PedidoService {

	@Autowired
	private PedidoRepository pedidoRepository;
	
	@Autowired
	private ProdutoService produtoService;
	

	public List<PedidoDTO> listAll(){
		List<Pedido> lista = pedidoRepository.findAll();
		List<PedidoDTO> listaDTO = new ArrayList<>();

		for(int i=0; i<lista.size(); i++) 
			listaDTO.add(this.toPedidoDTO(lista.get(i)));

		return listaDTO;
	}
	
	public PedidoDTO save(PedidoDTO pedidoDTO){
		Pedido pedido = this.toPedido(pedidoDTO);

		Pedido pedidosalva = pedidoRepository.save(pedido);

		return this.toPedidoDTO(pedidosalva);
	}

	public PedidoDTO toPedidoDTO(Pedido pedido) {
		PedidoDTO pedidoDTO = new PedidoDTO();
		pedidoDTO.setId(pedido.getId());
		pedidoDTO.setObs(pedido.getObs());
		
		List<ProdutoDTO> listaProdutos = new ArrayList<>();
		if(pedido.getProdutos() != null)
			for(int i=0; i<pedido.getProdutos().size(); i++) {
				listaProdutos.add(this.produtoService.toProdutoDTO(pedido.getProdutos().get(i)));
			}
		pedidoDTO.setProdutos(listaProdutos);
		
		return pedidoDTO;
	}
	
	public Pedido toPedido(PedidoDTO pedidoDTO) {
		Pedido pedido = new Pedido();
		pedido.setId(pedidoDTO.getId());
		pedido.setObs(pedidoDTO.getObs());
		
		List<Produto> listaProdutos = new ArrayList<>();
		if(pedidoDTO.getProdutos() != null)
			for(int i=0; i<pedidoDTO.getProdutos().size(); i++) {
				listaProdutos.add(this.produtoService.toProduto(pedidoDTO.getProdutos().get(i)));
			}
		pedido.setProdutos(listaProdutos);
		
		return pedido;
	}

}
