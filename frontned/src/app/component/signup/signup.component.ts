import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { noWhitespaceValidator, passwordStrengthValidator } from 'src/app/validators/custom-validators';
import { BASE_API_URL } from 'src/app/config/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  errorMessageEmail: string | null = null;
  errorMessageUsername: string | null = null;
  uploadedImageSrc: string | null = null;
  selectedFile: File | null = null;

  signupform: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required, noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordStrengthValidator]],
    acceptTerms: [false, [Validators.requiredTrue]],
    image: [null, Validators.required]  // Add image field here
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private authService: AuthServiceService,
  ) { }

  submit() {
    if (this.signupform.value.acceptTerms === false) {
      return alert("please accept terms and conditions");
    }
    if (this.signupform.invalid) {
      return alert("enter valid data");
    }

    const formData = new FormData();
    formData.append('name', this.signupform.get('name')?.value);
    formData.append('username', this.signupform.get('username')?.value);
    formData.append('email', this.signupform.get('email')?.value);
    formData.append('password', this.signupform.get('password')?.value);
    formData.append('acceptTerms', this.signupform.get('acceptTerms')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.authService.signup(formData).subscribe({
      next: (response) => {
        console.log(response);
        alert("Signup successful");
        this.route.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 400 && error.error.message === "User already exists") {
          this.errorMessageEmail = error.error.message;
        } else if (error.status === 400 && error.error.message === "Username already exists") {
          this.errorMessageUsername = "Username already taken";
        } else {
          alert("Signup failed");
        }
        console.error('Error creating user', error);
      }
    });
  }

  onFileUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;

    if (file) {
      this.signupform.patchValue({
        image: file
      });
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
