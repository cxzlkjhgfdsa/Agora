package com.agora.server.report.domain;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@ApiModel(value = "REPORT")
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id @GeneratedValue
    @ApiModelProperty(value = "id", example = "신고 고유 id 입니다")
    Long id;

    @Type(type = "uuid-char")
    @ApiModelProperty(value = "reporting_user_id", example = "신고자 식별자 입니다")
    UUID reporting_user_id;

    @Type(type = "uuid-char")
    @ApiModelProperty(value = "reported_user_id", example = "신고 대상자 식별자 입니다")
    UUID reported_user_id;

    @ApiModelProperty(value = "report_content", example = "신고 내용입니다")
    @Column(length = 100)
    String report_content;

    public static Report createReport(UUID reporting_id, UUID reported_id, String content){
        Report report = new Report();
        report.reporting_user_id = reporting_id;
        report.reported_user_id = reported_id;
        report.report_content = content;
        return report;
    }
}
