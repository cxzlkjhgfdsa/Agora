package com.agora.server.user.controller;

import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.category.repository.UserCategoryRepository;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.user.controller.dto.LoginResponseDto;
import com.agora.server.user.controller.dto.RequestJoinDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    private final UserCategoryRepository userCategoryRepository;
    private final JwtTokenProvider tokenProvider;


    /**
     * RequestBody로 회원가입자의 정보를 받아옴
     * 회원가입을 위한 메소드
     *
     * @param requestJoinDto
     * @return 회원가입이 정상적으로 실행되었다는 메세지를 보냄
     */
    @PostMapping("user/join")
    public ResponseDTO userJoin(@RequestBody RequestJoinDto requestJoinDto) throws NoSuchAlgorithmException {
        ResponseDTO responseDTO = new ResponseDTO();

        User DuplicationUser = userService.findUserByPhone(requestJoinDto.getUser_phone());
        if (DuplicationUser != null) {
            responseDTO.setMessage("이미 등록된 회원번호 입니다");
            return responseDTO;
        }
        Encrypt encrypt = Encrypt.createEncrypt(requestJoinDto.getUser_social_id());
        List<Category> categoryList = userService.findById(requestJoinDto.getCategories());


        User joinUser = User.createUser(encrypt, requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
                , requestJoinDto.getUser_name(), requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo());
        User saveUser = userService.join(joinUser); // 1차캐시로 영속성 컨텍스트에 user를 올림
        // 더티 체킹과 변경감지 !! 다시 공부하기

        for(Category category : categoryList) {
            UserCategory userCategory = userCategoryRepository.save(UserCategory.createUserCategory(saveUser, category));
            saveUser.addCategories(userCategory);
        }

        responseDTO.setMessage("회원가입에 성공하셨습니다");
        return responseDTO;
    }

    @PostMapping("check/nickname")
    public ResponseDTO checkNickname(@RequestBody String nickname) {
        ResponseDTO responseDTO = new ResponseDTO();

        User findUser = userService.findUserByNickname(nickname);
        if (findUser == null) {
            responseDTO.setMessage("사용 가능한 닉네임입니다");
            responseDTO.setState(true);
        } else {
            responseDTO.setMessage("이미 사용중인 닉네임입니다");
            responseDTO.setState(false);
        }
        return null;
    }

    /**
     * 로그인 메소드 구현
     *
     * @param user_id
     * @return
     */
    @PostMapping("user/login")
    public ResponseDTO login(@RequestBody UUID user_id) throws NoSuchFieldException {
        ResponseDTO responseDTO = new ResponseDTO();

        Optional<User> Ouser = userRepository.findById(user_id);

        if (Ouser.isPresent()) {
            // 유저 정상적으로 찾았을 시
            User user = Ouser.get();
            String acessToken = tokenProvider.createAccessToken(user.getUser_id(), user.getUser_social_type());

            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setUserId(user.getUser_id());
            loginResponseDto.setUserNickname(user.getUser_nickname());
            loginResponseDto.setUserPhoto(user.getUser_photo());
            loginResponseDto.setSocialType(user.getUser_social_type());
            loginResponseDto.setAccessToken(acessToken);
        } else {
            // 잘못된 접근
            log.error("잘못된 접근");
            responseDTO.setState(false);
            responseDTO.setMessage("잘못된 접근입니다");
        }

        return responseDTO;
    }

    /**
     * 로그아웃 메소드 구현
     */
    @PostMapping("user/logout")
    public void logout() {
        //토큰 만료, 
        // 카카오,네이버는 자체 토큰 만료 가능
        // 구글은 생각해봐야함
    }


    /**
     * 인증 테스트
     *
     * @return
     */
    @GetMapping("moon")
    public String moon() {
        return "moon";
    }

    /**
     * 인증 테스트
     *
     * @return
     */
    @GetMapping("/room")
    public String room() {
        return "room";
    }

}
