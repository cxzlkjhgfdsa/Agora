import Thumbnail from "components/debate/list/Thumbnail";
import { Fragment } from "react";

function TestPage() {
  const hotContents = [{
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
    // {
    //   "room_id": 113,
    //   "room_name": "98번",
    //   "room_creater_name": "98작성자",
    //   "room_debate_type": "FORMAL",
    //   "room_opinion_left": "leftopinon",
    //   "room_opinion_right": "rightopinion",
    //   "room_hashtags": "#8,#118",
    //   "room_watch_cnt": 108,
    //   "room_phase": 3,
    //   "room_phase_current_time_minute": 0,
    //   "room_phase_current_time_second": 41,
    //   "room_start_time": "2023-01-31T14:30:47.508474",
    //   "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    //   "room_category": "8번",
    //   "room_state": false,
    //   "left_user_list": [
    //       "테스트닉",
    //       "테스트닉"
    //   ],
    //   "right_user_list": []
    // }
  ];
  const normalContents = [
    // {
    //   "room_id": 112,
    //   "room_name": "97번",
    //   "room_creater_name": "97작성자",
    //   "room_debate_type": "SHORT",
    //   "room_opinion_left": "leftopinon",
    //   "room_opinion_right": "rightopinion",
    //   "room_hashtags": "#7,#117",
    //   "room_watch_cnt": 107,
    //   "room_phase": 2,
    //   "room_phase_current_time_minute": 0,
    //   "room_phase_current_time_second": 32,
    //   "room_start_time": "2023-01-31T14:30:47.506263",
    //   "room_thumbnail_url": "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
    //   "room_category": "7번",
    //   "room_state": false,
    //   "left_user_list": [],
    //   "right_user_list": [
    //     "테스트닉",
    //     "테스트닉"
    //   ]
    // },
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
      {hotContents.map((item, index) => (
        <Fragment key={item + index}>
          <Thumbnail type="hot-thumbnail" content={item} />
          <br />
        </Fragment>
      ))}
      {normalContents.map((item, index) => (
        <Fragment key={item + index}>
          <Thumbnail content={item} />
          <br />
        </Fragment>
      ))}
    </>
  );
}

export default TestPage;