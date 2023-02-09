package com.agora.server.user.service;

import com.agora.server.category.domain.Category;
import com.agora.server.category.repository.CategoryRepository;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
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

    public List<Category> findById(List<Long> categories) {
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
}
