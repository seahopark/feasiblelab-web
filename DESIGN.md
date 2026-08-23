# Feasible Lab · Design System

**이 문서는 feasiblelab-web(피저블랩 스튜디오 랜딩/포트폴리오 사이트) 전용 디자인 언어다.**
포춘텔러, jammae, research.feasible.kr, 글로우매치 등 개별 서비스는 각자 목적에 맞는 별도 디자인을 가져가며 이 문서를 따를 의무가 없다 — 제품마다 톤이 다른 게 실제 운영 방식이라, 이 문서는 "모든 산출물의 글로벌 시스템"이 아니라 이 레포(feasiblelab-web) 하나의 스펙으로 스코프를 좁혔다 (2026.08).

기준: 2026.08 글래스모피즘 리뱀프

---

## 1. 브랜드 아이덴티티

### 워드마크
- 폰트: `DM Serif Display` (serif)
- 스타일: 고딕 wordmark + 파란 dot (·), dot에 은은한 glow(box-shadow) 적용
- HTML 패턴:
  ```html
  <a href="#" class="wm">
    <span>feasible&nbsp;lab</span><span class="dot"></span>
  </a>
  ```
- dot 색상: `#4C8CFF` (다크 배경 대비 위해 기존 `#0057FF`보다 밝게 조정)
- 어느 배경 위에서든 `.wm.invert` 없이도 통일된 밝은 색 사용 (다크 배경이 기본값이 됐기 때문)

---

## 2. 색상 토큰

### 브랜드 컬러
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ef-blue` | `#0047FF` | 메인 강조색, CTA 배경, 브랜드 그라디언트 시작색 |
| `--ef-blue-deep` | `#0500FF` | hover, 진한 강조 |
| `--ef-blue-bright` | `#3B6BFF` | 다크 배경 위 텍스트/링크/accent 전용 (대비 확보) |
| `--ef-blue-tint` | `rgba(59,107,255,0.14)` | 배경 틴트 |
| `--ef-blue-soft` | `#1A52E2` | 부드러운 강조 |
| `--ef-blue-violet` | `#6C5CE7` | 보조 강조, 배경 그라디언트/blob 2번째 색 |
| `--ef-blue-dot` | `#4C8CFF` | 워드마크 dot |

### 중성 색상
| 토큰 | 값 |
|---|---|
| `--ef-black` | `#000000` |
| `--ef-ink` | `#05060D` |
| `--ef-graphite` | `#0B0E1A` |
| `--ef-white` | `#FFFFFF` |

### 전경색 (Foreground) — light-on-dark
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ef-fg-1` | `#FFFFFF` | 제목, 주요 텍스트 |
| `--ef-fg-2` | `rgba(255,255,255,0.62)` | 본문, 설명 텍스트 |
| `--ef-fg-3` | `rgba(255,255,255,0.32)` | 보조, 힌트 |
| `--ef-fg-on-blue` | `#FFFFFF` | 파란/그라디언트 배경 위 텍스트 |

> 2026.08 리뱀프로 기본 톤이 **light-on-white → light-on-dark**로 전환됐다. 모든 신규 섹션은 다크 배경 + 흰색 텍스트를 기본값으로 한다.

### 배경색
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ef-bg` | `#05060D` | 기본 배경 (거의 검정, 미세한 네이비 틴트) |
| `--ef-bg-muted` | `rgba(255,255,255,0.03)` | 섹션 구분용 미세 오버레이 |
| `--ef-bg-brand` | `#0047FF` | Contact 등 브랜드 그라디언트 시작색 |

### 배경 그라디언트 (핵심 — 글래스 효과의 전제조건)
글래스모피즘은 배경에 색과 명암 차가 있어야 성립한다. `body`에 고정(`background-attachment: fixed`) radial-gradient 레이어를 깔고 그 위에 모든 콘텐츠가 얹힌다.
```css
body {
  background-color: #05070f;
  background-image:
    radial-gradient(1100px 760px at 12% -8%, rgba(0,71,255,0.38), transparent 58%),
    radial-gradient(900px 680px at 88% 10%, rgba(108,92,231,0.30), transparent 55%),
    radial-gradient(1000px 900px at 50% 55%, rgba(0,71,255,0.14), transparent 60%),
    radial-gradient(760px 760px at 92% 92%, rgba(108,92,231,0.20), transparent 55%),
    radial-gradient(620px 620px at 5% 85%, rgba(59,107,255,0.16), transparent 55%);
  background-attachment: fixed;
  background-repeat: no-repeat;
}
```
섹션마다 별도 solid 배경(`--ef-bg-muted` 등)을 칠하지 않고, 이 배경 위에 카드/패널만 얹어서 시각적 리듬을 준다.

### 유리 표면 (Glass surface)
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ef-glass-bg` | `rgba(255,255,255,0.06)` | 카드/패널 기본 배경 |
| `--ef-glass-bg-hover` | `rgba(255,255,255,0.09)` | hover 시 배경 |
| `--ef-glass-border` | `rgba(255,255,255,0.14)` | 카드/패널 테두리 |
| `--ef-glass-border-strong` | `rgba(255,255,255,0.34)` | hover 시 테두리 |
| `--ef-glass-shadow` | `0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.09)` | depth + 상단 하이라이트 |
| `--ef-glass-blur` | `20px` | `backdrop-filter: blur()` 값 |

카드류(work/lab card, topic card, venue row, stat grid 등)는 아래 패턴을 기본으로 한다:
```css
.glass-surface {
  background: var(--ef-glass-bg);
  border: 1px solid var(--ef-glass-border);
  border-radius: var(--ef-radius-md);
  backdrop-filter: blur(var(--ef-glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--ef-glass-blur)) saturate(160%);
  box-shadow: var(--ef-glass-shadow);
  transition: border-color .2s, transform .2s, box-shadow .2s, background .2s;
}
.glass-surface:hover {
  border-color: var(--ef-glass-border-strong);
  background: var(--ef-glass-bg-hover);
  transform: translateY(-4px);
}
```
CTA 버튼(`.btn--brand`, `.btn--solid`)은 예외적으로 **solid 유지** — 유리 배경 위에서 행동 유도 요소까지 반투명이면 클릭 유도력이 떨어진다.

### 테두리
| 토큰 | 값 |
|---|---|
| `--ef-border-1` | `rgba(255,255,255,0.08)` |
| `--ef-border-2` | `rgba(255,255,255,0.14)` |
| `--ef-border-strong` | `rgba(255,255,255,0.5)` |

---

## 3. 타이포그래피

### 폰트 패밀리
| 토큰 | 값 | 용도 |
|---|---|---|
| `--ef-font-wordmark` | `"DM Serif Display", serif` | 워드마크 전용 |
| `--ef-font-ui` | `"Roboto", "Noto Sans KR", sans-serif` | UI 전반 |
| `--ef-font-mono` | `ui-monospace, "SF Mono", Menlo` | 번호, 코드, 날짜 |

### 임포트
```css
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=DM+Serif+Display&family=Noto+Sans+KR:wght@400;500;700&display=swap");
```

### 타입 스케일
| 클래스 | 크기 | 용도 |
|---|---|---|
| `.display` (h1) | `clamp(56px, 8vw, 112px)` | Hero 제목 |
| `.h2` | `44px` (섹션 제목), `56–64px` (about) | 섹션 제목 |
| `.body` | `18px / line-height 1.65` | 본문 설명 |
| `.eyebrow` | `13px / uppercase / 0.16em spacing` | 섹션 레이블 |
| 카드 제목 | `28px / weight 700 / -0.04em` | 카드 h3 |
| 소제목 | `22px / weight 700 / -0.03em` | 리스트 아이템 |
| 캡션/모노 | `12–13px` | 번호, 날짜 |

모든 본문/제목 텍스트는 기본적으로 `#fff` 또는 `--ef-fg-2`(반투명 흰색)를 쓴다. 검정 텍스트는 더 이상 기본값이 아니다.

### Eyebrow 패턴
```html
<span class="eyebrow"><span class="num">01</span> 섹션명</span>
```
`.eyebrow`는 `--ef-blue-bright`, `.num`은 `rgba(255,255,255,0.4)`.

---

## 4. 간격 (Spacing)

| 토큰 | 값 |
|---|---|
| `--ef-space-1` | `4px` |
| `--ef-space-2` | `8px` |
| `--ef-space-3` | `12px` |
| `--ef-space-4` | `16px` |
| `--ef-space-6` | `24px` |
| `--ef-space-8` | `32px` |
| `--ef-space-10` | `40px` |
| `--ef-space-14` | `56px` |
| `--ef-space-20` | `80px` |
| `--ef-space-30` | `120px` |

섹션 패딩: `140px 0` (상하)

---

## 5. 레이아웃

### 컨테이너
```css
.wrap       { max-width: 1080px; margin: 0 auto; padding: 0 40px; }
.wrap--wide { max-width: 1280px; }
```

### 그리드
- 2열: `grid-template-columns: 1fr 1fr; gap: 24px`
- 3열: `grid-template-columns: repeat(3, 1fr); gap: 24px`
- About: `grid-template-columns: 1fr 1.1fr; gap: 80px`
- 반응형 브레이크포인트: `880px` → 1열

---

## 6. 컴포넌트

### 버튼
```html
<!-- 주요 CTA (파란색, solid 유지 + glow) -->
<a class="btn btn--brand">문구 <span class="arr">↗</span></a>

<!-- 보조 CTA (흰색 solid) -->
<a class="btn btn--solid">문구</a>

<!-- 외곽선 (glass ghost) -->
<a class="btn btn--ghost">문구</a>
```
- 패딩: `16px 26px`
- border-radius: `10px` (`--ef-radius-sm`)
- font-weight: `700`
- `.btn--brand`: `background: var(--ef-blue)`, `box-shadow: 0 6px 24px rgba(0,71,255,0.45)`, hover 시 그림자 강해지고 `translateY(-1px)`
- `.btn--solid`: `background: #fff; color: var(--ef-ink)`
- `.btn--ghost`: `background: var(--ef-glass-bg); border: 1px solid var(--ef-glass-border); backdrop-filter: blur(20px)`

### 카드 (Work/Lab Card, Topic Card) — 글래스 패널
```html
<div class="lab-card">
  <span class="wc-num">— 01</span>
  <h3>제목</h3>
  <p>설명</p>
  <span class="wc-link">링크 →</span>
</div>
```
- 배경: `var(--ef-glass-bg)`
- 테두리: `1px solid var(--ef-glass-border)`, hover시 `--ef-glass-border-strong`
- `backdrop-filter: blur(20px) saturate(160%)`
- `box-shadow: var(--ef-glass-shadow)`
- border-radius: `22px` (`--ef-radius-md`, 기존 16px보다 둥글게)
- 패딩: `36px`
- min-height: `260px`
- hover: `translateY(-4px)` + 그림자 강화 (딱딱한 flat 카드가 아니라 살짝 떠 있는 느낌)

### 리스트 행 (Lecture/Career/Post Row)
```html
<div class="lecture-row">
  <span class="lr-num">— 01</span>
  <div class="lr-title">제목<small>부제목</small></div>
</div>
```
- 기본 상태는 투명, **hover 시에만** `var(--ef-glass-bg)` + `var(--ef-glass-border)` + blur가 나타나는 방식 (구분선 대신 hover 하이라이트로 리스트 리듬을 준다)
- 번호: mono font, `rgba(255,255,255,0.35)`

### 네비게이션
- sticky + backdrop blur (기존과 동일한 패턴, 색만 다크로 전환)
- 높이: `72px`
- 배경: `rgba(6,8,16,0.55)` + `backdrop-filter: saturate(180%) blur(20px)`
- 테두리: `1px solid var(--ef-glass-border)`

### Hero / Contact Blob (SVG 장식 → 오로라 글로우)
```html
<svg class="hero-blob" viewBox="0 0 1295 1295" fill="currentColor" aria-hidden="true">
  <path d="M 1056.608 647.5 C 1202.101 580.614 ..."/>
</svg>
```
- 색상: `var(--ef-blue)`
- **opacity 0.45 + `filter: blur(90px)`** — 기존(0.08, blur 없음, 선명한 도형)과 달리 흐릿한 빛 번짐(aurora glow)으로 처리해 유리 패널이 비쳐 보이는 배경 역할을 한다
- 위치: `absolute; right: -260px; top: 40px`
- 태블릿 이하에서는 숨김 (`display: none` at 880px)

### Stat Grid — 글래스 컨테이너
```html
<div class="stat-grid">
  <div class="stat-item">…</div>
</div>
```
- 컨테이너 자체를 하나의 유리 패널로 감싸고(`--ef-glass-bg` + blur + border-radius), 내부 `stat-item`은 `gap: 1px`로 만든 얇은 구분선으로 분리
- 기존처럼 개별 아이템에 border-right/border-top을 긋는 방식에서 → 컨테이너 단위 글래스 카드로 전환

---

## 7. Contact 섹션 패턴

배경: `linear-gradient(135deg, rgba(0,71,255,0.9), rgba(108,92,231,0.85))` (기존 solid blue에서 블루→바이올렛 그라디언트로 전환)
- 모든 텍스트 흰색 계열
- blob SVG 좌하단 배치, `opacity: 0.18` + `filter: blur(70px)`
- 버튼: `.btn--solid`는 흰색 배경 + 블루 텍스트, `.btn--ghost`는 `rgba(255,255,255,0.1)` 배경의 glass 스타일

---

## 8. 톤 & 보이스

- 한국어 기준: `합니다` 체 (공식적이지만 딱딱하지 않게)
- 문장은 짧고 직접적으로
- 섹션 제목은 마침표(`.`) + 파란색 accent 처리
  ```html
  <h2 class="h2">제목<span class="accent">.</span></h2>
  ```
  다크 배경에서는 accent 색상으로 `--ef-blue-bright`(`#3B6BFF`)를 사용한다 (`--ef-blue` 원색은 다크 배경 대비가 약함).
- 숫자 레이블은 모노 폰트로 `— 01` 형식
- "왜 하는지"를 항상 포함 — 맥락 설명 후 결론

---

## 9. 접근성 노트

- 배경이 다크 + 블러 그라디언트이므로, 본문 텍스트는 `--ef-fg-2`(`rgba(255,255,255,0.62)`) 이상의 불투명도를 유지할 것 — 그 이하로 낮추면 블롭이 진한 구간에서 가독성이 떨어진다.
- 유리 패널 위에 올라가는 텍스트는 패널 자체의 `--ef-glass-bg`가 배경 대비를 한 번 보정해주므로 카드 안에서는 흰색 100% 사용 가능.
- `backdrop-filter`를 지원하지 않는 구형 브라우저에서는 `--ef-glass-bg`의 불투명도(0.06)만으로도 최소한의 패널 구분은 유지되도록 값을 설정했다 (fallback 안전장치).

---

## 브랜드 도메인

| 용도 | URL |
|---|---|
| 메인 공식 주소 | `https://feasible.kr` |

- 이 사이트의 홈 링크, 푸터 링크는 `https://feasible.kr` 사용
- `feasiblelab.com` 등 다른 도메인은 사용하지 않음
- 푸터 텍스트 표기: `feasible.kr ↗`
