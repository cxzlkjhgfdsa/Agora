package com.agora.server.user.service;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.category.repository.UserCategoryRepository;
import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.encrypt.service.EncryptService;
import com.agora.server.file.service.FileService;
import com.agora.server.user.controller.dto.request.EditRequestDto;
import com.agora.server.user.controller.dto.request.RequestJoinDto;
import com.agora.server.user.controller.dto.response.UserInfoResponseDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    private final RedisTemplate<String, Object> redisTemplate;

    private final FileService fileService;

    private final UserCategoryRepository userCategoryRepository;

    private final EncryptService encryptService;

    public User findUserByNickname(String nickname) {
        return userRepository.findByUser_nickname(nickname);
    }

    public List<Category> findCategoryById(List<Long> categories) {
        List<Category> categoryList = new ArrayList<>();
        for (Long item :
                categories) {
            Optional<Category> categoryItem = categoryRepository.findById(item);
            categoryList.add(categoryItem.get());
        }
        return categoryList;
    }

    public void saveRefreshToken(UUID uuid, String refreshToken) {
        String userId = uuid.toString();
        redisTemplate.opsForValue().set(userId, refreshToken, 10, TimeUnit.DAYS);
    }

    @Transactional
    public void editUserInfo(String userId, EditRequestDto editRequestDto) throws IOException {
        User findUser = userRepository.findById(UUID.fromString(userId)).get();

        if(findUser.getUser_photo_name().length()>10){ //  기본 프로필을 사용허고 있지 않은 유저라면
            List<String> filenames = new ArrayList<>();
            filenames.add(findUser.getUser_photo_name());
            fileService.deleteFile(filenames);  //기존 프로필 삭제
        }

        findUser.changeUserPhoto(editRequestDto.getUser_photo_name(), editRequestDto.getUser_photo()); // 프로필 값 변경

        List<Category> categories = findCategoryById(editRequestDto.getCategories());

        List<UserCategory> userCategories = findUser.getCategories();

        for(int i=0; i<userCategories.size(); i++){        // 카테고리 변경
            userCategories.get(i).setCategory(categories.get(i));
        }

        findUser.setUserCategories(userCategories);
    }

    public UserInfoResponseDto getUserInfo(User user) throws Exception {
        List<UserCategory> byUserUserId = userCategoryRepository.findByUser_userId(user.getUser_id());
        List<String> categories = new ArrayList<>();
        for(UserCategory uc : byUserUserId){
            categories.add(uc.getCategory().getCategory_name());
        }

        UserInfoResponseDto userInfoDto = new UserInfoResponseDto();
        userInfoDto.setUserName(encryptService.getUserName(user));
        userInfoDto.setUserNickname(user.getUser_nickname());
        userInfoDto.setUser_photo_name(user.getUser_photo_name());
        userInfoDto.setUser_photo(user.getUser_photo());
        userInfoDto.setUserAge(user.getUser_age());
        userInfoDto.setCategories(categories);

        return userInfoDto;
    }

    @Transactional
    public void userjoin(RequestJoinDto requestJoinDto) throws NoSuchAlgorithmException {


        Encrypt encrypt = Encrypt.createEncrypt(requestJoinDto.getUser_social_id());
        // 카테고리 객체로 리스트 얻기
        List<Category> categoryList = findCategoryById(requestJoinDto.getCategories());
        String encryptedUserName = encryptService.getEncryptedUserName(encrypt, requestJoinDto);

        User joinUser = User.createUser(encrypt, requestJoinDto.getUser_social_type(), requestJoinDto.getUser_social_id()
                , encryptedUserName, requestJoinDto.getUser_age(), requestJoinDto.getUser_phone(),
                requestJoinDto.getUser_nickname(), requestJoinDto.getUser_photo_name(), requestJoinDto.getUser_photo());
        User saveUser = userRepository.save(joinUser); // 1차캐시로 영속성 컨텍스트에 user를 올림
        // 더티 체킹과 변경감지 !! 다시 공부하기

        for (Category category : categoryList) {
            UserCategory userCategory = userCategoryRepository.save(UserCategory.createUserCategory(saveUser, category));
            saveUser.addCategories(userCategory);
        }
    }
}
