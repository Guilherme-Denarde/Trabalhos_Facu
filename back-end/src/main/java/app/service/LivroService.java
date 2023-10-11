package app.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.dto.LivroDTO;
import app.entity.Livro;
import app.repository.LivroRepository;

@Service
public class LivroService {

	@Autowired
	private LivroRepository livroRepository;

	public List<LivroDTO> listAll(){
		List<Livro> lista = livroRepository.findAll();
		List<LivroDTO> listaDTO = new ArrayList<>();

		for(int i=0; i<lista.size(); i++) 
			listaDTO.add(this.toLivroDTO(lista.get(i)));

		return listaDTO;
	}
	
	public LivroDTO save(LivroDTO livroDTO){
		Livro livro = this.toLivro(livroDTO);

		Livro livroSalvo = livroRepository.save(livro);

		return this.toLivroDTO(livroSalvo);
	}

	private LivroDTO toLivroDTO(Livro livro) {
		LivroDTO livroDTO = new LivroDTO();
		livroDTO.setId(livro.getId());
		livroDTO.setTitulo(livro.getTitulo());
		livroDTO.setAutor(livro.getAutor());
		return livroDTO;
	}
	
	private Livro toLivro(LivroDTO livroDTO) {
		Livro livro = new Livro();
		livro.setId(livroDTO.getId());
		livro.setTitulo(livroDTO.getTitulo());
		livro.setAutor(livroDTO.getAutor());
		return livro;
	}
	
	public LivroDTO update(LivroDTO livroDTO){
		if(livroDTO.getId() == null) {
			throw new IllegalArgumentException("ID is required to update a book");
		}

		Livro livro = this.toLivro(livroDTO);
		Livro livroUpdated = livroRepository.save(livro);
		return this.toLivroDTO(livroUpdated);
	}

	public void delete(Long id) {
		livroRepository.deleteById(id);
	}
}
