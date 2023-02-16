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

  const [initData, setInitData] = useState({userName: "", userNickname: "", userAge: "", categories: [], user_photo: ""});
  const [myName, setMyName] = useState("");
  const [myNickname, setMyNickname] = useState("");
  const [myBirthDate, setMyBirthDate] = useState("");
  const [myCategory, setMyCategory] = useState([]);
  const [myNumCategory, setMyNumCategory] = useState([]);
  const [myProfileImage, setMyProfileImage] = useState("");
  const [myProfileImageName, setMyProfileImageName] = useState("");
  const [myProfileImageFile, setMyProfileImageFile] = useState(null);

  // 데이터 초기화
  useEffect(() => {
    axios.get("/v2/user/get/userinfo")
      .then(({ data }) => {
        if (data?.state !== true) {
          throw new Error("사용자 정보 불러오기 실패");
        }
        // 받아 온 사용자 데이터 삽입
        const body = data?.body;
        setInitData(body);
        setMyName(body?.userName);
        setMyNickname(body?.userNickname);
        setMyBirthDate(body?.userAge);
        setMyCategory(body?.categories);
        setMyProfileImage(body?.user_photo);
        setMyProfileImageName(body?.user_photo_name);
      }).catch(error => {
        console.warn(error);
      });
  }, []);

  const modify = async () => {
    // 관심 카테고리 변경 확인
    const initCategories = initData.categories.sort();
    const equalsCategory = (JSON.stringify(initCategories) === JSON.stringify(myCategory.sort()));
    
    // 프로필 이미지 변경 확인
    const equalsProfileImage = (initData.user_photo === myProfileImage);
    
    // 변경사항 없을 경우 변경 이벤트 종료
    if (equalsCategory && equalsProfileImage) {
      return;
    }

    // 변경 POST 요청 데이터
    const postData = {
      user_photo: null,
      user_photo_name: null,
      categories: null
    };

    // 프로필 이미지 등록 Request - FormData 생성
    if (!equalsProfileImage) {
      const formData = new FormData();
      formData.append("files", myProfileImageFile);
      
      await axios.post(
        "/v2/file/save/roomthumbnail",
        formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(({ data }) => {
        if (data.state !== true) {
          throw new Error("사진 등록에 실패했습니다.");
        }
        postData.user_photo = data.body[0].fileUrl;
        postData.user_photo_name = myProfileImageName;
      }).catch(error => {
        alert(error);
      });
    }

    // 카테고리 수정
    if (!equalsCategory) {
      postData.categories = myNumCategory.sort();
    }
    
    // 변경 POST 요청
    await axios.post(
      "/v2/user/edit/userinfo",
      postData,
      null
    ).then(({ data }) => {
      if (data.state !== true) {
        throw new Error("변경에 실패했습니다.");
      }
      alert("변경이 완료되었습니다.");
    }).catch(error => {
      alert(error);
    });

  };

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
          setMyNumCategory={setMyNumCategory}
        />
      } />
      <MyInfoData dataName="프로필 사진" content={<>
        <MyProfileImage
          src={myProfileImage}
          setSrc={setMyProfileImage}
          setImgName={setMyProfileImageName}
          setImgFile={setMyProfileImageFile}
        />
      </>
      } />
      <ModifyButton onClick={modify} />
    </MyInfoForm>
  </>);
}

export default MyInfo;