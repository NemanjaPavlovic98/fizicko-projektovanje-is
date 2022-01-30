import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaProfakturaComponent } from './nova-profaktura.component';

describe('NovaProfakturaComponent', () => {
  let component: NovaProfakturaComponent;
  let fixture: ComponentFixture<NovaProfakturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaProfakturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaProfakturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
