import { useReactiveVar } from "@apollo/client";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import {
  useCreateProfileMutation,
  useRefreshTokensMutation,
  useRevokeRefreshTokenMutation,
  useUpdateProfileMutation,
} from "src/apollo/schema";
import { calcDate } from "src/libs/calcDate";

export const useProfileUpdate = () => {
  const loginUserData = useReactiveVar(loginUserVar);

  const [refreshTokensMutation] = useRefreshTokensMutation();
  const [revokerefreshTokenMutation] = useRevokeRefreshTokenMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [createProfileMutation] = useCreateProfileMutation();
  const [inputLoginUserData, setInputLoginUserData] = useState(loginUserData);
  useEffect(() => {
    setInputLoginUserData({
      ...loginUserData,
    });
  }, [loginUserData]);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // 各項目ごとのイベントハンドラ
  const handleProfileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileName: e.target.value });
  };
  const handleProfileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileText: e.target.value });
  };
  const handleTelephoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, telephoneNumber: e.target.value });
  };
  const handleSchoolNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, schoolName: e.target.value });
  };
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, age: parseFloat(e.target.value) });
  };
  const handleUndergraduateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, undergraduate: e.target.value });
  };
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, department: e.target.value });
  };
  const handleClubActivitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, clubActivities: e.target.value });
  };
  const handleAdmissionFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, admissionFormat: e.target.value });
  };
  const handleFavoriteSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, favoriteSubject: e.target.value });
  };
  const handleWantHearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, wantHear: e.target.value });
  };
  const handleProblemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, problem: e.target.value });
  };

  // 住んでる県と性別のselectタグ用イベントハンドラ
  const handleAddressBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, addressName: e.target.value });
  };
  const handleGenderBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, genderName: e.target.value });
  };
  // プロフ画像のイベントハンドラ
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfileImageFile(e.target.files[0]);
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
        if (data?.refreshToken) {
          const oldRefreshToken = cookies.refreshToken;

          // accessTokenをセット
          setCookie(null, "accessToken", data.refreshToken.token, {
            path: "/",
            maxAge: calcDate(data?.refreshToken?.payload.exp),
          });

          // refreshTokenをセット
          setCookie(null, "refreshToken", data?.refreshToken?.refreshToken, {
            path: "/",
            maxAge: calcDate(data?.refreshToken?.refreshExpiresIn),
          });

          // 古いrefreshTokenを無効化
          await revokerefreshTokenMutation({
            variables: { refreshToken: oldRefreshToken },
          });
        }
      }

      if (loginUserData.isLogin && loginUserData.profileId === "") {
        // Userは作成したが、Profileをまだ作成していない場合
        try {
          const { data } = await createProfileMutation({
            variables: {
              profileName: inputLoginUserData.profileName,
              profileText: inputLoginUserData.profileText,
              isCollegeStudent: inputLoginUserData.isCollegeStudent,
              schoolName: inputLoginUserData.schoolName,
              age: inputLoginUserData.age,
              telephoneNumber: inputLoginUserData.telephoneNumber,
              selectedGender: inputLoginUserData.genderName,
              selectedAddress: inputLoginUserData.addressName,
              undergraduate: inputLoginUserData.undergraduate,
              department: inputLoginUserData.department,
              clubActivities: inputLoginUserData.clubActivities,
              admissionFormat: inputLoginUserData.admissionFormat,
              favoriteSubject: inputLoginUserData.favoriteSubject,
              wantHear: inputLoginUserData.wantHear,
              problem: inputLoginUserData.problem,
              profileImage: profileImageFile,
            },
          });
          alert("Success! : " + data?.createProfile?.profile?.profileName);
          // TODO: ログインユーザーのステートreactiveVarの更新;
        } catch (error) {
          alert(error);
          return;
        }
      } else {
        const { data } = await updateProfileMutation({
          variables: {
            id: inputLoginUserData.profileId,
            profileName: inputLoginUserData.profileName,
            profileText: inputLoginUserData.profileText,
            isCollegeStudent: inputLoginUserData.isCollegeStudent,
            schoolName: inputLoginUserData.schoolName,
            age: inputLoginUserData.age,
            telephoneNumber: inputLoginUserData.telephoneNumber,
            selectedGender: inputLoginUserData.genderId,
            selectedAddress: inputLoginUserData.addressId,
            undergraduate: inputLoginUserData.undergraduate,
            department: inputLoginUserData.department,
            clubActivities: inputLoginUserData.clubActivities,
            admissionFormat: inputLoginUserData.admissionFormat,
            favoriteSubject: inputLoginUserData.favoriteSubject,
            wantHear: inputLoginUserData.wantHear,
            problem: inputLoginUserData.problem,
            profileImage: profileImageFile,
          },
        });
        alert("update success! : " + data?.updateProfile?.profile?.profileName);
      }
    } catch (error) {
      alert(error);
      return;
    }
  };

  return {
    inputLoginUserData,
    handleProfileNameChange,
    handleProfileTextChange,
    handleAgeChange,
    handleSchoolNameChange,
    handleTelephoneNumberChange,
    handleUndergraduateChange,
    handleAdmissionFormatChange,
    handleDepartmentChange,
    handleClubActivitiesChange,
    handleFavoriteSubjectChange,
    handleProblemChange,
    handleWantHearChange,
    handleAddressBlur,
    handleGenderBlur,
    handleProfileImageChange,
    handleSubmit,
  };
};
