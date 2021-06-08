export type Cookies = {
  accessToken?: string;
  refreshToken?: string;
};

export type User = {
  isLogin: boolean;
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
  age: number;
  undergraduate: string;
  department: string;
  clubActivities: string;
  admissionFormat: string;
  favoriteSubject: string;
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
