package com.agora.server.user.service;

import com.agora.server.auth.domain.RefreshToken;
import com.agora.server.auth.provider.JwtTokenProvider;
import com.agora.server.auth.repository.AuthRepository;
import com.agora.server.category.domain.Category;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.user.controller.dto.SocialType;
import com.agora.server.user.domain.User;
import com.agora.server.auth.dto.AuthenticatedUserInfo;
import com.agora.server.user.dto.LoginDTO;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CategoryRepository categoryRepository;

    private final RedisTemplate<String, Object> redisTemplate;

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

    public User join(User joinUser) {
        return userRepository.save(joinUser);
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
        authRepository.save(RefreshToken.createRefreshToken(userInfo.getUser_id(), refreshToken));
        log.info("save refresh token");
        return AuthenticatedUserInfo.createAuthenticatedUserInfo(
                accessToken,
                userInfo.getUser_social_type(),
                userInfo.getUser_id(),
                userInfo.getUser_nickname(),
                userInfo.getUser_photo()
        );
    }

    public User findUserByNickname(String nickname) {
        return userRepository.findByUser_nickname(nickname);
    }

    public List<Category> findById(List<Long> categories) {
        List<Category> categoryList = new ArrayList<>();
        for (Long item :
                categories) {
            Optional<Category> categoryItem = categoryRepository.findById(item);
            categoryList.add(categoryItem.get());
        }
        return categoryList;
    }

    public void saveRefreshToken(UUID uuid, String refreshToken){
        String userId = uuid.toString();
        redisTemplate.opsForValue().set(userId, refreshToken, 10, TimeUnit.DAYS);
    }
}
