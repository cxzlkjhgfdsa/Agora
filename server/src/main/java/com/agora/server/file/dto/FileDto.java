package com.agora.server.file.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileDto {
    private String fileName;
    private String fileUrl;

    public FileDto(String fileName, String fileUrl){
        this.fileName = fileName;
        this.fileUrl = fileUrl;
    }

}
