import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostserviceService } from 'src/app/services/postservice.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit{
  
    postData:any 
  constructor(private http:HttpClient , private route:Router , private activeRoute: ActivatedRoute ,
    private postService : PostserviceService , private formbuilder : FormBuilder , private reaction : ReactionService){}

    commentform:FormGroup = this.formbuilder.group({
      comment : ['',[Validators.required]]
    })

    submitcomment(){
      if(this.commentform.invalid){
        return
      }
      console.log(this.commentform.value);
      this.reaction.commentPost(this.postData._id ,this.commentform.value ).subscribe(response =>{
      console.log(response);
      this.postData.comments.push(response);
      this.commentform.reset();
      })
    }


  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.getpostData(id).subscribe(response =>{
      this.postData = response
      console.log(response);
    })
  }

  userProfile(username:any){
    console.log(username);
    this.route.navigate([`profile/${username}`])
  }

}
