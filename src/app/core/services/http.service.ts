import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private http: HttpClient) {}
  get(path: string, params: HttpParams = new HttpParams(), token: string='', corsBypass:boolean = false): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    if (corsBypass) {
      header = header.set("Target-URL",path);
      return this.http
      .get(`${environment.apiUrl}/cors`, { headers: header, params: params })
      .pipe(catchError(this.handleError));
    }
    return this.http
      .get(path, { headers: header, params: params })
      .pipe(catchError(this.handleError));
  }

  put(path: string, body: Object = {}, token: string='', corsBypass:boolean = false): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    if (corsBypass) {
      header = header.set("Target-URL",path);
      return this.http
      .put(`${environment.apiUrl}/cors`, body,{headers: header})
      .pipe(catchError(this.handleError));
    }
    return this.http
      .put(path, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  patch(path: string, body: Object = {}, token: string='', corsBypass:boolean = false): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    if (corsBypass) {
      header = header.set("Target-URL",path);
      return this.http
      .patch(`${environment.apiUrl}/cors`, body,{headers: header})
      .pipe(catchError(this.handleError));
    }
    return this.http
      .patch(path, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  post(path: string, body: Object = {}, token: string='', corsBypass:boolean = false): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    if (corsBypass) {
      header = header.set("Target-URL",path);
      return this.http
      .post(`${environment.apiUrl}/cors`, body,{headers: header})
      .pipe(catchError(this.handleError));
    }
    return this.http
      .post(path, body,{headers: header})
      .pipe(catchError(this.handleError));
  }

  delete(path: string, params: HttpParams = new HttpParams(), token: string='', corsBypass:boolean = false): Observable<any> {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    if (corsBypass) {
      header = header.set("Target-URL",path);
      return this.http
      .delete(`${environment.apiUrl}/cors`,{headers: header,params: params})
      .pipe(catchError(this.handleError));
    }
    return this.http
      .delete(path,{headers: header,params: params})
      .pipe(catchError(this.handleError));
  }
  uploadMultipart(path: string, formdata: FormData, token: string='') {
    var header = new HttpHeaders();
    header = header.set("Authorization","Bearer " + token)
    return this.http
    .post<any>(path, formdata, {headers: header})
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error.error);
  }
}