// Link to로 페이지 이동 시 이전 페이지의 스크롤 위치가 그대로 유지되는 현상이 있음
// 따라서 새로운 페이지로 이동하여 렌더링 될 때마다 스크롤 위치를 상단으로 옮겨주기
// + 페이지를 이동해도 토글 된 메뉴가 안 사라지는 현상이 있는데, 이 컴포넌트에서 토글 메뉴 숨기기도 같이 처리
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { showToggleMenuState } from "stores/atoms";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const setShowToggleMenu = useSetRecoilState(showToggleMenuState);

  useEffect(() => {
    setShowToggleMenu(false);
    window.scrollTo(0, 0);
  }, [pathname, setShowToggleMenu]);

  return null;
};