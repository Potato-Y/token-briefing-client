# token-briefing-client

`token-briefing-client`는 https://github.com/Potato-Y/Token-Briefing 에서 제공되는 서비스에 대응되는 설치형 클라이언트입니다.

#### 확인이 필요한 내용

- 해당 클라이언트는 설치형으로 한 명의 사용자가 모니터링을 하는 용도를 위해 개발되었습니다. `Token-Briefing`의 웹 서비스와 완벽히 동일한 기능을 제공하지 않습니다.
- 해당 프로젝트는 요구 사항에 맞추어 개발되어 윈도우 플랫폼만 지원됩니다. 다른 플랫폼에서의 지원은 추가적인 개발이 요구됩니다.

#### `Token-Briefing`와 호환 내용

- 새로운 토큰 브리핑 포스트를 작성하거나 최신 정보를 확인할 수 있습니다.
- 새로운 메모 포스트를 작성하거나 최신 정보를 확인할 수 있습니다.
- 사용자가 원하는 사용자 명을 사용할 수 있습니다.
- 최신 버전의 설치 파일을 다운로드 후 실행할 수 있습니다.
  - 해당 기능은 `Token-Briefing` 프로젝트에 `token-briefing-client-win-updater` 내용이 포함되어 있어야 합니다.
  - 특정 시설의 폐쇠망의 사용 환경을 고려하여 electron-updater가 적용되어 있지 않습니다.

#### 클라이언트의 특이 기능

해당 클라이언트는 ssl 인증서를 적용할 수 없는 특정 환경에 의해 편의를 위해 개발되었습니다. 아래의 내용은 `Token-Briefing/frontend`에서 제공하지 않는 클라이언트 전용 기능입니다.

- 새로운 토큰 브리핑 포스트에 대한 알림
- 메모
  - 새로운 메모 포스트에 대한 알림
  - 메시지의 내용에 맞게 높이가 적용되는 메모 포스트
  - 당일에 작성된 내용만 표시
- 고정으로 사용하는 사용자 명
- 부팅 시 클라이언트를 자동으로 시작

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run electron:serve
```

### Compiles and minifies for production

```
npm run electron:build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
