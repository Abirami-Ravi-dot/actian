import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable, of } from "rxjs";
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
    const response = this.httpClient.get(this.baseURL + cityName);
    response.subscribe(cities =>
      this.responseCache.set(this.baseURL + cityName, cities)
    );
    return response;
  }
}
