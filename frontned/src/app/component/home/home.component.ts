import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice.service';
import { Post } from 'src/app/models/post.model';
import { ReactionService } from 'src/app/services/reaction.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
    
  postData: Post[] = [];
  constructor(private http: HttpClient, private route: Router, private auth: PostserviceService, private reactionService: ReactionService ) { }

  ngOnInit(): void {
    this.auth.getpost().subscribe((response: Post[]) => {
      if (response) {
        this.postData = response
        console.log(this.postData);

      }
    })
    }


    userProfile(username:any){
      console.log(username);
      this.route.navigate([`profile/${username}`])
    }

    postdetails(data: Post) {
      const id = data._id;
      this.route.navigate([`postdata/${id}`])   
    }

  toggleLike(post: Post): void {
    const postId = post._id;
    if (post.liked) {
      this.reactionService.unlikePost({ postId }).subscribe(
        response => {
          console.log('Unlike status updated successfully', response);
          post.liked = false;
        },
        error => {
          console.error('Error updating unlike status', error);
        }
      );
    } else {
      this.reactionService.likePost({ postId }).subscribe(
        response => {
          console.log('Like status updated successfully', response);
          post.liked = true;
        },
        error => {
          console.error('Error updating like status', error);
        }
      );
    }
  }


  // toggleFollow(username: string, post: any) {
  //   post.followed = !post.followed;
  //   if (post.followed) {
  //     this.followUser(username);
  //   } else {
  //     this.unfollowUser(username);
  //   }
  // }

  //  followUser(username: string) {
  //   // Implement your follow user logic here
  //   console.log(`Followed user: ${username}`);
  // }

  // unfollowUser(username: string) {
  //   // Implement your unfollow user logic here
  //   console.log(`Unfollowed user: ${username}`);
  // }
  
}
