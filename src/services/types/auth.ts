export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData{
    username:string,
    email :string
}

export interface AutheticationUser{
    id:number,
    username:string,
    email:string
}

export interface AuthResponse{
    message:string,
    user:AutheticationUser
}