import { InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import type { LoginUser } from "src/types/types";

export const cache = new InMemoryCache();

export const initialLoginUserVar: LoginUser = {
  isLogin: false,
  userId: "",
  email: "",
  profileId: "",
  profileName: "",
  profileImage: "",
  profileText: "",
  telephoneNumber: "",
  isCollegeStudent: false,
  schoolName: "",
  genderId: "",
  genderName: "",
  addressId: "",
  addressName: "",
  age: 0,
  undergraduate: "",
  department: "",
  clubActivities: "",
  admissionFormat: "",
  favoriteSubject: "",
  wantHear: "",
  problem: "",
  tags: [],
  sendMessages: [
    {
      distinationId: "",
      text: "",
      createdAt: "",
    },
  ],
  followingUsers: [],
};
export const loginUserVar = makeVar<LoginUser>(initialLoginUserVar);
