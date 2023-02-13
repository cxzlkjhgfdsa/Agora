package com.agora.server.openvidu.service;

import com.agora.server.openvidu.exception.AgoraOpenViduException;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.token.Token;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class OpenViduService {

    private final OpenVidu openVidu;

    private Map<Long, Session> openViduSessions = new ConcurrentHashMap<>();

    /**
     * 방 생성시 세션 생성하는 서비스 메소드
     * @param roomId
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    public void createSession(Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openVidu.createSession();
        Session findSession = openViduSessions.get(roomId);
        if(findSession!=null){
            // 세션을 생성하려고 하는데 이미 해당 방에 대한 세션이 생성되어있을 경우 잘못된 접근
            throw new AgoraOpenViduException("잘못된 접근입니다");
        }

        openViduSessions.put(roomId, session);

    }

    /**
     * 방에 들어가기위한 세션을 얻는 메소드
     * @param roomId
     * @return
     */
    public String enterSession(Long roomId) throws OpenViduJavaClientException, OpenViduHttpException {


        Session session = openViduSessions.get(roomId);
        if(session == null){
            throw new AgoraOpenViduException("존재하지 않는 방입니다");
        }
        String Token = craeteToken(session);

        return Token;
    }

    /**
     * OpenVidu Server 입장을 위한 토큰 발급
     * @param session
     * @return
     * @throws OpenViduJavaClientException
     * @throws OpenViduHttpException
     */
    private String craeteToken(Session session) throws OpenViduJavaClientException, OpenViduHttpException {

        ConnectionProperties connectionProperties =
                new ConnectionProperties.Builder()
                        .type(ConnectionType.WEBRTC).build();

        String Token = session.createConnection(connectionProperties).getToken();
        return Token;
    }



}
