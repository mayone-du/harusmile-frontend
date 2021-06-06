import { InMemoryCache } from "@apollo/client";
import { makeVar } from "@apollo/client";
import type { User } from "src/types/types";

export const cache = new InMemoryCache();

export const loginUserVar = makeVar<User>({
  userId: "",
  email: "",
  profileId: "",
  profileName: "",
  profileImage: "",
  profileText: "",
  telephoneNumber: 0,
  isCollegeStudent: false,
  schoolName: "",
  genderName: "",
  addressName: "",
  isLogin: false,
  tags: [],
  sendMessages: [
    {
      distinationId: "",
      text: "",
      createdAt: "",
    },
  ],
  followingUsers: [],
});
