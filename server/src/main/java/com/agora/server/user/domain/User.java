package com.agora.server.user.domain;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class User{
    @Id @GeneratedValue
    private Long user_id;
    private String user_name;
    private int user_age;
    private String user_phone;


}
