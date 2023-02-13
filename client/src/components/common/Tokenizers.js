// 키워드, 해시태그 토큰화
export const tokenize = (inputString) => {
  let tokens = inputString.split(" ");  // 공백 기준 토큰화

  let localKeyword = "";  // 키워드
  let localHashTags = [];  // 해시태그 리스트

  // 소문자로 변환하여 해시태그 통일
  tokens.forEach(element => {
    if (element !== "") {  // 빈칸 건너뛰기
      if (element.startsWith("#")) {  // 해시태그 처리
        element = element.toLowerCase();  // 소문자로 변환하여 해시태그 통일
        localHashTags.push(element);  // 해시태그 리스트에 추가
      } else {  // 키워드 처리
        if (localKeyword.length !== 0) {  // 앞에 단어가 있을 경우 띄어쓰기 부착
          localKeyword += " ";
        }
        localKeyword += element;  // 키워드 연장
      }
    }
  });

  return [localKeyword, localHashTags];
};