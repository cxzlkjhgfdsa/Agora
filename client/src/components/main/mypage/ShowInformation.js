import { useRecoilValue } from "recoil";
import { showPageState } from "stores/myPageStates";
import MyDebateHistory from "./information/debateHistory/MyDebateHistory";
import MyInfo from "./information/personal/MyInfo";

function ShowInformation() {
  const showPage = useRecoilValue(showPageState);
  
  if (showPage === "MyInfo") {
    return <MyInfo />;
  } else if (showPage === "MyDebateHistory") {
    return <MyDebateHistory />;
  } else {
    return <h1>No Page</h1>
  }
}

export default ShowInformation;