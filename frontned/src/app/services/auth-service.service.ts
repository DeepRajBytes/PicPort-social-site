import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../config/api';
import { ProfileResponse } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

interface LoginResponse {
  jwttoken: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = BASE_API_URL + 'auth/signup';
  private apiUrllogin = BASE_API_URL + 'auth/signin';
  private apiProfile = BASE_API_URL + 'auth/profile';
  private apiProfiledata = BASE_API_URL + 'auth/profile';
  private apifollow = BASE_API_URL + 'auth/follow';
  private apiunfollow = BASE_API_URL + 'auth/unfollow';
  private apiupdate = BASE_API_URL + 'auth/profileUpdate'


  constructor(private http: HttpClient) { }


  login(userData: any){
        return this.http.post<LoginResponse>(this.apiUrllogin,userData)
  }

  signup(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }

  getProfile() :Observable<ProfileResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.get<ProfileResponse>(this.apiProfile , {headers});
  }

  getProfileData (id:any):Observable<ProfileResponse>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.get<ProfileResponse>(`${this.apiProfiledata}/${id}`, {headers});
  }

  follow(username : any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    console.log("ye mila",username);
    
    return this.http.post(this.apifollow , username, {headers})
  }

  unfollow(username:any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.post(this.apiunfollow , username, {headers})
  }

  updateprofile(userData: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("JWT")}`,
      // 'Content-Type': 'application/json',
    });
    return this.http.put(this.apiupdate , userData,{headers})
  }

}
