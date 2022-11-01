import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpService {
  constructor(http: HttpClient) {
    super(http)
  }

  getAuth() {
    var token = localStorage.getItem('token');
    if (token === null) {
      return "";
    } else {
      return token;
    }
  }

  override get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return super.get(`${environment.apiUrl}${path}`, params, this.getAuth());
  }

  override put(path: string, body: Object = {}): Observable<any> {
    return super.put(`${environment.apiUrl}${path}`, body, this.getAuth());
  }

  override patch(path: string, body: Object = {}): Observable<any> {
    return super.patch(`${environment.apiUrl}${path}`, body, this.getAuth());
  }

  override post(path: string, body: Object = {}): Observable<any> {
    return super.post(`${environment.apiUrl}${path}`, body, this.getAuth());
  }

  override delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return super.delete(`${environment.apiUrl}${path}`, params, this.getAuth());
  }
  override uploadMultipart(path: string, formdata: FormData): Observable<any> {
    return super.uploadMultipart(`${environment.apiUrl}${path}`, formdata, this.getAuth());
  }

}
