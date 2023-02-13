import styled from "styled-components";

export const Container = styled.div`
  // 크기 설정
  width: calc( 100% - 16px );
  margin: 8px;
`;

export const CenterDiv = styled.div`
  // 크기 조절
  width: 100%;
  margin: 2% 0 0 0;
  padding: 0;

  // Display
  display: flex;
`;
export const LeftDiv = styled.div`
  // 크기 설정
  width: 50%;
  padding: 0;
  margin: 0;

  // Display
  display: inline-block;
`;

export const RightDiv = LeftDiv;

export const BottomDiv = styled.div`
  // 크기 설정
  width: 100%;
  padding: 0;
  margin: 0;

  // Display
  display: flex;
  justify-content: center;
`;