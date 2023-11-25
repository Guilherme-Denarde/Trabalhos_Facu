import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProdutosdetailsComponent } from './produtosdetails.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Produto } from 'src/app/models/produto';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ProdutosdetailsComponent', () => {
  let component: ProdutosdetailsComponent;
  let fixture: ComponentFixture<ProdutosdetailsComponent>;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'put']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule ],
      declarations: [ProdutosdetailsComponent],
      providers: [
        { provide: HttpClient, useValue: spy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosdetailsComponent);
    component = fixture.componentInstance;
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  beforeEach(() => {
    let produto = new Produto();
    produto.id = 1;
    produto.nome = 'Pizza';
    produto.valor = 456;
    component.produto = produto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Teste de 1 @Input - Interpolação no template', () => {
    component.produto.nome = 'Pizza';
    fixture.detectChanges(); 

    const inputElement = fixture.debugElement.query(By.css('input[name="exampleInputText1"]')).nativeElement;
    expect(inputElement.value).toEqual('Pizza');
  });

  it('Teste 2 de @Input - Interpolação no template', () => {
    const inputElement = fixture.debugElement.query(By.css('input[name="exampleInputText1"]')).nativeElement;
    expect(inputElement.value).not.toBe(null);
  });

  it('Teste de @Output() retorno', fakeAsync(() => {
    spyOn(component.retorno, 'emit');

    httpSpy.post.and.returnValue(of(component.produto));

    component.salvar();
    tick(); 

    expect(component.retorno.emit).toHaveBeenCalledWith(component.produto);
  }));

  it('should update model on input and submit form', () => {
    const inputNome = fixture.debugElement.query(By.css('input[name="exampleInputText1"]')).nativeElement;
    const inputValor = fixture.debugElement.query(By.css('input[name="exampleInputPassword1"]')).nativeElement;

    inputNome.value = 'New Pizza';
    inputNome.dispatchEvent(new Event('input'));
    inputValor.value = 500;
    inputValor.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);

    expect(component.produto.nome).toBe('New Pizza');
    expect(component.produto.valor).toBe(500);
  });

  it('should handle errors from the API', fakeAsync(() => {
    spyOn(window, 'alert');
    const errorResponse = new ErrorEvent('API Error');
    
    httpSpy.post.and.returnValue(throwError(() => errorResponse));
    
    component.salvar();
    tick();

    expect(window.alert).toHaveBeenCalled();
  }));

});
