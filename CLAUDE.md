# Feasible Labs Web — Claude 가이드

## 프로젝트
피저블랩스 공식 랜딩 페이지.
- 경로: `/home/tony/Documents/github/feasiblelab-web`
- 서빙: nginx → `http://localhost:8080`
- 배포: GitHub push → Cloudflare Pages (Actions)

## 디자인 시스템
**반드시 피저블랩스 디자인 시스템을 따른다.**
스펙 문서: `/home/tony/Documents/github/feasiblelab-design-system.md`

요약:
- 메인 컬러: `#0047FF` (--ef-blue)
- 폰트: Roboto + Noto Sans KR (UI), DM Serif Display (워드마크)
- CSS 토큰 prefix: `--ef-*`
- 섹션 제목 패턴: `제목<span class="accent">.</span>`
- Eyebrow 패턴: `<span class="eyebrow"><span class="num">01</span> 섹션명</span>`
- 버튼: `.btn--brand` (파랑), `.btn--solid` (검정), `.btn--ghost` (외곽선)

## 콘텐츠 원칙
- 톤: `합니다` 체, 직접적, 과장 없이
- "왜 하는지"를 항상 포함
- 피저블랩스 인벤토리: `/home/tony/Documents/obsidian_cloud/2. Feasible lab/00. 피저블랩 인벤토리.md`

## nginx 설정 변경 시
sudo 필요. 사용자에게 `! sudo ...` 형태로 안내.
