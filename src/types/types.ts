export type Cookies = {
  accessToken?: string;
  refreshToken?: string;
};

export type LoginUser = {
  isLogin: boolean;
  userId: string;
  email: string;
  profileId: string;
  profileName: string;
  profileImage: string;
  profileText: string;
  telephoneNumber: string;
  isCollegeStudent: boolean;
  schoolName: string;
  genderId: string;
  genderName: string;
  addressId: string;
  addressName: string;
  age: number;
  undergraduate: string;
  department: string;
  clubActivities: string;
  admissionFormat: string;
  favoriteSubject: string;
  wantHear: string;
  problem: string;
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
