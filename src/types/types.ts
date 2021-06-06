export type Cookies = {
  accessToken?: string;
  refreshToken?: string;
};

export type User = {
  userId: string;
  email: string;
  profileId: string;
  profileName: string;
  profileImage: string;
  profileText: string;
  telephoneNumber: number;
  isCollegeStudent: boolean;
  schoolName: string;
  genderName: string;
  addressName: string;
  isLogin: boolean;
  tags: string[];
  sendMessages: {
    distinationId: string;
    text: string;
    createdAt: string;
  }[];
  followingUsers: {
    followingId: string;
    followingName: string;
    followingImage: string;
  }[];
};
