import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidosdetailsComponent } from './pedidosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { PedidosService } from 'src/app/services/pedidos.service';

describe('PedidosdetailsComponent', () => {
  let component: PedidosdetailsComponent;
  let fixture: ComponentFixture<PedidosdetailsComponent>;
  let httpTestingController: HttpTestingController;
  let pedidosService: PedidosService;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule],
      declarations: [PedidosdetailsComponent],
      providers: [PedidosService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PedidosdetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    pedidosService = TestBed.inject(PedidosService);
    modalService = TestBed.inject(NgbModal);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a pedido', () => {
    const mockPedido = new Pedido();
    component.pedido = mockPedido;
    
    component.salvar();

    const req = httpTestingController.expectOne(pedidosService.API);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockPedido);
    req.flush(mockPedido); 
  });

  it('should add a produto to the pedido', () => {
    const mockProduto = new Produto();
    
    component.retornoProdutosList(mockProduto);

    expect(component.pedido.produtos).toContain(mockProduto);
  });

  it('should open a modal to add a new produto', () => {
    spyOn(modalService, 'open').and.callThrough();

    component.lancar('modalContent');

    expect(modalService.open).toHaveBeenCalled();
  });


  afterEach(() => {
    httpTestingController.verify(); 
  });
});
