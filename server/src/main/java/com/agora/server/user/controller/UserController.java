package com.agora.server.user.controller;

import com.agora.server.auth.domain.RefreshToken;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.auth.repository.AuthRepository;
import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.category.repository.UserCategoryRepository;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.encrypt.service.EncryptService;
import com.agora.server.user.controller.dto.request.LoginRequestDto;
import com.agora.server.user.controller.dto.request.RequestJoinDto;
import com.agora.server.user.controller.dto.response.LoginResponseDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    private final UserCategoryRepository userCategoryRepository;
    private final JwtTokenProvider tokenProvider;
    private final AuthRepository authRepository;
    private final EncryptService encryptService;


    /**
     * RequestBody로 회원가입자의 정보를 받아옴
     * 회원가입을 위한 메소드
     *
     * @param requestJoinDto
     * @return 회원가입이 정상적으로 실행되었다는 메세지를 보냄
     */
    @PostMapping("join")
    public ResponseEntity<ResponseDTO> userJoin(@RequestBody RequestJoinDto requestJoinDto) throws Exception {
        ResponseDTO responseDTO = new ResponseDTO();

        Encrypt encrypt = Encrypt.createEncrypt(requestJoinDto.getUser_social_id());
        List<Category> categoryList = userService.findById(requestJoinDto.getCategories());
        String encryptedUserName = encryptService.getEncryptedUserName(encrypt, requestJoinDto);

        User joinUser = User.createUser(encrypt, requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
                , encryptedUserName, requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo());
        User saveUser = userService.join(joinUser); // 1차캐시로 영속성 컨텍스트에 user를 올림
        // 더티 체킹과 변경감지 !! 다시 공부하기

        for (Category category : categoryList) {
            UserCategory userCategory = userCategoryRepository.save(UserCategory.createUserCategory(saveUser, category));
            saveUser.addCategories(userCategory);
        }
        responseDTO.setState(true);
        responseDTO.setMessage("회원가입에 성공하셨습니다");
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("check/nickname")
    public ResponseEntity<ResponseDTO> checkNickname(@RequestParam String nickname) {
        ResponseDTO responseDTO = new ResponseDTO();
        User findUser = userService.findUserByNickname(nickname);

        if (findUser == null) {
            responseDTO.setMessage("사용 가능한 닉네임입니다");
            responseDTO.setState(true);
        } else {
            responseDTO.setMessage("이미 사용중인 닉네임입니다");
            responseDTO.setState(false);
        }
        return ResponseEntity.ok(responseDTO);
    }

    /**
     * 로그인 구현 메소드
     *
     * @param loginRequestDto
     * @return
     * @throws NoSuchFieldException
     */
    @PostMapping("login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDto loginRequestDto) throws NoSuchFieldException {
        ResponseDTO responseDTO = new ResponseDTO();

        Optional<User> Ouser = userRepository.findById(loginRequestDto.getUser_id());

        if (Ouser.isPresent()) {
            // 유저 정상적으로 찾았을 시
            User user = Ouser.get();
            String acessToken = tokenProvider.createAccessToken(user.getUser_id(), user.getUser_social_type());
            String refreshToken = tokenProvider.createRefreshToken();
            authRepository.save(RefreshToken.createRefreshToken(user.getUser_id(), refreshToken));

            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setUserId(user.getUser_id());
            loginResponseDto.setUserNickname(user.getUser_nickname());
            loginResponseDto.setUserPhoto(user.getUser_photo());
            loginResponseDto.setSocialType(user.getUser_social_type());
            loginResponseDto.setAccessToken(acessToken);
            responseDTO.setBody(loginResponseDto);
            responseDTO.setState(true);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("login success");
        } else {
            // 잘못된 접근
            log.error("잘못된 접근");
            responseDTO.setState(false);
            responseDTO.setMessage("잘못된 접근입니다");
        }
        return ResponseEntity.ok(responseDTO);
    }
}
