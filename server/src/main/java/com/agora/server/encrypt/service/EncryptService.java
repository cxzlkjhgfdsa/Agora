package com.agora.server.encrypt.service;

import com.agora.server.encrypt.domain.Encrypt;
import com.agora.server.encrypt.repository.EncryptionRepository;
import com.agora.server.encrypt.util.EncryptionUtil;
import com.agora.server.user.controller.dto.request.RequestJoinDto;
import com.agora.server.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EncryptService {
    private final EncryptionRepository encryptionRepository;


    @Transactional
    public String getEncryptedUserName(Encrypt encrypt, RequestJoinDto requestJoinDto) throws Exception {
        encryptionRepository.save(encrypt);
        String salt = encrypt.getSalt();
        byte[] key = EncryptionUtil.hexToByteArray(salt);
        return EncryptionUtil.aesEncrypt(requestJoinDto.getUser_name(), key);
    }

    public String getUserName(User user) throws Exception {
        Encrypt encrypt = encryptionRepository.findByUser_id(user.getUser_social_id());
        byte[] key = EncryptionUtil.hexToByteArray(encrypt.getSalt());
        return EncryptionUtil.aesDecrypt(user.getUser_name(), key);
    }

}
