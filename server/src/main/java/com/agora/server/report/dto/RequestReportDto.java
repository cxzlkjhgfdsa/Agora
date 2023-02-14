package com.agora.server.report.dto;

import lombok.Getter;
import org.checkerframework.checker.index.qual.SearchIndexBottom;

import java.util.UUID;

@Getter
@SearchIndexBottom
public class RequestReportDto {
    UUID reported_user_id;
    String report_content;
}
