package com.agora.server.report.service;

import com.agora.server.report.domain.Report;
import com.agora.server.report.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportService {

    public final ReportRepository reportRepository;

    public void saveReport(Report report) {

    }
}
