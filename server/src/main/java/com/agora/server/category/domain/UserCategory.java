package com.agora.server.category.domain;

import com.agora.server.user.domain.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserCategory {
    @Id
    @GeneratedValue
    @Column(length = 100, name = "user_category_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public static UserCategory createUserCategory(User user, Category category) {
        UserCategory userCategory = new UserCategory();
        userCategory.user = user;
        userCategory.category = category;
        return userCategory;
    }
}
