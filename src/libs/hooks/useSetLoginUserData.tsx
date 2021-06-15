import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useGetLoginUserLazyQuery } from "src/apollo/schema";

export const useSetLoginUserData = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const [getLoginUserLazyQuery, { data: queryData }] = useGetLoginUserLazyQuery({
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (!loginUserData.isLogin) {
      loginUserVar({
        isLogin: queryData ? true : false,
        userId: queryData?.loginUser?.id ? queryData.loginUser.id : "",
        email: queryData?.loginUser?.email ? queryData.loginUser.email : "",
        profileId: queryData?.loginUser?.targetUser?.id ? queryData.loginUser?.targetUser?.id : "",
        profileName: queryData?.loginUser?.targetUser?.profileName
          ? queryData?.loginUser?.targetUser?.profileName
          : "",
        profileImage: queryData?.loginUser?.targetUser?.profileImage
          ? queryData.loginUser.targetUser?.profileImage
          : "",
        profileText: queryData?.loginUser?.targetUser?.profileText
          ? queryData.loginUser.targetUser?.profileText
          : "",
        telephoneNumber: queryData?.loginUser?.targetUser?.telephoneNumber
          ? queryData.loginUser.targetUser.telephoneNumber
          : "",
        isCollegeStudent: queryData?.loginUser?.targetUser?.isCollegeStudent ? true : false,
        schoolName: queryData?.loginUser?.targetUser?.schoolName
          ? queryData.loginUser.targetUser?.schoolName
          : "",
        genderId: queryData?.loginUser?.targetUser?.selectedGender.id
          ? queryData.loginUser.targetUser.selectedGender.id
          : "",
        genderName: queryData?.loginUser?.targetUser?.selectedGender.genderName
          ? queryData.loginUser.targetUser?.selectedGender.genderName
          : "",
        addressId: queryData?.loginUser?.targetUser?.selectedAddress.id
          ? queryData.loginUser.targetUser.selectedAddress.id
          : "",
        addressName: queryData?.loginUser?.targetUser?.selectedAddress.addressName
          ? queryData.loginUser.targetUser?.selectedAddress.addressName
          : "",
        age: queryData?.loginUser?.targetUser?.age ? queryData.loginUser.targetUser?.age : 0,
        undergraduate: queryData?.loginUser?.targetUser?.undergraduate
          ? queryData.loginUser.targetUser?.undergraduate
          : "",
        department: queryData?.loginUser?.targetUser?.department
          ? queryData.loginUser.targetUser?.department
          : "",
        clubActivities: queryData?.loginUser?.targetUser?.clubActivities
          ? queryData.loginUser.targetUser?.clubActivities
          : "",
        admissionFormat: queryData?.loginUser?.targetUser?.admissionFormat
          ? queryData.loginUser.targetUser?.admissionFormat
          : "",
        favoriteSubject: queryData?.loginUser?.targetUser?.favoriteSubject
          ? queryData.loginUser.targetUser?.favoriteSubject
          : "",
        wantHear: queryData?.loginUser?.targetUser?.wantHear
          ? queryData.loginUser.targetUser?.wantHear
          : "",
        problem: queryData?.loginUser?.targetUser?.problem
          ? queryData.loginUser.targetUser?.problem
          : "",
        tags: queryData?.loginUser?.targetUser?.tags.edges
          ? queryData.loginUser?.targetUser?.tags.edges.map((tag) => {
              return tag?.node?.tagName ? tag?.node?.tagName : "";
            })
          : [],
        followingUsers: queryData?.loginUser?.targetUser?.followingUsers
          ? queryData.loginUser?.targetUser?.followingUsers.edges.map((followingUser) => {
              return {
                followingId: followingUser?.node?.id ? followingUser?.node?.id : "",
                followingName: followingUser?.node?.targetUser?.profileName
                  ? followingUser?.node?.targetUser?.profileName
                  : "",
                followingImage: followingUser?.node?.targetUser?.profileImage
                  ? followingUser?.node?.targetUser?.profileImage
                  : "",
              };
            })
          : [],
        joinTalkRooms: queryData?.loginUser?.joinUsers
          ? queryData.loginUser.joinUsers.edges.map((user) => {
              return user?.node?.id ? user.node.id : "";
            })
          : [],
      });

      getLoginUserLazyQuery();
      console.log(queryData?.loginUser?.provider.edges);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);
  return { loginUserData };
};
