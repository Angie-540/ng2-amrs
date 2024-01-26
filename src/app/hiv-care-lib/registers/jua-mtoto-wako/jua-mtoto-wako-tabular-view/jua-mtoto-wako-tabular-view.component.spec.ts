import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuaMtotoWakoTabularViewComponent } from './jua-mtoto-wako-tabular-view.component';

describe('JuaMtotoWakoTabularViewComponent', () => {
  let component: JuaMtotoWakoTabularViewComponent;
  let fixture: ComponentFixture<JuaMtotoWakoTabularViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JuaMtotoWakoTabularViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuaMtotoWakoTabularViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
