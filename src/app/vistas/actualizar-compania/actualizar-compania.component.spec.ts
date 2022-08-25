import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCompaniaComponent } from './actualizar-compania.component';

describe('ActualizarCompaniaComponent', () => {
  let component: ActualizarCompaniaComponent;
  let fixture: ComponentFixture<ActualizarCompaniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCompaniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
