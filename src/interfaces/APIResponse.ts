import LoginResponse from './LoginResponse';

export default interface APIResponse {
  success: Boolean;
  message: string;
  data?: LoginResponse | Object;
}
