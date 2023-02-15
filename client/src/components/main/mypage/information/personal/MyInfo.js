import { useEffect, useState } from "react";
import styled from "styled-components";
import ModifyButton from "./ModifyButton";
import MyCategoryForm from "./MyCategoryForm";
import MyInfoData from "./MyInfoData";
import MyInputForm from "./MyInputForm";
import MyPageTitle from "../MyPageTitle";
import MyProfileImage from "./MyProfileImage";
import customAxios from "utils/customAxios";

const MyInfoForm = styled.div`
  // 크기 설정
  width: calc( 50% );
  margin: 0 25%;
  padding: 0 0 24px 0;
`;

function MyInfo() {
  const axios = customAxios();

  const [myName, setMyName] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const [myBirthDate, setMyBirthDate] = useState("");
  const [myCategory, setMyCategory] = useState([]);
  const [myProfileImage, setMyProfileImage] = useState("");

  // 데이터 초기화
  useEffect(() => {
    axios.get("/v2/user/get/userinfo")
      .then(({ data }) => {
        // 받아 온 사용자 데이터 삽입
        const body = data?.body;
        setMyName(body?.userName);
        setMyNickname(body?.userNickname);
        setMyBirthDate(body?.userAge);  // Response DTO에 없어서 우선 나이로 대체
        setMyCategory(body?.categories);
        setMyProfileImage(body?.user_photo);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  return (<>
    <MyPageTitle text="내 정보" />
    <MyInfoForm>
      <MyInfoData dataName="이름" content={
        <MyInputForm
          value={myName}
          setValue={setMyName}
        />
      } />
      <MyInfoData dataName="닉네임" content={
        <MyInputForm
          value={myNickname}
          setValue={setMyNickname}
        />
      } />
      <MyInfoData dataName="생년월일" content={
        <MyInputForm
          value={myBirthDate}
          setValue={setMyBirthDate}
        />
      } />
      <MyInfoData dataName="관심 카테고리" content={
        <MyCategoryForm
          myCategory={myCategory}
          setMyCategory={setMyCategory}
        />
      } />
      <MyInfoData dataName="프로필 사진" content={<>
        <MyProfileImage src={myProfileImage} setSrc={setMyProfileImage} />
      </>
      } />
      <ModifyButton onClick={() => { console.log("Mod"); }} />
    </MyInfoForm>
  </>);
}

export default MyInfo;