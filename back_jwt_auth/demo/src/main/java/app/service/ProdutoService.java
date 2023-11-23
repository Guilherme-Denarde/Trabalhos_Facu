package app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.ProdutoDTO;
import app.entity.Produto;
import app.repository.ProdutoRepository;

@Service
public class ProdutoService {

	@Autowired
	private ProdutoRepository produtoRepository;

	public List<ProdutoDTO> listAll(){
		List<Produto> lista = produtoRepository.findAll();
		List<ProdutoDTO> listaDTO = new ArrayList<>();

		for(int i=0; i<lista.size(); i++) 
			listaDTO.add(this.toProdutoDTO(lista.get(i)));

		return listaDTO;
	}
	
	public ProdutoDTO save(ProdutoDTO produtoDTO){
		Produto produto = this.toProduto(produtoDTO);

		Produto produtosalva = produtoRepository.save(produto);

		return this.toProdutoDTO(produtosalva);
	}

	public ProdutoDTO toProdutoDTO(Produto produto) {
		ProdutoDTO produtoDTO = new ProdutoDTO();
		produtoDTO.setId(produto.getId());
		produtoDTO.setNome(produto.getNome());
		produtoDTO.setValor(produto.getValor());
		return produtoDTO;
	}
	
	public Produto toProduto(ProdutoDTO produtoDTO) {
		Produto produto = new Produto();
		produto.setId(produtoDTO.getId());
		produto.setNome(produtoDTO.getNome());
		produto.setValor(produtoDTO.getValor());
		return produto;
	}

}
