import { useReactiveVar } from "@apollo/client";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useRefreshTokensMutation, useUpdateProfileMutation } from "src/apollo/schema";
import { calcDate } from "src/libs/calcDate";

export const useProfileUpdate = () => {
  const loginUserData = useReactiveVar(loginUserVar);

  const [refreshTokensMutation] = useRefreshTokensMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [inputLoginUserData, setInputLoginUserData] = useState(loginUserData);
  useEffect(() => {
    setInputLoginUserData({
      ...loginUserData,
    });
  }, [loginUserData]);

  // 各項目ごとのハンドラ
  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileName: e.target.value });
  };
  const handleProfileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileText: e.target.value });
  };
  const handleWantHearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, wantHear: e.target.value });
  };
  const handleFavoriteSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, favoriteSubject: e.target.value });
  };
  const handleProblemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, problem: e.target.value });
  };

  // 送信用関数
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // tokenの確認と更新
      const cookies = parseCookies();
      if (!cookies.accessToken && cookies.refreshToken) {
        const { data } = await refreshTokensMutation({
          variables: {
            refreshToken: cookies.refreshToken,
          },
        });
        data?.refreshToken &&
          setCookie(null, "accessToken", data.refreshToken.token, {
            path: "/",
            maxAge: calcDate(data?.refreshToken?.payload.exp),
          });
      }

      const { data } = await updateProfileMutation({
        variables: {
          id: inputLoginUserData.profileId,
          profileName: inputLoginUserData.profileName,
          profileText: inputLoginUserData.profileText,
          isCollegeStudent: inputLoginUserData.isCollegeStudent,
          schoolName: inputLoginUserData.schoolName,
          age: inputLoginUserData.age,
          telephoneNumber: inputLoginUserData.telephoneNumber,
          // selectedGender: inputLoginUserData.genderName,
          selectedGender: "QWRkcmVzc05vZGU6Mg==",
          // selectedAddress: inputLoginUserData.addressName,
          selectedAddress: "R2VuZGVyTm9kZTox",
          undergraduate: inputLoginUserData.undergraduate,
          department: inputLoginUserData.department,
          clubActivities: inputLoginUserData.clubActivities,
          admissionFormat: inputLoginUserData.admissionFormat,
          favoriteSubject: inputLoginUserData.favoriteSubject,
          wantHear: inputLoginUserData.wantHear,
          problem: inputLoginUserData.problem,
        },
      });
      alert("update success! : " + data?.updateProfile?.profile?.profileName);
    } catch (error) {
      alert(error);
      return;
    }
  };

  return {
    inputLoginUserData,
    handleProfileNameChange,
    handleProfileTextChange,
    handleFavoriteSubjectChange,
    handleProblemChange,
    handleWantHearChange,
    handleSubmit,
  };
};
