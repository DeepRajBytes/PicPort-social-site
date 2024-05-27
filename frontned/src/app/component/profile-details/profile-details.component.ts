import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
 
  profileDetails: any
  userProfile: any
  isFollowing: boolean = false;


  //regard model
  isModalOpen: boolean = false;
  modalTitle: string = '';
  modalData: any[] = [];


  constructor(private activeRoute: ActivatedRoute, private auth: AuthServiceService, private route: Router) { }

  ngOnInit(): void {
    const userName = this.activeRoute.snapshot.paramMap.get('id');
    this.auth.getProfileData(userName).subscribe(response => {
      this.profileDetails = response;
      console.log("details", this.profileDetails);

    })
    
    

    this.auth.getProfile().subscribe(response => {
      this.userProfile = response
      console.log("user", this.userProfile);
      console.log("ye true hai ",this.profileDetails._id === this.userProfile._id);
      if(this.profileDetails._id === this.userProfile._id){
        this.route.navigate(['/profile'])
      }
      this.checkIfFollowing();
    })
    // console.log("yha par esa ho ha hai 12", this.userProfile?.following?.includes(this.profileDetails._id));
    // if (this.userProfile?.following?.includes(this.profileDetails._id)) {
    //   this.isFollowing = true;
    //   console.log("yha par esa ho ha hai", this.userProfile?.following?.includes(this.profileDetails._id));

    // }
    
  }

  checkIfFollowing() {
    if (this.profileDetails && this.userProfile) {
      console.log("Comparing IDs:", this.userProfile.following, this.profileDetails._id);
      this.isFollowing = this.userProfile.following.includes(this.profileDetails._id);
      console.log("isFollowing:", this.isFollowing);
    }
  }

  postdetails(data: Post) {
    const id = data._id;
    this.route.navigate([`postdata/${id}`])
  }

  shareProfile() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy URL: ', err);
    });
  }

  toggleFollow() {

    const usernamePayload = { username: this.profileDetails.username };
    if (this.isFollowing) {
      // Unfollow logic
      this.auth.unfollow(usernamePayload).subscribe(response => {
        
        console.log(response);
        this.isFollowing = false;
        this.profileDetails.follower.length -= 1;
      });
      // console.log("unfollow will hit");

    } else {
      // Follow logic
      this.auth.follow(usernamePayload).subscribe((response) => {
        console.log(response);
        this.isFollowing = true;
        this.profileDetails.follower.length += 1;
      });
      // console.log("follow will hit");

    }
  }
  openModal(title: string, users: any[]): void {
    this.modalTitle = title;
    this.modalData = users;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // getuserProfile(username:any){
  //   console.log(username);
    
  //   this.route.navigate([`profile/${username}`], { replaceUrl: true });
    
  // }
  getuserProfile(username: string): void {
    console.log(username);
    this.route.navigateByUrl(`/profile/${username}`, { replaceUrl: true }).then(() => {
        // Reload the component or fetch new user data here
        this.isModalOpen = false
        const userName = this.activeRoute.snapshot.paramMap.get('id');
        this.auth.getProfileData(userName).subscribe(response => {
            this.profileDetails = response;
            console.log("details", this.profileDetails);
        });
    });
}

}
