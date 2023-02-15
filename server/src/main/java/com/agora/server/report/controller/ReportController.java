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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v2/report")
public class ReportController {

    private final ReportService reportService;

    @PostMapping("reporting")
    public ResponseEntity<ResponseDTO> reporting(@RequestBody RequestReportDto requestReportDto, @AuthenticationPrincipal UserAuthenticateInfo userInfo, @RequestParam UUID reporting_id ){
        ResponseDTO responseDTO = new ResponseDTO();
//        UUID reporting_id = UUID.fromString(userInfo.getUserId());

        Report report = Report.createReport(reporting_id, requestReportDto.getReported_user_id(),
                                        requestReportDto.getReport_content());
        reportService.saveReport(report);
        responseDTO.setMessage("정상적으로 신고처리 완료되었습니다");
        responseDTO.setStatusCode(200);
        responseDTO.setState(true);
        return ResponseEntity.ok(responseDTO);
    }
}
