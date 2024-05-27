import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_API_URL } from 'src/app/config/api';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private apiUrl = BASE_API_URL + 'auth/signin'

  constructor(private fb:FormBuilder , private http:HttpClient , private route:Router , private auth : AuthServiceService){
}
  loginform:FormGroup = this.fb.group({
    identifier:['',[Validators.required]],
    password:['',[Validators.required]],
  })
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  submit() {
      if(this.loginform.invalid){
      return alert("enter valid data")
      }
      this.auth.login(this.loginform.value).subscribe(response =>{
        if(response){
          localStorage.setItem('JWT', response.jwttoken);
          // window.location.reload();
          this.route.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      },(error)=>{
        alert(error.message)
      })}
}