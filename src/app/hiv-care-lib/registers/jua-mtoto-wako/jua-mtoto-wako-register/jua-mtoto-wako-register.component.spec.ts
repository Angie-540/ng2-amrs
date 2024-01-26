import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuaMtotoWakoRegisterComponent } from './jua-mtoto-wako-register.component';

describe('JuaMtotoWakoRegisterComponent', () => {
  let component: JuaMtotoWakoRegisterComponent;
  let fixture: ComponentFixture<JuaMtotoWakoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JuaMtotoWakoRegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuaMtotoWakoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
