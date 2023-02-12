package com.agora.server.user.service;

import com.agora.server.category.domain.Category;
import com.agora.server.category.domain.UserCategory;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.user.controller.dto.request.EditRequestDto;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.asm.Advice;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public User join(User joinUser) {
        return userRepository.save(joinUser);
    }


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
    public void editUserInfo(String userId, EditRequestDto editRequestDto) {
        User findUser = userRepository.findById(UUID.fromString(userId)).get();

        List<String> filenames = new ArrayList<>();
        filenames.add(findUser.getUser_photo_name());

        //fileService.deleteFile(filenames);  //기존 프로필 삭제

        findUser.changeUserPhoto(editRequestDto.getUser_photo_name(), editRequestDto.getUser_photo()); // 프로필 값 변경

        List<Category> categories = findCategoryById(editRequestDto.getCategories());

        List<UserCategory> userCategories = findUser.getCategories();

        for(int i=0; i<userCategories.size(); i++){        // 카테고리 변경
            userCategories.get(i).setCategory(categories.get(i));
        }

        findUser.setUserCategories(userCategories);
    }
}
