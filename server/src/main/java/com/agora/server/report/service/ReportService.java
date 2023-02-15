package com.agora.server.report.service;

import com.agora.server.report.domain.Report;
import com.agora.server.report.repository.ReportRepository;
import com.agora.server.user.domain.User;
import com.agora.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReportService {

    public final ReportRepository reportRepository;
    public final UserRepository userRepository;

    @Transactional
    public void saveReport(Report report) {
        Optional<User> findUser = userRepository.findById(report.getReported_user_id());
        findUser.get().addReportCnt();
        reportRepository.save(report);
    }
}
