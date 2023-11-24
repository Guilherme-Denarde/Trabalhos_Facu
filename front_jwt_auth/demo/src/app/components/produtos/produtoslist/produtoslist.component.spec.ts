import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutoslistComponent } from './produtoslist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Produto } from 'src/app/models/produto';
import { of } from 'rxjs';

describe('ProdutoslistComponent', () => {
  let component: ProdutoslistComponent;
  let fixture: ComponentFixture<ProdutoslistComponent>;
  let modalService: NgbModal;
  let mockTemplateRef: TemplateRef<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ProdutoslistComponent],
      providers: [
        { provide: NgbModal, useValue: { open: jasmine.createSpy('open') } },
        { provide: TemplateRef, useValue: {} } // Mock TemplateRef
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ProdutoslistComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(NgbModal);
    mockTemplateRef = TestBed.inject(TemplateRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display a list of products', () => {
    spyOn(component.produtosService, 'listAll').and.returnValue(of([{ id: 1, nome: 'Produto 1', valor: 100 }]));
    component.listAll();
    fixture.detectChanges();
    expect(component.lista.length).toBeGreaterThan(0);
  });

  it('should open a modal for adding a product', () => {
    component.adicionar(mockTemplateRef); 
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should open a modal for editing a product', () => {
    component.editar(mockTemplateRef, new Produto(), 0); 
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should emit event on product launch', () => {
    spyOn(component.retorno, 'emit');
    const produto = new Produto();
    component.lancamento(produto);
    expect(component.retorno.emit).toHaveBeenCalledWith(produto);
  });

});
