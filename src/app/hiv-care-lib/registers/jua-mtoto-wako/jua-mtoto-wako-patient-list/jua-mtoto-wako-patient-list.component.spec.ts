import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuaMtotoWakoPatientListComponent } from './jua-mtoto-wako-patient-list.component';

describe('JuaMtotoWakoPatientListComponent', () => {
  let component: JuaMtotoWakoPatientListComponent;
  let fixture: ComponentFixture<JuaMtotoWakoPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JuaMtotoWakoPatientListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuaMtotoWakoPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
