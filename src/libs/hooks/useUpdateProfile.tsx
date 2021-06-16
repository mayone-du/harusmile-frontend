import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { loginUserVar } from "src/apollo/cache";
import { useCreateProfileMutation, useUpdateProfileMutation } from "src/apollo/schema";
import { useRefreshTokens } from "src/libs/hooks/useRefreshTokens";

export const useProfileUpdate = () => {
  const loginUserData = useReactiveVar(loginUserVar);
  const { handleRefreshToken } = useRefreshTokens();

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
  const handleProfileTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  // 住んでる県,性別,学生のselectタグ用イベントハンドラ
  const handleAddressBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, addressId: e.target.value });
  };
  const handleGenderBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({ ...inputLoginUserData, genderId: e.target.value });
  };
  const handleStudentBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputLoginUserData({
      ...inputLoginUserData,
      isCollegeStudent: e.target.value === "true" ? true : false,
    });
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
      await handleRefreshToken();

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
          data?.createProfile?.profile &&
            loginUserVar({
              ...loginUserData,
              profileName: data.createProfile.profile.profileName,
              profileText: data.createProfile.profile.profileText,
              isCollegeStudent: data.createProfile.profile.isCollegeStudent,
              schoolName: data.createProfile.profile.schoolName,
              age: data.createProfile.profile.age ? data.createProfile.profile.age : 0,
              telephoneNumber: data.createProfile.profile.telephoneNumber,
              genderId: data.createProfile.profile.selectedGender.id,
              genderName: data.createProfile.profile.selectedGender.genderName,
              addressId: data.createProfile.profile.selectedAddress.id,
              addressName: data.createProfile.profile.selectedAddress.addressName,
              undergraduate: data.createProfile.profile.undergraduate
                ? data.createProfile.profile.undergraduate
                : "",
              department: data.createProfile.profile.department
                ? data.createProfile.profile.department
                : "",
              clubActivities: data.createProfile.profile.clubActivities
                ? data.createProfile.profile.clubActivities
                : "",
              admissionFormat: data.createProfile.profile.admissionFormat
                ? data.createProfile.profile.admissionFormat
                : "",
              favoriteSubject: data.createProfile.profile.favoriteSubject
                ? data.createProfile.profile.favoriteSubject
                : "",
              wantHear: data.createProfile.profile.wantHear
                ? data.createProfile.profile.wantHear
                : "",
              problem: data.createProfile.profile.problem ? data.createProfile.profile.problem : "",
              profileImage: data.createProfile.profile.profileImage
                ? data.createProfile.profile.profileImage
                : "",
            });
          alert("プロフィールの更新が完了しました。");

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
        data?.updateProfile?.profile &&
          loginUserVar({
            ...loginUserData,
            profileName: data.updateProfile.profile.profileName,
            profileText: data.updateProfile.profile.profileText,
            isCollegeStudent: data.updateProfile.profile.isCollegeStudent,
            schoolName: data.updateProfile.profile.schoolName,
            age: data.updateProfile.profile.age ? data.updateProfile.profile.age : 0,
            telephoneNumber: data.updateProfile.profile.telephoneNumber,
            addressId: data.updateProfile.profile.selectedAddress.id,
            addressName: data.updateProfile.profile.selectedAddress.addressName,
            genderName: data.updateProfile.profile.selectedGender.genderName,
            genderId: data.updateProfile.profile.selectedGender.id,
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
            wantHear: data.updateProfile.profile.wantHear
              ? data.updateProfile.profile.wantHear
              : "",
            problem: data.updateProfile.profile.problem ? data.updateProfile.profile.problem : "",
            profileImage: data.updateProfile.profile.profileImage
              ? data.updateProfile.profile.profileImage
              : "",
          });
        alert("プロフィールの更新が完了しました。");
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
    handleStudentBlur,
    handleProfileImageChange,
    handleSubmit,
  };
};
