import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { defaultMapImageUrl } from 'notion-utils';
import {
  getPageRecordMap,
  downloadBlockImages,
  PORTFOLIO_PAGE_ID,
} from '../lib/notion';

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then(
    (m) => m.Equation
  )
);

export async function getStaticProps() {
  const recordMap = await getPageRecordMap(PORTFOLIO_PAGE_ID);
  const imageMap = await downloadBlockImages(recordMap);
  return {
    props: {
      recordMap,
      imageMap,
    },
  };
}

export default function PortfolioPage({ recordMap, imageMap }) {
  const [activeCategory, setActiveCategory] = useState('all');

  if (!recordMap) return null;

  const mapImageUrl = (url, block) =>
    imageMap[block.id] || defaultMapImageUrl(url, block);

  // Structured Projects Data for Executive 2.0 View
  const projects = [
    {
      id: 'bloomingbit-ai',
      category: 'ai',
      domainBadge: 'AI × PM',
      title: '블루밍비트 — AI 애널리스트',
      subtitle: '"뉴스 요약"에서 "투자 방향성 제시"로 서비스 전환, 가입자 및 리텐션 급증',
      problem: '기존 AI는 단순 3줄 뉴스 요약에 그침. 유저는 "그래서 시장이 어떻게 반응할까?"에 대한 답을 얻지 못해 이탈 발생.',
      hypothesis: '뉴스 + 시장 지표(RSI·금리·CPI 등) 결합 퀀티멘털 분석을 제공하고, 핵심 수치를 가입 후 공개하면 높은 가입 전환 트리거로 작동함.',
      solution: '다중 프롬프트 아키텍처(Summary & Insight 분리) 및 시장 지표 파이프라인 구축. 비로그인 방향성 공개 / 로그인 수치 상세 잠금 구조 설계.',
      metrics: [
        { label: '일평균 신규 가입', val: '5명 → 33명', highlight: '+560%' },
        { label: 'AI 분석 진입 비중', val: '평균 32%', highlight: '3명 중 1명' },
        { label: 'W1 코호트 리텐션', val: '7%대 방어', highlight: '회복' },
        { label: '하락장 실사용자(uReal)', val: '+13.94%', highlight: '시장 탈피' },
      ],
      img: '/portfolio/notion-assets/36cd9c3a-5cb8-80e9-9d11-e3bc5f848f0a.png',
      press: null,
    },
    {
      id: 'bloomingbit-alpha',
      category: 'ai',
      domainBadge: 'AGENTIC AI',
      title: '블루밍비트 알파 — 기관용 Agentic AI 인텔리전스 플랫폼',
      subtitle: 'Agentic AI 분석 플랫폼 구조 설계 및 프로토타입 직접 개발, 기관 알파 서비스 운영',
      problem: '기관 트레이더들은 시황 파악을 위해 수십 개 탭을 매일 수동 종합해야 함. 전담 애널리스트 없이 종합 리포트 작성이 어려움.',
      hypothesis: '멀티 에이전트 AI가 거시·차트·뉴스·온체인 데이터를 독자 분석 후 종합 리포트를 생성하면 기관급 리서치 인텔리전스 제공 가능.',
      solution: 'CrewAI 기반 멀티 에이전트 구조 설계. Python Flask 프로토타입(research.feasible.kr) 바이브코딩 직접 개발 후 프레스토랩스, 메리츠증권, 신한은행 등 파일럿 제공.',
      metrics: [
        { label: '기관 알파 서비스', val: '주요 기관 온보딩', highlight: '운영 중' },
        { label: '언론 보도', val: '한국경제 단독 보도', highlight: '2026.04' },
      ],
      img: '/portfolio/notion-assets/36cd9c3a-5cb8-80a8-b0f7-c7679c870524.png',
      press: {
        title: "기관용 투자 AI 플랫폼 '블루밍비트 알파' 출시",
        media: "한국경제",
        url: "https://www.hankyung.com/article/2026042961826"
      }
    },
    {
      id: 'spec-qa-ai',
      category: 'ai',
      domainBadge: 'AI × QA',
      title: '코드 기반 Product Spec 검증 + AI 에이전트 QA 자동화',
      subtitle: '코드 대조로 제품 스펙 확립 및 AI 에이전트 기반 E2E QA 테스트케이스 자동화',
      problem: '초기 합류 시 개발 문서·백로그 무존재. 대표 구두 전달 체계로 기능 회귀 감지 불가.',
      hypothesis: '코드베이스 대조 역추적으로 단일 신뢰 출처(Single Source of Truth)를 도출하고, AI 에이전트로 테스트케이스를 자동화함.',
      solution: 'Codebase reverse-spec 도출 & AI 에이전트 시나리오 파이프라인 구축.',
      metrics: [
        { label: 'QA 테스트케이스', val: '814개+ 자동화', highlight: 'E2E 완료' },
      ],
      img: null,
      press: null,
    },
    {
      id: 'crypto-bot',
      category: 'ai',
      domainBadge: 'AI BOT',
      title: 'AI 에이전트와 실거래 자동매매 봇 공동 운영',
      subtitle: '가설 검증 플랫폼(Feasible Research) 운영 및 알고리즘 검증',
      problem: '기획 가설과 실제 금융/트레이딩 시장 실행 간의 괴리 존재.',
      hypothesis: '자율 에이전트와 실거래 봇을 함께 가동하여 기획 구조의 실사용 피드백 루프를 검증함.',
      solution: 'Python & Claude API 기반 실거래 자동매매 봇 가동 및 실시간 모니터링 파이프라인 구축.',
      metrics: [
        { label: '실거래 데이터 피드백', val: '100% 직접 검증', highlight: '운영 중' },
      ],
      img: null,
      press: null,
    },
    {
      id: 'coinone-krw',
      category: 'fintech',
      domainBadge: 'FINTECH',
      title: '코인원 — 원화 입출금 레거시 전면 재구축 & 카카오뱅크 연동',
      subtitle: '핀테크 가상자산 거래소 핵심 입출금 뱅킹 시스템 재설계',
      problem: '기존 레거시 입출금 모듈의 트랜잭션 병목 및 카카오뱅크 실명계좌 신규 연동 필수.',
      hypothesis: '트랜잭션 격리 구조와 은행 가상계좌 뱅킹 파이프라인을 재설계하면 무장애 입출금 구현 가능.',
      solution: '카카오뱅크 연동 전용 아키텍처 재구축 및 가상계좌 실시간 트랜잭션 동시성 보장.',
      metrics: [
        { label: '카카오뱅크 연동', val: '성공적 릴리즈', highlight: '무장애' },
        { label: '원화 입출금 가용성', val: '99.99%', highlight: '안정화' },
      ],
      img: null,
      press: null,
    },
    {
      id: 'sixshop-selleree',
      category: 'commerce',
      domainBadge: 'COMMERCE SaaS',
      title: '식스샵 — 셀러리(Selleree) 릴리즈 및 운영',
      subtitle: '이커머스 셀러 멀티쇼핑몰 통합 관리 솔루션',
      problem: '소상공인 셀러의 다채널 상품 등록/재고 동기화 수동 작업으로 극심한 공수 발생.',
      hypothesis: '통합 재고/주문 관리 B2B SaaS를 제공하면 셀러 이탈을 막고 LTV 증대 가능.',
      solution: '셀러리(Selleree) 1-pager/PRD 작성, UX 설계 및 성공적 릴리즈.',
      metrics: [
        { label: '식스샵 주요 서비스', val: '셀러 안착 완료', highlight: 'B2B SaaS' },
      ],
      img: null,
      press: null,
    },
    {
      id: 'charan-goods',
      category: 'commerce',
      domainBadge: 'RE-COMMERCE',
      title: '마인이스 (차란) — 잡화 카테고리 런칭',
      subtitle: '명품·의류 리세일 커머스 신규 카테고리 확장',
      problem: '의류에 국한된 상품 라인업으로 유저 당 평균 결제액(ARPU) 증대 한계.',
      hypothesis: '검증된 패션 잡화(가방, 신발, 액세서리) 카테고리 확장 시 신규 매출원 확보.',
      solution: '잡화 전용 검수 기준 정립 및 서비스 카테고리 UX/UI 런칭.',
      metrics: [
        { label: '잡화 매출 비중', val: '전체 매출 20%+', highlight: '신규 창출' },
      ],
      img: null,
      press: null,
    },
    {
      id: 'cgex-global',
      category: 'fintech',
      domainBadge: 'GLOBAL CRYPTO',
      title: '코인원 — CGEX 글로벌 암호화폐 거래소 런칭',
      subtitle: '글로벌 투자자를 위한 암호화폐 오더북 거래 플랫폼',
      problem: '글로벌 크립토 시장 대응을 위한 다국어/글로벌 전용 거래소 런칭 필요.',
      hypothesis: '글로벌 인프라 기반 단일 오더북 연동 구조 구축으로 글로벌 유저 확보.',
      solution: 'CGEX UI/UX 설계 및 글로벌 규제 준수 아키텍처 구축.',
      metrics: [
        { label: '글로벌 거래소', val: '성공적 릴리즈', highlight: '글로벌' },
      ],
      img: null,
      press: null,
    }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const toolCategories = [
    {
      name: '🤖 AI 활용 & 자율 에이전트',
      tools: ['OpenClaw', 'Claude 3.7', 'ChatGPT', 'NotebookLM', 'n8n', 'CrewAI']
    },
    {
      name: '⚡ AI 프로토타이핑 & 바이브코딩',
      tools: ['Claude Code', 'Codex', 'Gemini', 'Cursor', 'Antigravity']
    },
    {
      name: '📊 데이터 분석 & 실험',
      tools: ['Amplitude', 'Google Analytics 4', 'Redash', 'Heap', 'Google Tag Manager', 'Hotjar']
    },
    {
      name: '📋 프로덕트 문서 & 로드맵',
      tools: ['Confluence', 'Notion', 'Linear', 'JIRA', 'Trello', 'Claude Cowork', 'User Story Mapping']
    },
    {
      name: '🎨 협업 & 프로토타이핑 디자인',
      tools: ['Figma', 'FigJam', 'Mural']
    }
  ];

  const lectureVenues = [
    'GS그룹', '그로우앤베터', 'IBK창공', '마크엔컴퍼니', 'SBA DT School'
  ];

  const articles = [
    {
      num: '01',
      title: '저도 AI 씁니다, 꽤 많이',
      tag: 'AI × PM',
      url: 'https://brunch.co.kr/@tsp/87'
    },
    {
      num: '02',
      title: 'AI 도입률 100%의 함정',
      tag: 'AI × PM',
      url: 'https://brunch.co.kr/@tsp/86'
    },
    {
      num: '03',
      title: 'PM에게 \'클로드 코드\'보다 중요한 것',
      tag: 'AI × PM',
      url: 'https://brunch.co.kr/@tsp/81'
    },
    {
      num: '04',
      title: '1분기 로드맵, 또 밀렸나요? \'만들 것\' 말고 \'해결할 것\'을 적으세요',
      tag: '퍼블리',
      url: 'https://publy.co/content/8065'
    },
    {
      num: '05',
      title: '10년차 PM이 알려주는, 고객을 가장 잘 아는 PM이 되는 방법',
      tag: '퍼블리',
      url: 'https://publy.co/content/6910'
    }
  ];

  return (
    <>
      <Head>
        <title>포트폴리오 · Antony Park (박세호) — Feasible Lab</title>
        <meta
          name="description"
          content="11년차 Product Lead 박세호(Antony Park)의 대표 프로젝트, AI 서비스 성과 및 경력 포트폴리오"
        />
        <meta property="og:title" content="포트폴리오 · Antony Park (박세호) — Feasible Lab" />
        <meta property="og:description" content="11년차 Product Lead 박세호(Antony Park)의 대표 프로젝트, AI 서비스 성과 및 경력 포트폴리오" />
      </Head>

      <header className="nav">
        <div className="wrap wrap--wide nav-inner">
          <a href="https://feasible.kr" className="wm">
            <span>feasible&nbsp;lab</span>
            <span className="dot" />
          </a>
          <div className="nav-actions">
            <a href="mailto:seaho022@gmail.com" className="nav-cta-btn">
              문의하기 ↗
            </a>
            <a href="https://feasible.kr" className="nav-back">
              ← 홈으로
            </a>
          </div>
        </div>
      </header>

      {/* Executive Hero Banner */}
      <section className="pf-hero">
        <div className="wrap pf-hero-inner">
          <div className="pf-hero-badge">
            <span className="pf-hero-dot"></span>
            <span>Product Leader &amp; AI Builder</span>
          </div>

          <h1 className="pf-hero-title">
            문제를 정의하고<span className="pf-blue">,</span><br />
            팀이 실행하는 구조를 만듭니다<span className="pf-blue">.</span>
          </h1>

          <p className="pf-hero-bio">
            <strong>박세호 (Antony Park)</strong> · 11년차 Product Lead<br />
            핀테크, AI 미디어, 커머스, B2B SaaS 등 6개 프로덕트 팀을 리딩하며 가설 검증과 데이터 기반 의사결정으로 성과를 증명해왔습니다.
          </p>

          <div className="pf-hero-stats">
            <div className="pf-stat-card">
              <span className="pf-stat-val">11<small>년+</small></span>
              <span className="pf-stat-lbl">Product Leadership</span>
            </div>
            <div className="pf-stat-card">
              <span className="pf-stat-val">6<small>개</small></span>
              <span className="pf-stat-lbl">프로덕트 팀 리딩</span>
            </div>
            <div className="pf-stat-card">
              <span className="pf-stat-val">6.6<small>배</small></span>
              <span className="pf-stat-lbl">AI 가입자 성과 성장</span>
            </div>
            <div className="pf-stat-card">
              <span className="pf-stat-val">814<small>개+</small></span>
              <span className="pf-stat-lbl">AI 에이전트 QA 자동화</span>
            </div>
          </div>

          <div className="pf-hero-links">
            <a href="mailto:seaho022@gmail.com" className="pf-link-pill pf-link-pill--primary">
              ✉️ seaho022@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/tonyseahopark" target="_blank" rel="noopener noreferrer" className="pf-link-pill">
              LinkedIn ↗
            </a>
            <a href="https://brunch.co.kr/@tsp" target="_blank" rel="noopener noreferrer" className="pf-link-pill">
              Brunch ↗
            </a>
            <a href="https://github.com/seahopark" target="_blank" rel="noopener noreferrer" className="pf-link-pill">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Quick Nav */}
      <nav className="pf-sticky-nav">
        <div className="wrap pf-sticky-nav-inner">
          <a href="#sec-projects">01 대표 프로젝트</a>
          <a href="#sec-tools">02 Skills &amp; Tools</a>
          <a href="#sec-lectures">03 강의처 &amp; 아티클</a>
          <a href="#sec-notion">04 상세 노션 이력</a>
          <a href="#sec-contact">05 Contact</a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="portfolio-main">
        <div className="wrap portfolio-wrap">

          {/* Section 01: 대표 프로젝트 2.0 (4-box Grid View) */}
          <section id="sec-projects" className="pf-sec">
            <div className="pf-sec-head">
              <span className="pf-eyebrow">01 FEATURED PROJECTS</span>
              <h2 className="pf-sec-title">대표 프로젝트 성과<span className="pf-blue">.</span></h2>
              <p className="pf-sec-desc">
                문제 정의부터 가설 설정, 해결 방식, 그리고 데이터로 증명된 성과 4단계 구조화입니다.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="pf-filter-tabs">
              <button
                className={`pf-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                전체 프로젝트 ({projects.length})
              </button>
              <button
                className={`pf-filter-btn ${activeCategory === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveCategory('ai')}
              >
                🤖 AI &amp; Agentic ({projects.filter(p=>p.category==='ai').length})
              </button>
              <button
                className={`pf-filter-btn ${activeCategory === 'fintech' ? 'active' : ''}`}
                onClick={() => setActiveCategory('fintech')}
              >
                💳 핀테크/금융 ({projects.filter(p=>p.category==='fintech').length})
              </button>
              <button
                className={`pf-filter-btn ${activeCategory === 'commerce' ? 'active' : ''}`}
                onClick={() => setActiveCategory('commerce')}
              >
                🛒 커머스 &amp; SaaS ({projects.filter(p=>p.category==='commerce').length})
              </button>
            </div>

            {/* Project Card List */}
            <div className="pf-projects-list">
              {filteredProjects.map((proj) => (
                <div key={proj.id} className="pf-project-card">
                  <div className="pf-card-head">
                    <span className="pf-domain-badge">{proj.domainBadge}</span>
                    <h3 className="pf-card-title">{proj.title}</h3>
                    <p className="pf-card-subtitle">{proj.subtitle}</p>
                  </div>

                  {/* 4-Box Structured Grid */}
                  <div className="pf-4box-grid">
                    <div className="pf-box-item pf-box-item--problem">
                      <span className="pf-box-tag">🔴 PROBLEM (문제)</span>
                      <p>{proj.problem}</p>
                    </div>
                    <div className="pf-box-item pf-box-item--hypothesis">
                      <span className="pf-box-tag">💡 HYPOTHESIS (가설)</span>
                      <p>{proj.hypothesis}</p>
                    </div>
                    <div className="pf-box-item pf-box-item--solution">
                      <span className="pf-box-tag">⚙️ SOLUTION (해결)</span>
                      <p>{proj.solution}</p>
                    </div>
                    <div className="pf-box-item pf-box-item--result">
                      <span className="pf-box-tag">📈 RESULT (결과 &amp; 성과)</span>
                      <div className="pf-metrics-list">
                        {proj.metrics.map((m, idx) => (
                          <div key={idx} className="pf-metric-pill">
                            <span className="pf-metric-lbl">{m.label}:</span>
                            <span className="pf-metric-val">{m.val}</span>
                            {m.highlight && <span className="pf-metric-badge">{m.highlight}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Press Link if available */}
                  {proj.press && (
                    <div className="pf-press-banner">
                      <span className="pf-press-badge">NEWSPAPER</span>
                      <span className="pf-press-text">관련 기사: <strong>{proj.press.title}</strong> ({proj.press.media})</span>
                      <a href={proj.press.url} target="_blank" rel="noopener noreferrer" className="pf-press-link">
                        기사 읽기 ↗
                      </a>
                    </div>
                  )}

                  {/* Image Preview if available */}
                  {proj.img && (
                    <div className="pf-card-image-wrap">
                      <img src={proj.img} alt={proj.title} loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 02: Skills & Toolset Tag Cloud */}
          <section id="sec-tools" className="pf-sec">
            <div className="pf-sec-head">
              <span className="pf-eyebrow">02 SKILLS &amp; TOOLSET</span>
              <h2 className="pf-sec-title">주요 기술 스택 &amp; 도구<span className="pf-blue">.</span></h2>
              <p className="pf-sec-desc">
                AI 에이전트 빌딩부터 데이터 분석, 프로덕트 관리 도구까지 직접 활용하는 역량 체계입니다.
              </p>
            </div>

            <div className="pf-tool-categories">
              {toolCategories.map((cat, idx) => (
                <div key={idx} className="pf-tool-cat-card">
                  <h4 className="pf-tool-cat-title">{cat.name}</h4>
                  <div className="pf-tag-cloud">
                    {cat.tools.map((tool, tIdx) => (
                      <span key={tIdx} className="pf-tool-chip">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 03: Corporate Lectures & Media Articles */}
          <section id="sec-lectures" className="pf-sec">
            <div className="pf-sec-head">
              <span className="pf-eyebrow">03 THOUGHT LEADERSHIP &amp; LECTURES</span>
              <h2 className="pf-sec-title">기업 강연 &amp; 인사이트 연재<span className="pf-blue">.</span></h2>
              <p className="pf-sec-desc">
                팀과 제품, AI 에이전트에 관한 경험과 지식을 강의와 글로 나누고 있습니다.
              </p>
            </div>

            {/* Lecture Venue Brand Pills */}
            <div className="pf-venue-block">
              <span className="pf-venue-label">주요 기업 및 기관 강의처</span>
              <div className="pf-venue-pills">
                {lectureVenues.map((venue, idx) => (
                  <div key={idx} className="pf-venue-pill">
                    <span className="pf-venue-icon">🏛️</span>
                    <span>{venue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="pf-articles-grid">
              {articles.map((art, idx) => (
                <a key={idx} href={art.url} target="_blank" rel="noopener noreferrer" className="pf-article-card">
                  <div className="pf-art-head">
                    <span className="pf-art-num">— {art.num}</span>
                    <span className="pf-art-tag">{art.tag}</span>
                  </div>
                  <h4 className="pf-art-title">{art.title}</h4>
                  <span className="pf-art-link">글 읽기 ↗</span>
                </a>
              ))}
            </div>
          </section>

          {/* Section 04: Original Notion Detail Record */}
          <section id="sec-notion" className="pf-sec">
            <div className="pf-sec-head">
              <span className="pf-eyebrow">04 FULL NOTION RECORD</span>
              <h2 className="pf-sec-title">상세 이력 및 원문 레코드<span className="pf-blue">.</span></h2>
              <p className="pf-sec-desc">
                Notion 실시간 원문 데이터로 상세 이력과 경력사항을 확인하실 수 있습니다.
              </p>
            </div>

            <div className="pf-notion-container">
              <NotionRenderer
                recordMap={recordMap}
                mapImageUrl={mapImageUrl}
                fullPage={false}
                darkMode={false}
                disableHeader
                components={{
                  Collection,
                  Equation,
                }}
              />
            </div>
          </section>

        </div>
      </main>

      {/* Executive Contact Section */}
      <section className="pf-contact-section" id="sec-contact">
        <div className="wrap pf-contact-inner">
          <span className="pf-contact-eyebrow">CONTACT &amp; COLLABORATION</span>
          <h2 className="pf-contact-heading">
            강의 · 협업 · 채용 문의<br />
            편하게 연락주세요<span className="pf-blue">.</span>
          </h2>
          <p className="pf-contact-desc">
            프로덕트 리더십, AI 에이전트 서비스 설계, 팀 소통 및 워크샵에 관련하여 궁금한 점이 있으시면 1~2일 내에 답장드립니다.
          </p>
          <div className="pf-contact-cta-row">
            <a href="mailto:seaho022@gmail.com" className="pf-btn pf-btn--solid">
              ✉️ 이메일 문의 (seaho022@gmail.com) ↗
            </a>
            <a href="https://www.linkedin.com/in/tonyseahopark" target="_blank" rel="noopener noreferrer" className="pf-btn pf-btn--ghost">
              LinkedIn 프로필 ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="portfolio-footer">
        <div className="wrap portfolio-footer-inner">
          <span>© {new Date().getFullYear()} Antony Park (박세호) · Feasible Lab. All rights reserved.</span>
          <a href="https://feasible.kr" target="_blank" rel="noopener noreferrer">feasible.kr ↗</a>
        </div>
      </footer>
    </>
  );
}
