import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StavkeProfaktureComponent } from './stavke-profakture.component';

describe('StavkeProfaktureComponent', () => {
  let component: StavkeProfaktureComponent;
  let fixture: ComponentFixture<StavkeProfaktureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StavkeProfaktureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StavkeProfaktureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
