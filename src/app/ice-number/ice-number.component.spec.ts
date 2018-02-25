import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceNumberComponent } from './ice-number.component';

describe('IceNumberComponent', () => {
  let component: IceNumberComponent;
  let fixture: ComponentFixture<IceNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
