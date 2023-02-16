package com.agora.server.user.controller;

import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.category.repository.UserCategoryRepository;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.encrypt.service.EncryptService;
import com.agora.server.file.service.FileService;
import com.agora.server.report.domain.BlackList;
import com.agora.server.report.repository.BlackListRepository;
import com.agora.server.user.controller.dto.request.EditRequestDto;
import com.agora.server.user.controller.dto.request.LoginRequestDto;
import com.agora.server.user.controller.dto.request.RequestCertificateByPhoneNumber;
import com.agora.server.user.controller.dto.request.RequestJoinDto;
import com.agora.server.user.controller.dto.response.LoginResponseDto;
import com.agora.server.user.controller.dto.response.UserInfoResponseDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import com.agora.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v2/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenProvider tokenProvider;
    private final BlackListRepository blackListRepository;

    /**
     * RequestBody로 회원가입자의 정보를 받아옴
     * 회원가입을 위한 메소드
     * 전화번호를 통해 블랙리스트를 조회, 블랙리스트에 등록되어있는 전화번호라면 회원가입 불가능
     * @param requestJoinDto
     * @return 회원가입이 정상적으로 실행되었다는 메세지를 보냄
     */
    // TODO: 회원 가입 시 user_social_id 가 들어가지 않는 경우 발생
    @PostMapping("join")
    public ResponseEntity<ResponseDTO> userJoin(@RequestBody RequestJoinDto requestJoinDto, HttpServletResponse response) throws Exception {
        ResponseDTO responseDTO = new ResponseDTO();

        String user_phone = requestJoinDto.getUser_phone();
        BlackList blackList= blackListRepository.findBlackListBydUser_phone(user_phone);

        System.out.println("여긴와요?");
        if(blackList==null){ // 블랙리스트에 존재하지 않은 사용자
            String user_id = userService.userjoin(requestJoinDto);
            responseDTO.setState(true);
            responseDTO.setMessage("회원가입 정상 완료");
            responseDTO.setStatusCode(200);

        }else{  // 블랙리스트에 추가된 사용자
            responseDTO.setState(false);
            responseDTO.setMessage("악질 사용자는 회원가입 할 수 없습니다");
        }

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
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
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

        Optional<User> Ouser = userRepository.findById(UUID.fromString(loginRequestDto.getUser_id()));

        if (Ouser.isPresent()) {
            // 유저 정상적으로 찾았을 시
            if(Ouser.get().getReport_count()<50) {
                User user = Ouser.get();
                String acessToken = tokenProvider.createAccessToken(user.getUser_id(), user.getUser_social_type());
                String refreshToken = tokenProvider.createRefreshToken();

                userService.saveRefreshToken(user.getUser_id(), refreshToken);

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
            }else{
                responseDTO.setState(false);
                responseDTO.setStatusCode(200);
                responseDTO.setMessage("너 벤");
            }
        } else {
            // 잘못된 접근
            log.error("잘못된 접근");
            responseDTO.setState(false);
            responseDTO.setMessage("잘못된 접근입니다");
        }
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("check/phonenum")
    public ResponseEntity<ResponseDTO> checkPhoneNumValidation() {
        ResponseDTO res = new ResponseDTO();
        res.setBody("5667687");
        res.setState(true);
        res.setMessage("인증 코드 입니다");
        return ResponseEntity.ok(res);
    }

    @PostMapping("verify/phonenum")
    public ResponseEntity<ResponseDTO> verifyPhoneNumCheck(@RequestBody RequestCertificateByPhoneNumber authNum) {
        ResponseDTO res = new ResponseDTO();
        if ("5667687".equals(authNum.getAuthnum())) {
            res.setState(true);
            res.setMessage("인증되었습니다.");
        } else {
            res.setState(false);
            res.setMessage("인증번호가 틀렸습니다.");
        }
        return ResponseEntity.ok(res);
    }

    /**
     * 유저 정보 불러오기
     * @param userInfo
     * @return
     */
    @GetMapping("get/userinfo")
    public ResponseEntity<ResponseDTO> getUserInfo(@AuthenticationPrincipal UserAuthenticateInfo userInfo) throws Exception {
        ResponseDTO responseDTO = new ResponseDTO();

        UUID userId = UUID.fromString(userInfo.getUserId());   //실제 사용
        Optional<User> findUser = userRepository.findById(userId);  // uids -> 테스트용

        if(findUser.isPresent()){
            User user = findUser.get();
            UserInfoResponseDto userInfoDto = userService.getUserInfo(user);
            responseDTO.setBody(userInfoDto);
            responseDTO.setMessage("조회가 정상적으로 완료되었습니다");
            responseDTO.setStatusCode(200);
            responseDTO.setState(true);

        }else{
            responseDTO.setMessage("존재하지 않는 유저입니다");
            responseDTO.setState(false);
        }

        // 추후 responseDto 만들어서 반환

        return ResponseEntity.ok(responseDTO);
    }

    /**
     * 유저 개인 정보 수정 (카테고리와, 프로필 사진)
     * @param userInfo
     * @param editRequestDto
     * @return
     * @throws IOException
     */
    @PostMapping("edit/userinfo")
    public ResponseEntity<ResponseDTO> editUserInfo(@AuthenticationPrincipal UserAuthenticateInfo userInfo, @RequestBody EditRequestDto editRequestDto) throws IOException {
        ResponseDTO responseDTO = new ResponseDTO();

        String userId = userInfo.getUserId();

        userService.editUserInfo(userId, editRequestDto);

        responseDTO.setMessage("수정이 정상적으로 완료되었습니다");
        responseDTO.setState(true);

        return ResponseEntity.ok(responseDTO);

    }


}
