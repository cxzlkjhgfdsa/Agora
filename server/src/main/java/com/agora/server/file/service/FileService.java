package com.agora.server.file.service;

import com.agora.server.file.dto.FileDto;
import com.agora.server.file.util.DataBucketUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final DataBucketUtil dataBucketUtil;

    public List<FileDto> uploadFiles(List<MultipartFile> files) {

        List<FileDto> responseFiles = new ArrayList<>();

        for(int i=0; i<files.size(); i++){
            String originalName = files.get(i).getOriginalFilename();
            if(originalName==null){
                System.out.println("파일 이름 없음");
            }
            String contentType = files.get(i).getContentType();
            FileDto fileDto = dataBucketUtil.uploadFile(files.get(i), originalName, contentType);

            if(fileDto!=null){
                responseFiles.add(fileDto);
            }
        }
        return responseFiles;
    }
}
