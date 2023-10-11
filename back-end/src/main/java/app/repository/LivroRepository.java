package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import app.entity.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {

}
