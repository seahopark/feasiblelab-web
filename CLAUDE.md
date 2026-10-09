# Feasible Lab 랜딩 페이지 — Claude 가이드

## 서비스 개요
피저블 랩(Feasible Lab)의 공식 사이트. 박세호(Tony)의 포트폴리오로, 협업·강의를 검토하는 방문자에게 무엇을 생각하고 만들고 어떤 문제를 함께 찾는지 빠르게 보여준다.

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
| Nav | 네비게이션 | — | 워드마크 + 생각·만든 것·강의·경력·글 링크 + "문의하기" |
| Hero | 첫 화면 | `#top` | 라벨 + 본론 헤드라인 + 보조 한 줄 + CTA 2개 |
| 01 | 주로 생각하는 것 | `#thinking` | 질문 3개(팀·제품·AI와 PM) + 관련 글 링크 |
| 02 | 만든 것 | `#built` | jammae, 일단, 포춘텔러, Feasible Skills + 상태 칩 |
| 03 | 강의 | `#teaching` | 주제 4개 + 강의처 + 강의 문의 |
| 04 | 경력 | `#career` | 4개 회사(연도만) + 수치 3개 + 포트폴리오 링크 |
| 05 | 글 | `#writing` | 브런치·퍼블리 8편 |
| 문의 | 연락 | `#contact` | 이메일·LinkedIn |
| Footer | 푸터 | — | 개인정보처리방침·이용약관·© |

### 섹션별 주요 콘텐츠

**Hero**
- 헤드라인: "팀과 제품, 그리고 AI로 일하는 방식을 연구하고, 직접 만들고, 문제를 함께 찾습니다." (이름을 헤드라인으로 쓰지 않음)
- 보조: "11년차 PM 박세호가 운영합니다."
- CTA: "강의·협업 문의"(mailto), "만든 것 보기"(#built)

**01 질문**: 팀은 왜 같은 방향으로 가지 못하는가 / 제품은 왜 실패하는가 / AI와 함께 PM은 무엇으로 일하는가

**02 만든 것**: jammae(운영 중), 일단 Ildan(출시 준비 중, 링크 없음), 포춘텔러(운영 중), Feasible Skills(운영 중). research.feasible.kr은 목록에서 뺐다.

**03 강의**: PM 소통법, Discovery & Framing, AI 시대 PM의 역할, AI 에이전트 설계. 강의처 GS그룹·그로우앤베터·IBK창공·마크엔컴퍼니·SBA DT School.

**04 경력**: 블루밍비트 2025~2026 / 마인이스(차란) 2024~2025 / 코인원 2022~2023 / 식스샵 2020~2022. 수치 11년·6개 팀·6.6배.

**05 글**: 브런치 5편, 퍼블리 3편. 외부 링크는 `target="_blank" rel="noopener"` 필수.

**문의**: seho@feasible.kr, linkedin.com/in/tonyseahopark, "이틀 안에 답장드립니다."

## 디자인 시스템
**반드시 이 레포의 `DESIGN.md`를 따른다.** 방향 계약은 `design/direction.md`, 근거는 `PRODUCT.md`.

- Claude 커맨드: `/feasiblelab-design`
- 다른 피저블랩 산출물은 이 문서를 따를 의무 없음

핵심 규칙:
- 밝은 회색 바탕(`#F2F3F5`) + 테두리 있는 흰 패널. 다크·블롭·글래스 사용 금지(2026-10-09 폐기)
- 브랜드 파랑 `#0047FF`(`--ef-blue`)는 CTA·라벨·문의 패널에만
- 폰트: Pretendard Variable(UI), DM Serif Display(워드마크 전용), 라벨·칩은 모노스페이스
- CSS 토큰 prefix: `--ef-*`, 모든 스타일은 `style.css` 한 파일(인라인 style 금지)
- 구조: 패널 헤더(`01` 모노 번호 + h2) + 행 목록, 운영 상태는 칩(`.st.live`, `.st.soon`)
- 브레이크포인트: 760px(내비 한 줄) / 900px(다열 그리드). 모바일 우선
- 워드마크 마크업·CSS는 바꾸지 않는다
- privacy·terms도 같은 `style.css`와 내비·푸터를 쓴다

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
