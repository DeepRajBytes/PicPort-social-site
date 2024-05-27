import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../config/api';
import { Post } from '../models/post.model'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  private apiUrl = BASE_API_URL + 'post/create';
  private getapiUrl = BASE_API_URL + 'post';
  private getbyidapiUrl = BASE_API_URL + 'post/postdata/';
  // private headers;

  constructor(private http: HttpClient) {
   
  }
  
  createpost(postData: any) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl,postData,{headers});
  }

  getpost(): Observable<Post[]>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.get<Post[]>(this.getapiUrl,{headers})
  }

  getpostData(id:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.get<Post>(`${this.getbyidapiUrl}${id}`, { headers });
  }
}

