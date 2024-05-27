// src/app/models/post.model.ts

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
  }
  
  export interface Post {
    followed: any;
    _id: string;
    image: string;
    title: string;
    user: User;
    description: string;
    topic: string;
    __v: number;
    large?: boolean; 
    liked?: boolean;
  }
  