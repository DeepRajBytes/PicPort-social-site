import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../config/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  private apiUrl = BASE_API_URL + 'reaction/like';
  private unlikeApiUrl = BASE_API_URL + 'reaction/unlike';
  private commentApiUrl = BASE_API_URL + 'reaction/comment'

  constructor(private http: HttpClient) { }

  likePost(reqData: { postId: string }): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
   
    return this.http.post(this.apiUrl, reqData, {headers});
  }


  unlikePost(reqData: { postId: string }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT')}`
    });

    return this.http.delete(this.unlikeApiUrl, {
      headers,
      body: reqData
    });
  }

  commentPost(postId:any , reqData:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('JWT')}`
    });
    return this.http.post(`${this.commentApiUrl}/${postId}`,reqData , {headers})

  }
}