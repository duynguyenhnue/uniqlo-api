export class UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  bio?: string;
  location?: string;
  interests: string[];
  createdAt: Date;
  updatedAt: Date;
}
