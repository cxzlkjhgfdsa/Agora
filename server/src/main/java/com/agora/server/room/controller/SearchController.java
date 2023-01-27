package com.agora.server.room.controller;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.room.controller.dto.RequestRoomCategoryDto;
import com.agora.server.room.controller.dto.ResponseRoomInfoDto;
import com.agora.server.room.controller.dto.RoomSearchCondition;
import com.agora.server.room.service.RoomService;
import com.agora.server.user.domain.User;
import com.agora.server.user.dto.LoginDTO;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final RoomService roomService;

    private final UserRepository userRepository;

    @GetMapping("search/main/hot5")
    public ResponseEntity<ResponseDTO> searchHot5(){
        List<ResponseRoomInfoDto> hot5 = roomService.searchHot5();

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(hot5);
        responseDTO.setMessage("화제의 토론 Top5 리스트입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("search/main/topInprogress")
    public ResponseEntity<ResponseDTO> topInprogress(){
        List<ResponseRoomInfoDto> topInprogress = roomService.topInprogress();

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(topInprogress);
        responseDTO.setMessage("열띤 토론중 리스트입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("search/main/topReadystate")
    public ResponseEntity<ResponseDTO> topReadystate(){
        List<ResponseRoomInfoDto> topReadystate = roomService.topReadystate();

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(topReadystate);
        responseDTO.setMessage("토론준비중 리스트입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("search/main/topCategory")
    public ResponseEntity<ResponseDTO> searchTopCategory(
            RequestRoomCategoryDto requestUser){

        User user = userRepository.findUserByUser_idAndUser_social_type(requestUser.getUserId(), requestUser.getSocialType());
        List<String> categories = new ArrayList<>();

        List<UserCategory> userCategories = user.getCategories();
        for (UserCategory userCategory : userCategories) {
            categories.add(userCategory.getCategory().getCategory_name());
        }

        List<ResponseRoomInfoDto> topCategory = roomService.searchTopCategory(categories);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(topCategory);
        responseDTO.setMessage("나의 취향 TOP5입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

    @GetMapping("search/dropdown")
    public ResponseEntity<ResponseDTO> searchDropdown(
            RoomSearchCondition condition) {

        Map<String,List<ResponseRoomInfoDto>> searchMap = roomService.searchDropdown(condition);

        ResponseDTO responseDTO = new ResponseDTO();
        responseDTO.setBody(searchMap);
        responseDTO.setMessage("드랍다운 맵입니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return new ResponseEntity<>(responseDTO, HttpStatus.ACCEPTED);
    }

}
