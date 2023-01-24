package com.agora.server.user.service;

import com.agora.server.auth.domain.RefreshToken;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.auth.repository.AuthRepository;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.auth.dto.AuthenticatedUserInfo;
import com.agora.server.user.dto.LoginDTO;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * SocialType 과 Social측에서 제공하는 고유 ID를 통해 회원가입 되어있는 유저인지 확인
     *
     * @param socialId
     * @param socialType
     * @return
     */
    public User checkDuplicateUser(String socialId, SocialType socialType) {
        return userRepository.checkDuplicateUser(socialId, socialType);
    }

    public void join(User joinUser) {
        userRepository.save(joinUser);
    }

    /**
     * login 시 access, refresh token 발급
     *
     * @param user user_id, SocialType
     * @return 클라이언트에 넘겨줄 정보
     * @throws NoSuchFieldException userInfo 가 없는 경우
     */
    public AuthenticatedUserInfo login(LoginDTO user) throws NoSuchFieldException {
        // login
        User userInfo = userRepository.findUserByUser_idAndUser_social_type(user.getUserId(), user.getSocialType());
        log.info("find user success");
        String accessToken = jwtTokenProvider.createAccessToken(userInfo.getUser_id(), userInfo.getUser_social_type());
        log.info("create access token");
        String refreshToken = jwtTokenProvider.createRefreshToken();
        log.info("create refresh token");
        // refresh token 저장
        authRepository.save(RefreshToken.createRefreshToken(userInfo.getUser_id().toString(), refreshToken));
        log.info("save refresh token");
        return AuthenticatedUserInfo.createAuthenticatedUserInfo(
                accessToken,
                userInfo.getUser_social_type(),
                userInfo.getUser_id(),
                userInfo.getUser_nickname(),
                userInfo.getUser_photo()
        );
    }
}
