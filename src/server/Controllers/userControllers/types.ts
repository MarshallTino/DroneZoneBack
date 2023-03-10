export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterUserCredentials extends UserCredentials {
  username: string;
}
