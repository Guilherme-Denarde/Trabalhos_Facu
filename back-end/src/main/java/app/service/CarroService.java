package app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.dto.CarroDTO;
import app.entity.Carro;
import app.repository.CarroRepository;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarroService {

	@Autowired
	private CarroRepository carroRepository;

	public List<CarroDTO> listAll(){
		List<Carro> lista = carroRepository.findAll();
		List<CarroDTO> listaDTO = new ArrayList<>();

		for(int i=0; i<lista.size(); i++)
			listaDTO.add(this.toCarroDTO(lista.get(i)));

		return listaDTO;
	}

	public CarroDTO save(CarroDTO carroDTO){
		Carro carro = this.toCarro(carroDTO);

		Carro carroSalvo = carroRepository.save(carro);

		return this.toCarroDTO(carroSalvo);
	}

	private CarroDTO toCarroDTO(Carro carro) {
		CarroDTO carroDTO = new CarroDTO();
		carroDTO.setId(carro.getId());
		carroDTO.setMarca(carro.getMarca());
		carroDTO.setAno(carro.getAno());
		return carroDTO;
	}

	private Carro toCarro(CarroDTO carroDTO) {
		Carro carro = new Carro();
		carro.setId(carroDTO.getId());
		carro.setMarca(carroDTO.getMarca());
		carro.setAno(carroDTO.getAno());
		return carro;
	}

	public CarroDTO update(CarroDTO carroDTO){
		if(carroDTO.getId() == null) {
			throw new IllegalArgumentException("ID é necessário para atualizar um carro");
		}

		Carro carro = this.toCarro(carroDTO);
		Carro carroUpdated = carroRepository.save(carro);
		return this.toCarroDTO(carroUpdated);
	}

	public void delete(Long id) {
		carroRepository.deleteById(id);
	}
}
