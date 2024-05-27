import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ProfileResponse } from 'src/app/models/user.model';
import { ReactionService } from 'src/app/services/reaction.service';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
  

  unlikePost(id: any) {
    const postId = id._id;
    this.reactionService.unlikePost({ postId }).subscribe(
      response => {
        alert("Post Removed")
        window.location.reload();
        console.log('Unlike status updated successfully', response);
      },
      error => {
        console.error('Error updating unlike status', error);
      }
    );
    
  }
  savedPosts: any[] = [];
  constructor(private profileservice: AuthServiceService ,  private reactionService: ReactionService ,  private route: Router) { }

  ngOnInit(): void {
    this.profileservice.getProfile().subscribe((response: ProfileResponse) => {
      this.savedPosts = response.savedpost;
      console.log(this.savedPosts);

    })
  }

  postdetails(data: Post) {
    const id = data._id;
    this.route.navigate([`postdata/${id}`])   
  }

}
