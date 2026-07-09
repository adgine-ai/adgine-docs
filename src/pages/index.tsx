import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            <Translate id="homepage.getStarted">开始使用</Translate>
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/getting-started/onboarding-wizard">
            <Translate id="homepage.onboarding">新用户向导</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    title: <Translate id="homepage.feature.brand">品牌认知</Translate>,
    description: (
      <Translate id="homepage.feature.brand.desc">
        自动生成品牌画像，让 AI 更准确地理解你的品牌。
      </Translate>
    ),
    link: '/features/brand',
  },
  {
    title: <Translate id="homepage.feature.analytics">可见性分析</Translate>,
    description: (
      <Translate id="homepage.feature.analytics.desc">
        追踪品牌在 ChatGPT、Perplexity 等 AI 平台的表现。
      </Translate>
    ),
    link: '/features/analytics',
  },
  {
    title: <Translate id="homepage.feature.content">内容创作</Translate>,
    description: (
      <Translate id="homepage.feature.content.desc">
        从机会发现到文章发布，一站式 GEO 内容工作流。
      </Translate>
    ),
    link: '/features/content',
  },
  {
    title: <Translate id="homepage.feature.integrations">第三方集成</Translate>,
    description: (
      <Translate id="homepage.feature.integrations.desc">
        连接 GA4、Cloudflare、WordPress 与 Adgine CMS。
      </Translate>
    ),
    link: '/features/integrations/overview',
  },
];

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="doc-card-grid">
          {features.map(({title, description, link}) => (
            <Link key={link} to={link} className="feature-card">
              <Heading as="h3">{title}</Heading>
              <p>{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Adgine GEO 平台产品使用手册：快速入门、功能指南与集成说明。">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
