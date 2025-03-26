export default interface LoginResponse {
  user: UserInfo;
  token: string;
}

interface UserInfo {
  id: Number;
  name: string;
  email: string;
}
