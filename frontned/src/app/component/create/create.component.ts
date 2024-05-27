import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  signupform: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder , private http : HttpClient , private route: Router , private post : PostserviceService) {
    this.signupform = this.fb.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
      topic: ['',[Validators.required]]
    });
  }

  Postsubmit() {
   if (this.signupform.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.signupform.get('title')?.value);
    formData.append('description', this.signupform.get('description')?.value);
    formData.append('topic', this.signupform.get('topic')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.post.createpost(formData).subscribe(response => {
        console.log('Post created successfully', response);
        if(response){
        this.route.navigate(['/home'])
        }
      }, error => {
        alert("please enter only jpeg , jpg , png format images we are not accept gif files due to server reasons we are working on it and soon this service will be avaibled")
        console.error('Error creating post', error);
      });
  }

  
    onImageClick() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
    }

    onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}



 // if (this.signupform.invalid) {
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('title', this.signupform.get('title')?.value);
    // formData.append('description', this.signupform.get('description')?.value);
    // formData.append('topic', this.signupform.get('topic')?.value);

    // if (this.selectedFile) {
    //   formData.append('image', this.selectedFile);
    // }

    // this.http.post('http://localhost:2121/post/create', formData)
    //   .subscribe(response => {
    //     console.log('Post created successfully', response);
    //   }, error => {
    //     console.error('Error creating post', error);
    //   });