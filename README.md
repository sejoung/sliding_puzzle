# 🧩 4x4 슬라이딩 퍼즐

이미지를 사용한 4x4 슬라이딩 퍼즐 게임입니다. 바닐라 JavaScript로 구현되었으며, 모바일과 데스크톱 모두에서 플레이할 수 있습니다.

## 📖 게임 소개

슬라이딩 퍼즐은 하나의 이미지를 16개의 타일로 나누고, 그 중 하나를 비워둔 후 타일을 슬라이딩하여 원래 이미지를 완성하는 퍼즐 게임입니다.

## ✨ 주요 기능

- **4x4 그리드**: 15개의 타일과 1개의 빈 공간
- **이미지 자동 분할**: 선택한 이미지를 자동으로 16조각으로 분할
- **정답 미리보기**: 게임 시작 전 3초 동안 완성된 이미지 표시
- **지능형 섞기**: 항상 풀 수 있는 퍼즐 생성 (200-300회 이동 시뮬레이션)
- **이동 횟수 추적**: 플레이어의 이동 횟수 실시간 표시
- **승리 감지**: 퍼즐 완성 시 축하 메시지 표시
- **섞기 버튼**: 언제든지 새 게임 시작
- **정답 보기**: 막힐 때 정답 확인 가능
- **반응형 디자인**: 데스크톱, 태블릿, 모바일 최적화
- **터치 지원**: 모바일 기기에서 터치로 편리하게 플레이

## 🎮 게임 방법

1. 페이지가 로드되면 3초 동안 완성된 이미지(정답)가 표시됩니다
2. 카운트다운 후 자동으로 퍼즐이 섞입니다
3. 빈 공간과 인접한 타일을 클릭/탭하여 이동합니다
4. 모든 타일을 올바른 위치에 놓으면 승리!

### 조작 방법
- **데스크톱**: 마우스 클릭
- **모바일**: 터치/탭

### 버튼 설명
- **섞기**: 새로운 게임 시작 (이동 횟수 초기화)
- **정답 보기**: 완성된 이미지 확인

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/yourusername/sliding_puzzle.git
cd sliding_puzzle
```

### 2. 이미지 추가

`public/images/` 디렉토리에 `cat.jpg` 파일을 추가하세요.

```bash
# 이미지 파일을 public/images/ 디렉토리에 복사
cp your-image.jpg public/images/cat.jpg
```

**권장 이미지 사양:**
- 정사각형 이미지 (1:1 비율)
- 최소 400x400px 이상
- JPG, PNG 형식 지원

### 3. 실행

#### 방법 1: 브라우저로 직접 열기
```bash
open public/index.html
```

#### 방법 2: 로컬 서버 사용 (권장)
```bash
cd public
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속

#### 방법 3: Node.js http-server 사용
```bash
npx http-server public -p 8000
```

## 🛠️ 기술 스택

- **HTML5**: 구조 및 마크업
- **CSS3**: 스타일링 및 애니메이션
  - CSS Grid: 퍼즐 레이아웃
  - CSS Variables: 반응형 크기 조정
  - Media Queries: 모바일 대응
- **Vanilla JavaScript**: 게임 로직
  - 이벤트 처리
  - DOM 조작
  - 타일 이동 알고리즘

## 📁 프로젝트 구조

```
sliding_puzzle/
├── public/
│   ├── index.html          # 메인 HTML 파일
│   ├── js/
│   │   └── puzzle.js       # 게임 로직 JavaScript
│   └── images/
│       └── cat.jpg         # 퍼즐 이미지 (사용자 추가)
├── CLAUDE.md               # Claude Code 가이드
├── README.md               # 프로젝트 문서
└── LICENSE                 # MIT 라이선스
```

## 🎯 게임 알고리즘

### 타일 섞기
- 랜덤 배열 섞기 대신 **실제 이동 시뮬레이션** 사용
- 200-300회의 유효한 이동을 수행하여 섞기
- 항상 풀 수 있는 상태 보장
- 직전 이동의 역이동 방지로 효과적인 섞기

### 이동 유효성 검사
- 빈 공간과 인접한 타일만 이동 가능
- 상하좌우 4방향 체크
- 그리드 경계 검증

### 승리 조건
- 모든 타일이 올바른 순서로 배치되었는지 확인
- 0번부터 14번까지 순서대로, 15번이 빈 공간

## 📱 반응형 디자인

| 화면 크기 | 타일 크기 | 퍼즐 크기 |
|-----------|-----------|-----------|
| 데스크톱 (769px+) | 100px | 400x400px |
| 태블릿 (481-768px) | 80px | 320x320px |
| 스마트폰 (361-480px) | 70px | 280x280px |
| 소형 스마트폰 (≤360px) | 60px | 240x240px |

## 🎨 커스터마이징

### 이미지 변경
`public/js/puzzle.js` 파일에서 이미지 경로를 수정하세요:

```javascript
const IMAGE_PATH = 'images/your-image.jpg';
```

### 그리드 크기 변경
3x3 또는 5x5 퍼즐로 변경하려면:

```javascript
const GRID_SIZE = 3; // 3x3 퍼즐
```

CSS에서도 그리드 열/행 수정:
```css
grid-template-columns: repeat(3, var(--tile-size));
grid-template-rows: repeat(3, var(--tile-size));
```

### 카운트다운 시간 변경
`public/js/puzzle.js`의 `startCountdown()` 함수에서:

```javascript
let count = 5; // 5초로 변경
```

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 👤 제작자

sejoung kim

## 🤝 기여

이슈 제보와 풀 리퀘스트는 언제나 환영합니다!

1. 이 저장소를 포크하세요
2. 새 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. 풀 리퀘스트를 열어주세요

---

즐거운 퍼즐 게임 되세요! 🎉