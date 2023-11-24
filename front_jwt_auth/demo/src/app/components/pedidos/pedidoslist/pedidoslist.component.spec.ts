import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidoslistComponent } from './pedidoslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { of } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';

describe('PedidoslistComponent', () => {
  let component: PedidoslistComponent;
  let fixture: ComponentFixture<PedidoslistComponent>;
  let mockPedidosService: jasmine.SpyObj<PedidosService>;
  let mockModalService: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    mockPedidosService = jasmine.createSpyObj('PedidosService', ['listAll']);
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule],
      declarations: [PedidoslistComponent],
      providers: [
        { provide: PedidosService, useValue: mockPedidosService },
        { provide: NgbModal, useValue: mockModalService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(PedidoslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list pedidos on init', () => {
    const mockPedidos = [new Pedido(), new Pedido()];
    mockPedidosService.listAll.and.returnValue(of(mockPedidos));
    component.listAll();
    expect(component.lista.length).toBe(2);
  });

  it('should open a modal for adding a new pedido', () => {
    component.adicionar('modalContent');
    expect(mockModalService.open).toHaveBeenCalled();
  });

  it('should open a modal for editing an existing pedido', () => {
    const pedido = new Pedido();
    component.editar('modalContent', pedido, 0);
    expect(mockModalService.open).toHaveBeenCalled();
    expect(component.objetoSelecionadoParaEdicao).toEqual(pedido);
  });

});
