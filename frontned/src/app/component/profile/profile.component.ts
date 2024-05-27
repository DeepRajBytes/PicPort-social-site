import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProfileEditorComponent } from '../profile-editor/profile-editor.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  profileDetails:any

   //regard model
   isModalOpen: boolean = false;
   modalTitle: string = '';
   modalData: any[] = [];
  
  constructor(private authService: AuthServiceService , private http : HttpClient , private route : Router , public dialog: MatDialog){}
  
  ngOnInit(): void {
   

    this.authService.getProfile().subscribe(response =>{
      console.log(response);
      this.profileDetails = response
    })
 }




  postdetails(data: Post) {
    const id = data._id;
    this.route.navigate([`postdata/${id}`])   
  }

  shareProfile() {
    const url = window.location.href; 
    const realurl = url + `/${this.profileDetails.username}`
    navigator.clipboard.writeText(realurl).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  }


  openModal(title: string, users: any[]): void {
    this.modalTitle = title;
    this.modalData = users;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  
  getuserProfile(username: string): void {
    console.log(username);
    this.route.navigateByUrl(`/profile/${username}`)
}

openDialog(): void {
  const dialogRef = this.dialog.open(ProfileEditorComponent, {
    width:'400px',
    data: {profileDetails : this.profileDetails },
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
     window.location.reload();
  });

}


}
