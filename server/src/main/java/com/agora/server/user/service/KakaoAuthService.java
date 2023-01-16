package com.agora.server.user.service;

import com.agora.server.user.utils.KakaoAuthUtils;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {

    private final KakaoAuthUtils kakaoAuthUtils;
    private final HttpServletResponse response;

    @Value("${spring.OAuth2.kakao.token-url}")
    private String KAKAO_TOKEN_URL;

    @Value("${spring.OAuth2.kakao.api-key}")
    private String KAKAO_REST_API_KEY;

    @Value("${spring.OAuth2.kakao.info-key}")
    private String KAKAO_GET_INFO_URL;

    /**
     * 회원가입 요청으로 redirect 하기 위한 URL 생성
     */
    public void joinRequest() throws IOException {
        String redirectURL;
        redirectURL = kakaoAuthUtils.getKakaoJoinURL();
        response.sendRedirect(redirectURL);
    }

    /**
     * 발급받은 코드를 통해 AcessToken, Refresh 토큰을 받아오는 메소드
     * @param code
     * @return
     * @throws IOException
     */
    public String getKakaoToken(String code) throws IOException{

        String access_Token = "";
        String refresh_Token = "";

        URL url = new URL(KAKAO_TOKEN_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        StringBuilder sb = new StringBuilder();
        sb.append("grant_type=authorization_code");
        sb.append("&client_id="+KAKAO_REST_API_KEY); // TODO REST_API_KEY 입력
        sb.append("&code=" + code);
        bw.write(sb.toString());
        bw.flush();

        //결과 코드가 200이라면 성공
        int responseCode = conn.getResponseCode();
        //System.out.println("responseCode : " + responseCode);

        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }
        //System.out.println("response body : " + result);

        //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);

        access_Token = element.getAsJsonObject().get("access_token").getAsString();
        refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

        //System.out.println("access_token : " + access_Token);
        //System.out.println("refresh_token : " + refresh_Token);

        br.close();
        bw.close();

        return access_Token;
    }


    public void getKakaoUserInfo(String token) throws IOException{

        URL url = new URL(KAKAO_GET_INFO_URL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        conn.setRequestMethod("POST");
        conn.setDoOutput(true);
        conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

        //결과 코드가 200이라면 성공
        int responseCode = conn.getResponseCode();
        //System.out.println("responseCode : " + responseCode);

        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }
        //System.out.println("response body : " + result);

        //Gson 라이브러리로 JSON파싱
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(result);

        int id = element.getAsJsonObject().get("id").getAsInt();
        boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
        String email = "";
        if(hasEmail){
            email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
        }
        String nickname = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("profile").getAsJsonObject().get("nickname").getAsString();
//        System.out.println("id : " + id);
//        System.out.println("email : " + email);
//        System.out.println("nickname = " + nickname);

        br.close();

    }

}
