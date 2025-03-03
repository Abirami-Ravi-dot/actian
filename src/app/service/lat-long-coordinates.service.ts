import { Injectable } from "@angular/core";
import { share } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class LatLongCoordinatesService {
  baseURL: string = environment.baseUrl;
  public responseCache = new Map();

  constructor(private httpClient: HttpClient) {}

  getCoordValues(cityName: any) {
    const valuesFromCache = this.responseCache.get(this.baseURL + cityName);
    if (valuesFromCache) {
      return of(valuesFromCache);
    }
    const response = this.httpClient.get(this.baseURL + cityName).pipe(share());
    response.subscribe(cities =>
      this.responseCache.set(this.baseURL + cityName, cities)
    );
    return response;
  }
}
