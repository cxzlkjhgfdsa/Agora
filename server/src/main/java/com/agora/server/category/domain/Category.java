package com.agora.server.category.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Category {
    @Id
    @GeneratedValue
    @Column(length = 100, name = "category_id")
    private Long id;

    @Column(length = 50)
    private String category_name;

    @Column(length = 100)
    private String category_image;

}
