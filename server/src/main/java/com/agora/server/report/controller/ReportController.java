package com.agora.server.report.controller;

import com.agora.server.auth.dto.UserAuthenticateInfo;
import com.agora.server.common.dto.ResponseDTO;
import com.agora.server.report.domain.Report;
import com.agora.server.report.dto.RequestReportDto;
import com.agora.server.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v2/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("reporting")
    public ResponseEntity<ResponseDTO> reporting(@RequestBody RequestReportDto requestReportDto, @AuthenticationPrincipal UserAuthenticateInfo userInfo){
        ResponseDTO responseDTO = new ResponseDTO();
        UUID reporting_id = UUID.fromString(userInfo.getUserId());

        Report report = Report.createReport(reporting_id, requestReportDto.getReported_user_id(),
                                        requestReportDto.getReport_content());
        reportService.saveReport(report);

        return ResponseEntity.ok(responseDTO);
    }
}
