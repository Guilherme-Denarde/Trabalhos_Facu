package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
