import { useEffect, useState } from "react";
import styled from "styled-components";
import ModifyButton from "./ModifyButton";
import MyCategoryForm from "./MyCategoryForm";
import MyInfoData from "./MyInfoData";
import MyInputForm from "./MyInputForm";
import MyPageTitle from "../MyPageTitle";
import MyProfileImage from "./MyProfileImage";

const MyInfoForm = styled.div`
  // 크기 설정
  width: calc( 50% );
  margin: 0 25%;
  padding: 0 0 24px 0;
`;

function MyInfo() {
  const [myName, setMyName] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const [myBirthDate, setMyBirthDate] = useState("");
  const [myCategory, setMyCategory] = useState([]);
  const [myProfileImage, setMyProfileImage] = useState("");

  // 데이터 초기화
  useEffect(() => {
    setMyName("윤재휘");
    setMyNickname("HwiHwi");
    setMyBirthDate("1997.05.23");
    setMyCategory(["음식", "게임", "IT/전자제품"]);
    setMyProfileImage("https://mblogthumb-phinf.pstatic.net/MjAyMjA2MDRfNTAg/MDAxNjU0MzE3MDMwODM5.czPSBA70E_2mQUlehiSL-Q4VcyZRYmVv4pas8fTprOMg.OHBALOHgTnreloKx2iQF5-W0e5slciz9FeeW7Lrx0bkg.JPEG.gwmfruckwrl/220604-Chaewon-Instagram-1.jpeg?type=w800");
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