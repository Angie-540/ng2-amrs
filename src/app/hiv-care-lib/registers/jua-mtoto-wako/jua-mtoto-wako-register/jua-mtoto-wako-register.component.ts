import { Component, OnInit, Input, Output, AfterViewInit } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import * as Moment from 'moment';
import { JuaMtotoWakoResourceService } from 'src/app/etl-api/jua-mtoto-wako-resource.service';
import { ClinicDashboardCacheService } from 'src/app/clinic-dashboard/services/clinic-dashboard-cache.service';
import { MOH412ResourceService } from 'src/app/etl-api/moh-412-resource.service';

interface JuaMtotoWakoSummaryResponse {
  schemas: any;
  sqlQuery: string;
  size: number;
  result: any[];
  sectionDefs: any[];
}

interface JuaMtotoWakoQueryParams {
  endingMonth: string;
  locationUuids: string;
}

@Component({
  selector: 'app-jua-mtoto-wako-register',
  templateUrl: './jua-mtoto-wako-register.component.html',
  styleUrls: ['./jua-mtoto-wako-register.component.css'] //
})
// private juaMtotoWakoService : JuaMtotoWakoResourceService
export class JuaMtotoWakoRegisterComponent implements OnInit, AfterViewInit {
  public title = 'Jua Mtoto Wako Register';
  public params: any;
  public moh412Data = [];
  public totalsData = [];
  public reportDef = [];
  public currentView = 'pdf';
  public busyIndicator: any = {
    busy: false,
    message: 'Please wait...' // default message
  };
  public error = {
    error: false,
    message: ''
  };
  @Input() public dashboardType = '';
  @Input() public dashboardLocation = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private juaMtotoWakoService: JuaMtotoWakoResourceService,
    private moh412ResourceService: MOH412ResourceService
  ) {}

  public ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params) {
          if (params.startDate && params.locationUuids) {
            this.params = params;
            this.generateReport(this.params);
            this.toggleCurrentView(params.currentView);
          }
        }
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

  public ngAfterViewInit() {}

  public generateReport(params: any) {
    this.setBusy();
    this.resetErrorObj();
    this.juaMtotoWakoService.getJuaMtotoWakoMonthlyReport(params).subscribe(
      (result) => {
        this.moh412Data = result.result;
        this.reportDef = result.sectionDefinitions;
        this.totalsData = result.totalResults;
        this.setFree();
      },
      (error) => {
        console.log(error);
        this.setFree();
        this.error = {
          error: true,
          message: 'An error occured.Kindly try reloading page ...'
        };
      }
    );
  }

  public onTabChanged($event: any) {
    const tabIndex = $event.index;
    switch (tabIndex) {
      case 0:
        this.currentView = 'pdf';
        break;
      case 1:
        this.currentView = 'tabular';
        break;
      default:
        this.currentView = 'pdf';
    }
  }

  private setBusy() {
    this.busyIndicator = {
      busy: true,
      message: 'Please wait...Loading'
    };
  }
  private setFree() {
    this.busyIndicator = {
      busy: false,
      message: ''
    };
  }
  private resetErrorObj() {
    this.error = {
      error: false,
      message: ''
    };
  }
  public toggleCurrentView(currentView: string = 'pdf') {
    this.currentView = currentView;
  }
}
