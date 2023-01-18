package com.agora.server.user.service;

import com.agora.server.user.controller.dto.CommonDto;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.controller.dto.google.GoogleOAuthToken;
import com.agora.server.user.controller.dto.google.GoogleUser;
import com.agora.server.user.controller.dto.google.GetGoogleOAuthRes;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.GoogleUserRepository;
import com.agora.server.user.utils.GoogleAuthUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class GoogleAuthService {
    private final GoogleAuthUtils googleAuthUtils;
    private final HttpServletResponse response;

    private final GoogleUserRepository googleUserRepository;

    public void loginRequest() throws IOException {
        String redirectURL = googleAuthUtils.getLoginRedirectURL();
        response.sendRedirect(redirectURL);
    }
    public void joinRequest() throws IOException {
        String redirectURL = googleAuthUtils.getJoinRedirectURL();
        response.sendRedirect(redirectURL);
    }

    public GetGoogleOAuthRes oAuthLogin(String code) throws IOException {

        //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
        ResponseEntity<String> accessTokenResponse = googleAuthUtils.requestLoginAccessToken(code);
        //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
        GoogleOAuthToken oAuthToken = googleAuthUtils.getLoginAccessToken(accessTokenResponse);
        //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
        ResponseEntity<String> userInfoResponse = googleAuthUtils.requestUserInfo(oAuthToken);
        //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
        GoogleUser googleUser = googleAuthUtils.getUserInfo(userInfoResponse);

        String user_id = googleUser.getEmail();

        //우리 서버의 db와 대조하여 해당 user가 존재하는 지 확인한다.
        // db 가서 존재하는지 확인하는 코드 넣을 예정
        // user_db_id로 구분 할 것

//        if (user_db_id != 0) {
//      서버에 user가 존재하면 앞으로 회원 인가 처리를 위한 jwtToken을 발급한다.
//          jwtToken 발급할 코드 넣을 예정
//
//      액세스 토큰과 jwtToken, 이외 정보들이 담긴 자바 객체를 다시 전송한다.
        GetGoogleOAuthRes getGoogleOAuthRes = new GetGoogleOAuthRes("jwtToken", 1, oAuthToken.getAccess_token(), oAuthToken.getToken_type(), "login");
        return getGoogleOAuthRes;
//        } else {
//      서버에 user가 없으면 회원가입창으로 유도를 위해
//      클라이언트단으로 회원이 아니라는 정보를 넘겨주는 코드를 넣을 예정
//        }

    }

    public GetGoogleOAuthRes oAuthJoin(String code) throws IOException {

        //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
        ResponseEntity<String> accessTokenResponse= googleAuthUtils.requestJoinAccessToken(code);
        //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
        GoogleOAuthToken oAuthToken=googleAuthUtils.getJoinAccessToken(accessTokenResponse);
        //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
        ResponseEntity<String> userInfoResponse=googleAuthUtils.requestUserInfo(oAuthToken);
        //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
        GoogleUser googleUser= googleAuthUtils.getUserInfo(userInfoResponse);

        String user_id = googleUser.getEmail();

        //우리 서버의 db와 대조하여 해당 user가 존재하는 지 확인한다.
        // db 가서 존재하는지 확인하는 코드 넣을 예정
        // user_db_id로 구분 할 것

//        if (user_db_id != 0) {
//      서버에 user가 존재하면 앞으로 회원 인가 처리를 위한 jwtToken을 발급한다.
//      jwtToken 발급할 코드 넣을 예정
//      join(회원가입)버튼 눌러서 들어온 것이므로 이미 회원이라는 정보도 클라이언트에 같이 보내줄 것
//
//      액세스 토큰과 jwtToken, 이외 정보들이 담긴 자바 객체를 다시 전송한다.
        GetGoogleOAuthRes getGoogleOAuthRes = new GetGoogleOAuthRes("jwtToken", 1, oAuthToken.getAccess_token(), oAuthToken.getToken_type(), "join");

        User user = User.createUser(SocialType.GOOGLE, googleUser.getId(), googleUser.name, "age", "phone", googleUser.getName(), "photo");

        googleUserRepository.save(user);

        return getGoogleOAuthRes;
//        } else {
//      서버에 user가 없으면 회원가입창으로 유도를 위해
//      클라이언트단으로 회원이 아니라는 정보를 넘겨주는 코드를 넣을 예정
//        }

    }

    public GoogleOAuthToken getGoogleOAuthToken(String code) throws IOException {
        //구글로 일회성 코드를 보내 액세스 토큰이 담긴 응답객체를 받아옴
        ResponseEntity<String> accessTokenResponse= googleAuthUtils.requestJoinAccessToken(code);
        //응답 객체가 JSON형식으로 되어 있으므로, 이를 deserialization해서 자바 객체에 담을 것이다.
        GoogleOAuthToken oAuthToken=googleAuthUtils.getJoinAccessToken(accessTokenResponse);
        return oAuthToken;
    }

    public CommonDto getGoogleUserInfo(GoogleOAuthToken oAuthToken) throws IOException {
        //액세스 토큰을 다시 구글로 보내 구글에 저장된 사용자 정보가 담긴 응답 객체를 받아온다.
        ResponseEntity<String> userInfoResponse=googleAuthUtils.requestUserInfo(oAuthToken);
        //다시 JSON 형식의 응답 객체를 자바 객체로 역직렬화한다.
        GoogleUser googleUser= googleAuthUtils.getUserInfo(userInfoResponse);

        CommonDto commonUserDto = new CommonDto();
        commonUserDto.createCommonDto(googleUser.getId(),googleUser.getEmail(),null,SocialType.GOOGLE);


        return commonUserDto;
    }



}

