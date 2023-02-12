package com.agora.server.room.controller.dto.pubsub;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Setter;

@Setter
@JsonSerialize
public class EventOnlyMessage {
    private String event;

    @JsonProperty
    public String getEvent() {
        return event;
    }
}