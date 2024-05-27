export interface SavedPost {
    _id: string;
    image: string;
    title: string;
    user: string;
    description: string;
    topic: string;
    comments: any[];
    like: string[];
    __v: number;
  }

  export interface follower{
    _id:string,
    __v: number;
  }
  export interface following{
    _id:string,
    __v: number;
  }
  
  export interface ProfileResponse {
    _id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    posts: string[];
    savedpost: SavedPost[];
    follower:follower[]
    following : following[]
    __v: number;
  }
  