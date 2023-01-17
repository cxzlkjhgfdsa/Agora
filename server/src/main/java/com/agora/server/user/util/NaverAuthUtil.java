package com.agora.server.user.util;

import com.agora.server.user.controller.response.NaverTokenDTO;
import com.agora.server.user.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class NaverAuthUtil {
    @Value("${oauth.naver.redirect.header}")
    private String getRedirectHeader;

    @Value("${oauth.naver.redirect.header-value}")
    private String getRedirectHeaderValue;

    @Value("${oauth.naver.redirect.url}")
    private String getRedirectUrl;

    @Value("${oauth.naver.redirect.grant-type}")
    private String getGrantType;

    @Value("${oauth-key.naver.client-id}")
    private String getClientId;

    @Value("${oauth-key.naver.client-secret}")
    private String getClientSecret;

    @Value("${oauth.naver.get-info.url}")
    private String getInfoUrl;

    @Value("${oauth.naver.get-info.header-type}")
    private String getInfoHeaderType;

    @Value("${oauth.naver.get-info.header-value}")
    private String getInfoHeaderValue;

    @Value("${oauth.naver.get-info.auth.header-type}")
    private String getInfoAuthHeader;

    @Value("${oauth.naver.get-info.auth.header-value}")
    private String getInfoAuthHeaderValue;

    @Value("${oauth.naver.get-code.response-type}")
    private String responseType;

    @Value("${oauth.naver.get-code.state}")
    private String state;

    @Value("${oauth.naver.get-code.login.redirect-uri}")
    private String loginRedirectUri;

    @Value("${oauth.naver.get-code.join.redirect-uri}")
    private String joinRedirectUri;

    @Value("${oauth.naver.get-code.url}")
    private String getCodeUrl;

    private RestTemplate restTemplate;

    public User getUserInfo(String accessToken) {
        restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> httpEntity = generateProfileRequest(accessToken);
        ResponseEntity<String> userInfoBody = restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                httpEntity,
                String.class
        );
        return new User();
    }

    private HttpEntity<MultiValueMap<String, String>> generateProfileRequest(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(getInfoAuthHeader, getInfoAuthHeaderValue + accessToken);
        headers.add(getInfoHeaderType, getInfoHeaderValue);
        return new HttpEntity<>(headers);
    }

    /**
     * code로 accesstoken 받기
     *
     * @param httpEntity
     * @return
     */
    public String getTokenBody(HttpEntity<MultiValueMap<String, String>> httpEntity) {
        restTemplate = new RestTemplate();
        return restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                httpEntity,
                String.class
        ).getBody();
    }

    /**
     * token 받은 것에서 accesstoken 분리
     *
     * @param body
     * @return
     * @throws JsonProcessingException
     */
    public String getAccessToken(String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        NaverTokenDTO naverTokenDTO = objectMapper.readValue(body, NaverTokenDTO.class);
        return naverTokenDTO.getAccess_token();
    }

    /**
     * @param code redirect 후 받은 code
     * @return redirect 된 후 code를 가지고 token을 받아오기 위한 함수
     */
    public HttpEntity<MultiValueMap<String, String>> getTokenHttpEntity(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(getRedirectHeader, getRedirectHeaderValue);
        MultiValueMap<String, String> params = getParams(code);
        return new HttpEntity<>(params, headers);
    }

    /**
     * @param code reidrect  후  받아오는 code
     * @return header 정보 담고 있는 param
     */
    private MultiValueMap<String, String> getParams(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", getGrantType);
        params.add("client_id", getClientId);
        params.add("client_secret", getClientSecret);
        params.add("code", code);
        return params;
    }

    /**
     * login redirect 하기
     *
     * @return redirect 링크
     */
    public String getRedirectUrlLogin() {
        StringBuilder sb = getCodeUrl(loginRedirectUri);
        return sb.toString();
    }

    /**
     * join redirect 하기
     *
     * @return redirect 링크
     */
    public String getRedirectUrlJoin() {
        StringBuilder sb = getCodeUrl(joinRedirectUri);
        return sb.toString();
    }

    /**
     * redirect 링크 생성
     *
     * @param uri login, join
     * @return 링크
     */
    private StringBuilder getCodeUrl(String uri) {
        StringBuilder sb = new StringBuilder();
        sb.append(getCodeUrl)
                .append("response_type=")
                .append(responseType)
                .append("&client_id=")
                .append(getClientId)
                .append("&state=")
                .append(state)
                .append("&redirect_uri=")
                .append(uri);
        return sb;
    }


}
