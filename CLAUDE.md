# Feasible Lab 랜딩 페이지 — Claude 가이드

## 서비스 개요
피저블 랩(Feasible Lab)의 공식 랜딩 페이지. 박세호(Tony)가 운영하는 1인 제품 스튜디오 소개 사이트다.
강의·컨설팅·AI 프로젝트 수행·글쓰기 네 가지 축으로 일하며, 그 내용을 방문자에게 소개하는 역할을 한다.

- **로컬 경로**: `/home/tony/Documents/github/feasiblelab-web`
- **로컬 서빙**: nginx → `http://localhost:8080`
- **배포**: GitHub `main` push → Cloudflare Pages 자동 배포
- **GitHub**: `github.com/seahopark/feasiblelab-web`

## 기술 스택
- 순수 HTML + CSS (프레임워크 없음, JS 없음)
- 파일 구성: `index.html`, `style.css`
- Cloudflare Pages로 정적 호스팅 (`wrangler.jsonc` 설정 있음)

## 페이지 섹션 구조

| 번호 | 섹션 | ID | 역할 |
|------|------|----|------|
| Nav | 네비게이션 | — | 섹션 링크 + "문의하기" CTA |
| Hero | 메인 헤드라인 | — | 핵심 메시지 + CTA 버튼 |
| 01 | 스튜디오 (About) | `#about` | 박세호 소개, 4가지 원칙 |
| 02 | 하는 일 (Work) | `#work` | 강의·컨설팅·AI 프로젝트·글쓰기 4축 카드 |
| 03 | 경력 (Career) | `#career` | 경력사·강의 이력·강의 주제 목록 |
| 04 | 최근 글 (Writing) | `#writing` | 브런치·퍼블리 글 목록 |
| 05 | 함께 일하기 (Contact) | `#contact` | 이메일·LinkedIn 연락처 |
| Footer | 푸터 | — | 링크 모음, 저작권 |

### 섹션별 주요 콘텐츠

**Hero**
- 헤드라인: "팀이 제대로 일할 수 있다면, 제품은 언제든 만들 수 있습니다."
- 서브: "11년간 Product Lead로 일하며 반복해서 같은 문제를 마주쳤습니다."
- CTA: "함께 일하기 ↗" (blue), "하는 일 보기" (ghost)

**About (01 스튜디오)**
- 박세호(Tony) 소개, 코인원·마인이스·블루밍비트 경력
- AI 애널리스트 서비스 성과: 핵심 기능 전환율 2% → 17.2% (8배)
- 4가지 원칙: ① 이야기를 먼저 듣습니다 ② 왜?를 먼저 묻습니다 ③ 투명하게 공유합니다 ④ 빠르게 테스트합니다

**Work (02 하는 일)**
- 강의 & 워크샵: PM 소통법, Discovery & Framing, User Story Mapping, AI 업무 활용
- 컨설팅: 프로덕트 방향·팀 운영·AI 도입 전략
- AI 프로젝트 수행: AI 에이전트 설계, 업무 자동화, 서비스 기획
- 글쓰기: 브런치(`brunch.co.kr/@tsp`), 퍼블리

**Career (03 경력)**
- 경력: 블루밍비트(AI 미디어), 코인원(핀테크), 마인이스(커머스) — 모두 Product Lead
- 강의처: GS그룹, 그로우앤베터, IBK창공, 마크엔컴퍼니, SBA DT School
- 강의 주제 4가지 (2시간 단위)

**Writing (04 최근 글)**
- 브런치 및 퍼블리 글 5편 링크
- 외부 링크 → `target="_blank" rel="noopener"` 필수

**Contact (05 함께 일하기)**
- 이메일: `seho@feasible.kr`
- LinkedIn: `linkedin.com/in/tonyseahopark`
- "한 줄 소개와 함께 보내주시면, 이틀 안에 답장드립니다."

## 디자인 시스템
**반드시 이 레포의 `DESIGN.md`를 따른다.**

- 위치: `DESIGN.md` (이 레포 루트, feasiblelab-web 전용 — 2026.08 글래스모피즘 리뱀프로 별도 가이드라인 레포에서 이관)
- Claude 커맨드: `/feasiblelab-design`
- 다른 피저블랩 산출물(포춘텔러, jammae, research.feasible.kr 등)은 이 문서를 따를 의무 없음 — 제품마다 각자 톤을 가져감

핵심 규칙:
- 메인 컬러: `#0047FF` (`--ef-blue`), 다크 배경 위 텍스트/accent는 `#3B6BFF` (`--ef-blue-bright`)
- 배경: 다크(`#05060D`) + 고정 radial-gradient 블롭 (light-on-white가 아니라 light-on-dark가 기본값)
- 폰트: Roboto + Noto Sans KR (UI), DM Serif Display (워드마크)
- CSS 토큰 prefix: `--ef-*`
- 카드/네비/stat grid는 글래스 패널(`--ef-glass-*` 토큰: 반투명 배경 + blur + border) 기본 적용, CTA 버튼만 예외적으로 solid 유지
- 섹션 제목: `제목<span class="accent">.</span>` 패턴 (파란 마침표)
- eyebrow 라벨: `<span class="num">01</span> 섹션명` 패턴
- 버튼 클래스: `.btn--brand` (파랑 solid), `.btn--solid` (흰색 solid), `.btn--ghost` (glass 외곽선)
- 브레이크포인트: 480px / 880px
- Hero·Contact 섹션: blob SVG를 blur(70~90px) 먹인 오로라 글로우로 사용

## 콘텐츠 원칙
- 톤: `합니다` 체, 직접적, 과장 없이
- "왜 하는지"를 항상 포함
- 피저블랩스 인벤토리 참조: `/home/tony/Documents/obsidian_cloud/2. Feasible lab/00. 피저블랩 인벤토리.md`

## 배포
```bash
git add .
git commit -m "..."
git push origin main
```
push 하면 Cloudflare Pages가 자동으로 빌드·배포한다. wrangler 명령 불필요.

## nginx 설정 변경 시
sudo 필요 — `! sudo ...` 형태로 실행.
설정 파일: `/etc/nginx/sites-available/feasiblelab`
