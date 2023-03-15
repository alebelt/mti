import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
 
  getItems(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.baseURL}dashboard_all_tab.json`);
  }
  getRequests(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.baseURL}requests.json`);
  }
  
}