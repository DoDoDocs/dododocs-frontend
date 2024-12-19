export const chattingText = [
  `
    ### 개념 설명
\`AuthController\`는 클라이언트의 인증 관련 요청을 처리하는 RESTful API 컨트롤러입니다. 이 컨트롤러는 OAuth 인증을 위한 URI 생성, 로그인 처리, Access Token 갱신, 로그아웃 기능을 제공합니다. 각 메서드는 \`AuthService\`와 상호작용하여 비즈니스 로직을 수행하고, 클라이언트에게 적절한 응답을 반환합니다.

### 코드 구현 참조
- **파일 이름**: AuthController.java
- **전체 파일 경로**: \`src/main/java/moheng/auth/presentation/AuthController.java\`
- **관련 코드 스니펫**:
\`\`\`java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/{oAuthProvider}/link")
    public ResponseEntity<OAuthUriResponse> generateUri(@PathVariable final String oAuthProvider) {
        return ResponseEntity.ok(new OAuthUriResponse(authService.generateUri(oAuthProvider)));
    }

    @PostMapping("/{oAuthProvider}/login")
    public ResponseEntity<AccessTokenResponse> login(@PathVariable final String oAuthProvider,
                                                    @RequestBody final TokenRequest tokenRequest,
                                                    final HttpServletResponse httpServletResponse) {
        final MemberToken memberToken = authService.generateTokenWithCode(tokenRequest.getCode(), oAuthProvider);
        final ResponseCookie responseCookie = ResponseCookie.from("refresh-token", memberToken.getRefreshToken())
                .maxAge(604800)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .path("/")
                .build();
        httpServletResponse.addHeader(SET_COOKIE, responseCookie.toString());
        final AccessTokenResponse accessTokenResponse = new AccessTokenResponse(memberToken.getAccessToken());
        return ResponseEntity.status(CREATED).body(accessTokenResponse);
    }

    @PostMapping("/extend/login")
    public ResponseEntity<RenewalAccessTokenResponse> extendLogin(@CookieValue("refresh-token") final String refreshToken) {
        final RenewalAccessTokenResponse renewalAccessTokenResponse =
                authService.generateRenewalAccessToken(new RenewalAccessTokenRequest(refreshToken));
        return ResponseEntity.status(CREATED).body(renewalAccessTokenResponse);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@Authentication final Accessor accessor,
                                        @CookieValue("refresh-token") final String refreshToken) {
        authService.removeRefreshToken(new LogoutRequest(refreshToken));
        return ResponseEntity.noContent().build();
    }
}
\`\`\`
- **코드의 관련성 설명**: 위의 코드 스니펫은 \`AuthController\`의 주요 메서드들을 포함하고 있으며, 각 메서드는 클라이언트의 요청에 따라 OAuth URI를 생성하거나, 로그인 요청을 처리하고, Access Token을 갱신하며, 로그아웃 요청을 처리합니다. 이 컨트롤러는 인증 프로세스의 핵심 역할을 수행하고, 클라이언트와 서버 간의 상호작용을 관리합니다.

### API 엔드포인트 요약
1. **Generate OAuth URI**
   - **메서드**: GET
   - **엔드포인트**: \`/api/auth/{oAuthProvider}/link\`
   - **설명**: OAuth 제공자에 대한 URI를 생성합니다.
   - **응답 예시**:
   \`\`\`json
   {
       "uri": "https://example.com/oauth/authorize"
   }
   \`\`\`

2. **Login**
   - **메서드**: POST
   - **엔드포인트**: \`/api/auth/{oAuthProvider}/login\`
   - **설명**: OAuth 로그인을 수행하고 Access Token을 생성합니다.
   - **응답 예시**:
   \`\`\`json
   {
       "accessToken": "generated_access_token"
   }
   \`\`\`

3. **Extend Login**
   - **메서드**: POST
   - **엔드포인트**: \`/api/auth/extend/login\`
   - **설명**: Refresh Token을 사용하여 Access Token을 갱신합니다.
   - **응답 예시**:
   \`\`\`json
   {
       "accessToken": "new_generated_access_token"
   }
   \`\`\`

4. **Logout**
   - **메서드**: DELETE
   - **엔드포인트**: \`/api/auth/logout\`
   - **설명**: 로그아웃 요청을 처리하고 Refresh Token을 제거합니다.
   - **응답 예시**: 
   \`\`\`json
   {}
   \`\`\`

이러한 엔드포인트들은 클라이언트가 인증 및 세션 관리를 수행하는 데 필요한 기능을 제공합니다.
  `,
  `
    ### 개념 설명
\`AuthController\`에서 404 에러는 클라이언트가 요청한 리소스(예: 특정 OAuth 제공자에 대한 URI 생성, 로그인 요청 등)가 서버에서 존재하지 않을 때 발생합니다. 이는 일반적으로 잘못된 URL 경로, 잘못된 HTTP 메서드 사용, 또는 요청한 리소스가 서버에 존재하지 않을 때 발생합니다.

### 404 에러 발생 원인
1. **잘못된 URL 경로**: 클라이언트가 잘못된 경로를 요청할 경우, 예를 들어 \`/api/auth/invalidProvider/link\`와 같이 존재하지 않는 OAuth 제공자를 요청하면 404 에러가 발생합니다.
2. **잘못된 HTTP 메서드**: 특정 엔드포인트에 대해 잘못된 HTTP 메서드를 사용하면 404 에러가 발생할 수 있습니다. 예를 들어, GET 메서드가 필요한 엔드포인트에 POST 메서드를 사용하면 404 에러가 발생합니다.
3. **리소스 미존재**: 요청한 리소스가 서버에 존재하지 않는 경우, 예를 들어 데이터베이스에 해당 회원 정보가 없을 때 발생할 수 있습니다.

### 해결 방법
1. **URL 경로 확인**: 클라이언트가 요청하는 URL 경로가 정확한지 확인합니다. OAuth 제공자 이름이 올바르게 전달되었는지 확인하고, API 문서에서 제공하는 경로와 일치하는지 검토합니다.
   - 예: \`/api/auth/{oAuthProvider}/link\`에서 \`{oAuthProvider}\`가 유효한 값인지 확인합니다.

2. **HTTP 메서드 확인**: 요청하는 API 엔드포인트에 대해 올바른 HTTP 메서드를 사용하고 있는지 확인합니다. 예를 들어, 로그인 요청은 POST 메서드를 사용해야 합니다.
   - 예: \`POST /api/auth/{oAuthProvider}/login\`

3. **리소스 존재 여부 확인**: 요청한 리소스가 서버에 존재하는지 확인합니다. 예를 들어, 데이터베이스에서 해당 회원 정보가 존재하는지 확인합니다. 필요한 경우, 적절한 예외 처리를 통해 클라이언트에게 404 에러를 명확히 알릴 수 있습니다.

### 코드 구현 참조
- **파일 이름**: ControllerAdvice.java
- **전체 파일 경로**: \`src/main/java/moheng/global/error/ControllerAdvice.java\`
- **관련 코드 스니펫**:
\`\`\`java
@ExceptionHandler({ NoExistMemberException.class, NoExistTripException.class })
public ResponseEntity<ExceptionResponse> handleNotFoundResourceException(final RuntimeException e) {
    logger.error(e.getMessage(), e);
    ExceptionResponse errorResponse = new ExceptionResponse(e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
}
\`\`\`
- **코드의 관련성 설명**: 위의 코드 스니펫은 \`ControllerAdvice\`에서 404 에러를 처리하는 방법을 보여줍니다. 특정 리소스가 존재하지 않을 때 발생하는 예외를 처리하여 클라이언트에게 적절한 404 응답을 반환합니다. 이를 통해 클라이언트는 요청한 리소스가 존재하지 않음을 알 수 있습니다.

이러한 방법들을 통해 \`AuthController\`에서 발생하는 404 에러를 진단하고 해결할 수 있습니다.
  `,
  `
  ### 개념 설명
\`AuthController\`에서 404 에러는 클라이언트가 요청한 리소스(예: 특정 OAuth 제공자에 대한 URI 생성, 로그인 요청 등)가 서버에서 존재하지 않을 때 발생합니다. 이는 일반적으로 잘못된 URL 경로, 잘못된 HTTP 메서드 사용, 또는 요청한 리소스가 서버에 존재하지 않을 때 발생합니다.

### 404 에러 발생 원인
1. **잘못된 URL 경로**: 클라이언트가 잘못된 경로를 요청할 경우, 예를 들어 \`/api/auth/invalidProvider/link\`와 같이 존재하지 않는 OAuth 제공자를 요청하면 404 에러가 발생합니다.
2. **잘못된 HTTP 메서드**: 특정 엔드포인트에 대해 잘못된 HTTP 메서드를 사용하면 404 에러가 발생할 수 있습니다. 예를 들어, GET 메서드가 필요한 엔드포인트에 POST 메서드를 사용하면 404 에러가 발생합니다.
3. **리소스 미존재**: 요청한 리소스가 서버에 존재하지 않는 경우, 예를 들어 데이터베이스에 해당 회원 정보가 없을 때 발생할 수 있습니다.

### 해결 방법
1. **URL 경로 확인**: 클라이언트가 요청하는 URL 경로가 정확한지 확인합니다. OAuth 제공자 이름이 올바르게 전달되었는지 확인하고, API 문서에서 제공하는 경로와 일치하는지 검토합니다.
   - 예: \`/api/auth/{oAuthProvider}/link\`에서 \`{oAuthProvider}\`가 유효한 값인지 확인합니다.

2. **HTTP 메서드 확인**: 요청하는 API 엔드포인트에 대해 올바른 HTTP 메서드를 사용하고 있는지 확인합니다. 예를 들어, 로그인 요청은 POST 메서드를 사용해야 합니다.
   - 예: \`POST /api/auth/{oAuthProvider}/login\`

3. **리소스 존재 여부 확인**: 요청한 리소스가 서버에 존재하는지 확인합니다. 예를 들어, 데이터베이스에서 해당 회원 정보가 존재하는지 확인합니다. 필요한 경우, 적절한 예외 처리를 통해 클라이언트에게 404 에러를 명확히 알릴 수 있습니다.

### 코드 구현 참조
- **파일 이름**: ControllerAdvice.java
- **전체 파일 경로**: \`src/main/java/moheng/global/error/ControllerAdvice.java\`
- **관련 코드 스니펫**:
\`\`\`java
@ExceptionHandler({ NoExistMemberException.class, NoExistTripException.class })
public ResponseEntity<ExceptionResponse> handleNotFoundResourceException(final RuntimeException e) {
    logger.error(e.getMessage(), e);
    ExceptionResponse errorResponse = new ExceptionResponse(e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
}
\`\`\`
- **코드의 관련성 설명**: 위의 코드 스니펫은 \`ControllerAdvice\`에서 404 에러를 처리하는 방법을 보여줍니다. 특정 리소스가 존재하지 않을 때 발생하는 예외를 처리하여 클라이언트에게 적절한 404 응답을 반환합니다. 이를 통해 클라이언트는 요청한 리소스가 존재하지 않음을 알 수 있습니다.

이러한 방법들을 통해 \`AuthController\`에서 발생하는 404 에러를 진단하고 해결할 수 있습니다.
`]