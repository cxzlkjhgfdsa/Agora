package com.agora.server.category.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue
    @Column(length = 100, name = "category_id")
    private Long id;

    @Column(length = 50)
    private String category_name;

    @Column(length = 100)
    private String category_image;

    public static Category createCategory(String category_name, String category_image) {
        Category category = new Category();
        category.category_name = category_name;
        category.category_image = category_image;
        return category;
    }
}
