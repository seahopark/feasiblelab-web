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
  if (!recordMap) return null;

  const mapImageUrl = (url, block) =>
    imageMap[block.id] || defaultMapImageUrl(url, block);

  return (
    <>
      <Head>
        <title>포트폴리오 · Antony Park — Feasible Lab</title>
        <meta
          name="description"
          content="11년차 PM 박세호(Antony Park)의 대표 프로젝트와 경력 포트폴리오"
        />
        <meta property="og:title" content="포트폴리오 · Antony Park — Feasible Lab" />
        <meta property="og:description" content="11년차 PM 박세호(Antony Park)의 대표 프로젝트와 경력 포트폴리오" />
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

      {/* Hero Header Section */}
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

      {/* Sticky Quick Section Navigation Bar */}
      <nav className="pf-sticky-nav">
        <div className="wrap pf-sticky-nav-inner">
          <a href="#36cd9c3a5cb880019460f6b29c7d372f">01 About</a>
          <a href="#36cd9c3a5cb8803e8ae0ce07d9df7751">02 대표 프로젝트</a>
          <a href="#36cd9c3a5cb8808ba04dfe29d4e07b4f">03 Skills &amp; Experience</a>
          <a href="#36cd9c3a5cb8807786e2eaaf3aacb66b">04 Thought Leadership</a>
          <a href="#pf-contact">05 Contact</a>
        </div>
      </nav>

      {/* Main Notion Content */}
      <main className="portfolio-main">
        <div className="wrap portfolio-wrap">
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
      </main>

      {/* Bottom Contact Section */}
      <section className="pf-contact-section" id="pf-contact">
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
              이메일로 문의하기 ↗
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
