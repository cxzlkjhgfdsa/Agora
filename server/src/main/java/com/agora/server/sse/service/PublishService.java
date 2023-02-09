package com.agora.server.sse.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;



@Service
@RequiredArgsConstructor
public class PublishService {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    private final RedisMessageListenerContainer redisMessageListenerContainer;



    public void subscribe(String roomId){

        if(!emitters.containsKey(roomId)) {
            SseEmitter emitter = new SseEmitter(0L);
            emitters.put(roomId, emitter);


            MessageListener messageListener = ((message, pattern) -> {
                String roomMessage = message.toString();
                System.out.println(roomMessage);
                SseEmitter roomEmitter = emitters.get(roomId);
                if (roomEmitter != null) {
                    try {
                        roomEmitter.send(SseEmitter.event().data(roomMessage));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            });
//            String roomMessage = "please 안녕하세요 테스트";
//            SseEmitter roomEmitter = emitters.get(roomId);
//            if (roomEmitter != null) {
//                try {
//                    roomEmitter.send(SseEmitter.event().data(roomMessage));
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }

            redisMessageListenerContainer.addMessageListener(messageListener, new ChannelTopic("room:" + roomId));
        }
    }

    public SseEmitter getEmitter(String roomId){
        return emitters.get(roomId);
    }

    public void publishmessage() {
        SseEmitter sseEmitter = emitters.get("124");
        try {
            sseEmitter.send(SseEmitter.event()
                    .name("testpublish")
                    .data("퍼블리시test")
            );
        } catch (Exception e){
            throw new RuntimeException(e);
        }

    }
}
