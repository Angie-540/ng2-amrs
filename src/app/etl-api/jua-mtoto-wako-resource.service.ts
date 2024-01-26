import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import * as _ from 'lodash';

import { AppSettingsService } from '../app-settings/app-settings.service';
import { DataCacheService } from '../shared/services/data-cache.service';

@Injectable()
export class JuaMtotoWakoResourceService {
  constructor(
    protected http: HttpClient,
    protected appSettingsService: AppSettingsService,
    private cacheService: DataCacheService
  ) {}

  public getBaseUrl(): string {
    return this.appSettingsService.getEtlRestbaseurl().trim();
  }
  public getPatientListUrl(): string {
    return (
      this.appSettingsService.getEtlRestbaseurl().trim() +
      'jua-mtoto-wako/patient-list'
    );
  }

  public getJuaMtotoWakoMonthlyReport(payload: any): Observable<any> {
    if (!payload) {
      return null;
    }
    let urlParams: HttpParams = new HttpParams()
      .set('endDate', payload.endDate)
      .set('startDate', payload.startDate)
      .set('locationType', payload.locationType);
    if (payload.locationUuids) {
      if (payload.locationUuids.length > 0) {
        urlParams = urlParams.set('locationUuids', payload.locationUuids);
      }
    }
    const url = this.getBaseUrl() + 'jua-mtoto-wako';
    const request = this.http.get(url, {
      params: urlParams
    });
    return this.cacheService.cacheRequest(url, urlParams, request);
  }

  public getJuaMtotoWakoMonthlyReportPatientList(params: any) {
    if (!params) {
      return null;
    }
    const urlParams: HttpParams = new HttpParams()
      .set('startDate', params.startDate)
      .set('endDate', params.endDate)
      .set('locationUuids', params.locationUuids)
      .set('indicators', params.indicators)
      .set('locationType', params.locationType);

    const url = this.getPatientListUrl();
    const request = this.http.get(url, {
      params: urlParams
    });
    return this.cacheService.cacheRequest(url, urlParams, request);
  }
}
