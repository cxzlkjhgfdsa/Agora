package com.agora.server.report.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@ApiModel(value = "BkackList")
@Entity
@Getter
public class BlackList {

    @Id @GeneratedValue
    @ApiModelProperty(value = "id", example = "블랙리스트 고유 id 입니다")
    Long id;

    @Type(type = "uuid-char")
    @ApiModelProperty(value = "user_id", example = "유저 식별자 입니다")
    UUID user_id;

    @Type(type = "uuid-char")
    @ApiModelProperty(value = "user_phone", example = "유저 전화번호 입니다")
    String user_phone;
}
