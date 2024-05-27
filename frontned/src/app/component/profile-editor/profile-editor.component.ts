import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { noWhitespaceValidator } from 'src/app/validators/custom-validators';


@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit{
 
  profileDetails: any;

  uploadedImageSrc: string | null = null;
  selectedFile: File | null = null;

 
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: Router,
    private authService: AuthServiceService,){}
 
  ngOnInit(): void {
    this.profileDetails = this.data.profileDetails;
    console.log(this.profileDetails);
    this.uploadedImageSrc = this.profileDetails.userProfile;
    this.Profileeditorform.patchValue({
      name: this.profileDetails.name,
      username: this.profileDetails.username,
      bio: this.profileDetails.bio,
      email: this.profileDetails.email,
      image:this.profileDetails.userProfile

    });
  }

  openFileInput(): void {
    // document.getElementById('profile-pic-upload')?.click();
  }

  Profileeditorform: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required, noWhitespaceValidator]],
    email: ['', [Validators.required, Validators.email]],
    image: [null, Validators.required],
    bio:[''] 
  });



  submit() {
   
    if (this.Profileeditorform.invalid) {
      return alert("enter valid data");
    }

    const formData = new FormData();
    formData.append('name', this.Profileeditorform.get('name')?.value);
    formData.append('username', this.Profileeditorform.get('username')?.value);
    formData.append('email', this.Profileeditorform.get('email')?.value);
    formData.append('bio', this.Profileeditorform.get('bio')?.value);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
   
    this,this.authService.updateprofile(formData).subscribe(response =>{
      console.log("update hua hai");
     this.dialog.closeAll(); 
    })
    
  }

  onFileUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    console.log(fileInput+"file input ")
    const file = fileInput.files ? fileInput.files[0] : null;
  
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
