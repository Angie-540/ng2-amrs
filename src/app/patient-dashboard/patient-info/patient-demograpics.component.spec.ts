
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs/Rx';

import { PatientService } from '../patient.service';
import { PatientDemographicsComponent } from './patient-demograpics.component';
import { AppFeatureAnalytics } from '../../shared/app-analytics/app-feature-analytics.service';
import { FakeAppFeatureAnalytics } from '../../shared/app-analytics/app-feature-analytcis.mock';


@Pipe({ name: 'translate' })
export class FakeTranslatePipe implements PipeTransform {
  transform(value: any, decimalPlaces: number): any {
    return value;
  }
}
describe('Component: Patient Demographics Unit Tests', () => {
  let fakePatientService = {
    currentlyLoadedPatient: Observable.of({
      uuid: '',
      person: { uuid: 'person_uuid', display: 'name', age: 20, dead: false },
      birthdate: '11/22/2016'
    })
  };

  let fakeChangeDetectorRef = {
    markForCheck: () => { }
  };

  let fixture, comp, nativeElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        PatientDemographicsComponent,
        FakeTranslatePipe
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: fakeChangeDetectorRef },
        {
          provide: PatientService, useValue: fakePatientService
        },
        PatientDemographicsComponent,
        [
          {
            provide: AppFeatureAnalytics, useFactory: () => {
              return new FakeAppFeatureAnalytics();
            }, deps: []
          }
        ]
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PatientDemographicsComponent);
        comp = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
      });
  }));
  it('should create an instance', () => {
    let fakeAppFeatureAnalytics: AppFeatureAnalytics = TestBed.get(AppFeatureAnalytics);
    let component = new PatientDemographicsComponent(null, fakeAppFeatureAnalytics);
    expect(component).toBeTruthy();
  });
  it('should render demographics correctly',
    inject([PatientService],
      () => {
        comp.ngOnInit();
        fixture.detectChanges();
        let items = nativeElement.querySelectorAll('li');
        expect(items[0].innerHTML).toBe('Name: NAME');
        expect(items[1].innerHTML).toBe('Age: 20');
        expect(items[2].innerHTML).toBe('DOB: 11/22/2016');
      }));
});