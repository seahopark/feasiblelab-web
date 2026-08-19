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

      <footer className="portfolio-footer">
        <div className="wrap">
          <span>© {new Date().getFullYear()} Antony Park · Feasible Lab</span>
        </div>
      </footer>
    </>
  );
}
