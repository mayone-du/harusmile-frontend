import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useUpdateProfileMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

export const useProfileUpdate = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const { handleRefreshToken } = useRefreshTokens();

  const [updateProfileMutation] = useUpdateProfileMutation();
  const [inputLoginUserData, setInputLoginUserData] = useState(loginUserData);
  useEffect(() => {
    setInputLoginUserData({
      ...loginUserData,
    });
  }, [loginUserData]);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  // 各項目ごとのイベントハンドラ
  const handleProfileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileName: event.target.value });
  };
  const handleProfileTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, profileText: event.target.value });
  };
  const handleTelephoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, telephoneNumber: event.target.value });
  };
  const handleSchoolNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, schoolName: event.target.value });
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, age: parseFloat(event.target.value) });
  };
  const handleUndergraduateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, undergraduate: event.target.value });
  };
  const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, department: event.target.value });
  };
  const handleClubActivitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, clubActivities: event.target.value });
  };
  const handleAdmissionFormatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, admissionFormat: event.target.value });
  };
  const handleFavoriteSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, favoriteSubject: event.target.value });
  };
  const handleWantHearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, wantHear: event.target.value });
  };
  const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, problem: event.target.value });
  };

  // 住んでる県,性別,学生のselectタグ用イベントハンドラ
  const handleAddressBlur = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, addressId: event.target.value });
  };
  const handleGenderBlur = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, genderId: event.target.value });
  };
  const handleStudentBlur = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({
      ...inputLoginUserData,
      isCollegeStudent: event.target.value === "true" ? true : false,
    });
  };
  // プロフ画像のイベントハンドラ
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setProfileImageFile(event.target.files[0]);
  };

  // 送信用関数
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // エラーチェック
    if (inputLoginUserData.addressId === "" || inputLoginUserData.genderId === "") {
      alert("住所と性別は必須です。");
      return;
    }
    try {
      // tokenの確認と更新
      await handleRefreshToken();
      // profileの更新
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
      data?.updateProfile?.profile &&
        loginUserVar({
          ...loginUserData,
          isLoading: false,
          profileName: data.updateProfile.profile.profileName,
          profileText: data.updateProfile.profile.profileText
            ? data.updateProfile.profile.profileText
            : "",
          isCollegeStudent: data.updateProfile.profile.isCollegeStudent,
          schoolName: data.updateProfile.profile.schoolName
            ? data.updateProfile.profile.schoolName
            : "",
          age: data.updateProfile.profile.age ? data.updateProfile.profile.age : 0,
          telephoneNumber: data.updateProfile.profile.telephoneNumber
            ? data.updateProfile.profile.telephoneNumber
            : "",
          addressId: data.updateProfile.profile.selectedAddress?.id
            ? data.updateProfile.profile.selectedAddress.id
            : "",
          addressName: data.updateProfile.profile.selectedAddress?.addressName
            ? data.updateProfile.profile.selectedAddress?.addressName
            : "",
          genderName: data.updateProfile.profile.selectedGender?.genderName
            ? data.updateProfile.profile.selectedGender.genderName
            : "",
          genderId: data.updateProfile.profile.selectedGender?.id
            ? data.updateProfile.profile.selectedGender.id
            : "",
          undergraduate: data.updateProfile.profile.undergraduate
            ? data.updateProfile.profile.undergraduate
            : "",
          department: data.updateProfile.profile.department
            ? data.updateProfile.profile.department
            : "",
          clubActivities: data.updateProfile.profile.clubActivities
            ? data.updateProfile.profile.clubActivities
            : "",
          admissionFormat: data.updateProfile.profile.admissionFormat
            ? data.updateProfile.profile.admissionFormat
            : "",
          favoriteSubject: data.updateProfile.profile.favoriteSubject
            ? data.updateProfile.profile.favoriteSubject
            : "",
          wantHear: data.updateProfile.profile.wantHear ? data.updateProfile.profile.wantHear : "",
          problem: data.updateProfile.profile.problem ? data.updateProfile.profile.problem : "",
          profileImage: data.updateProfile.profile.profileImage
            ? data.updateProfile.profile.profileImage
            : "",
        });
      alert("プロフィールの更新が完了しました。");
      // }
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
    handleStudentBlur,
    handleProfileImageChange,
    handleSubmit,
  };
};
