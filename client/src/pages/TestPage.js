import Thumbnail from "components/debate/list/Thumbnail";
import { Fragment } from "react";

function TestPage() {
  const hotContents = [
    {
      "room_id": 114,
      "room_name": "99번",
      "room_creater_name": "99작성자",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#9,#119",
      "room_watch_cnt": 109,
      "room_phase": 1,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 22,
      "room_start_time": "2023-01-31T14:30:47.509536",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "9번",
      "room_state": true,
      "left_user_list": [],
      "right_user_list": [
          "테스트닉",
          "테스트닉"
      ]
    },
    {
      "room_id": 113,
      "room_name": "98번",
      "room_creater_name": "98작성자",
      "room_debate_type": "FORMAL",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#8,#118",
      "room_watch_cnt": 108,
      "room_phase": 3,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 41,
      "room_start_time": "2023-01-31T14:30:47.508474",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "8번",
      "room_state": false,
      "left_user_list": [
          "테스트닉",
          "테스트닉"
      ],
      "right_user_list": []
    },
    {
      "room_id": 113,
      "room_name": "98번",
      "room_creater_name": "98작성자",
      "room_debate_type": "FORMAL",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#8,#118",
      "room_watch_cnt": 108,
      "room_phase": 3,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 41,
      "room_start_time": "2023-01-31T14:30:47.508474",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "8번",
      "room_state": false,
      "left_user_list": [
          "테스트닉",
          "테스트닉"
      ],
      "right_user_list": []
    },
    {
      "room_id": 113,
      "room_name": "98번",
      "room_creater_name": "98작성자",
      "room_debate_type": "FORMAL",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#8,#118",
      "room_watch_cnt": 108,
      "room_phase": 3,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 41,
      "room_start_time": "2023-01-31T14:30:47.508474",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "8번",
      "room_state": false,
      "left_user_list": [
          "테스트닉",
          "테스트닉"
      ],
      "right_user_list": []
    }
  ];
  const normalContents = [
    {
      "room_id": 112,
      "room_name": "97번",
      "room_creater_name": "97작성자",
      "room_debate_type": "SHORT",
      "room_opinion_left": "leftopinon",
      "room_opinion_right": "rightopinion",
      "room_hashtags": "#7,#117",
      "room_watch_cnt": 107,
      "room_phase": 2,
      "room_phase_current_time_minute": 0,
      "room_phase_current_time_second": 32,
      "room_start_time": "2023-01-31T14:30:47.506263",
      "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
      "room_category": "7번",
      "room_state": false,
      "left_user_list": [],
      "right_user_list": [
        "테스트닉",
        "테스트닉"
      ]
    },
    // {
    //   "room_id": 111,
    //   "room_name": "96번",
    //   "room_creater_name": "96작성자",
    //   "room_debate_type": "FORMAL",
    //   "room_opinion_left": "leftopinon",
    //   "room_opinion_right": "rightopinion",
    //   "room_hashtags": "#6,#116",
    //   "room_watch_cnt": 106,
    //   "room_phase": 1,
    //   "room_phase_current_time_minute": 0,
    //   "room_phase_current_time_second": 52,
    //   "room_start_time": "2023-01-31T14:30:47.505198",
    //   "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    //   "room_category": "6번",
    //   "room_state": true,
    //   "left_user_list": [
    //     "테스트닉",
    //     "테스트닉"
    //   ],
    //   "right_user_list": []
    // },
    // {
    //   "room_id": 110,
    //   "room_name": "95번",
    //   "room_creater_name": "95작성자",
    //   "room_debate_type": "SHORT",
    //   "room_opinion_left": "leftopinon",
    //   "room_opinion_right": "rightopinion",
    //   "room_hashtags": "#5,#115",
    //   "room_watch_cnt": 105,
    //   "room_phase": 3,
    //   "room_phase_current_time_minute": 0,
    //   "room_phase_current_time_second": 2,
    //   "room_start_time": "2023-01-31T14:30:47.503342",
    //   "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    //   "room_category": "5번",
    //   "room_state": false,
    //   "left_user_list": [],
    //   "right_user_list": [
    //     "테스트닉",
    //     "테스트닉"
    //   ]
    // }
  ];

  return (
    <>
      <div style={{width: "calc( 100% - 24px )", justifyContent: "space-between", display: "flex", margin: "12px"}}>
        {hotContents.map((item, index) => (
          index < 3 ? <Thumbnail key={item + index} content={item} type="hot-thumbnail" /> : null
        ))}
      </div>
      <div style={{width: "calc( 100% - 24px )", justifyContent: "space-between", display: "flex", margin: "12px"}}>
        {hotContents.map((item, index) => (
          <Thumbnail key={item + index} content={item} />
        ))}
      </div>
    </>
    // <div style={{ position: "relative", top: "0", left: "0" }}>
    //   <div style={{ position: "absolute", top: "0", left: "0" }}>
    //     <Thumbnail key={"0"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "0", left: "750px" }}>
    //     <Thumbnail key={"1"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "0", right: "0" }}>
    //     <Thumbnail key={"2"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "450px", left: "0" }}>
    //     <Thumbnail key={"3"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "450px", left: "750px" }}>
    //     <Thumbnail key={"4"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "450px", right: "0" }}>
    //     <Thumbnail key={"5"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "900px", left: "0" }}>
    //     <Thumbnail key={"6"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "900px", left: "750px" }}>
    //     <Thumbnail key={"7"} content={normalContents[0]} />
    //   </div>
    //   <div style={{ position: "absolute", top: "900px", right: "0" }}>
    //     <Thumbnail key={"8"} content={normalContents[0]} />
    //   </div>
    //   {/* {hotContents.map((item, index) => (
    //     <Fragment key={item + index}>
    //       <Thumbnail type="hot-thumbnail" content={item} className={"hot-" + cName} />
    //       <br />
    //     </Fragment>
    //   ))}
    //   {normalContents.map((item, index) => (
    //     <Fragment key={item + index}>
    //       <Thumbnail content={item} className={cName} />
    //       <br />
    //     </Fragment>
    //   ))} */}
    // </div>
  );
}

export default TestPage;