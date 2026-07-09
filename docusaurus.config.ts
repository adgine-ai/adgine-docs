import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Adgine 文档',
  tagline: '生成式引擎优化（GEO）产品使用手册',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://adgine.ai',
  baseUrl: '/docs/',

  organizationName: 'adgine',
  projectName: 'Adgine-Docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'zh-TW', 'en'],
    localeConfigs: {
      zh: {
        label: '简体中文',
        htmlLang: 'zh-Hans',
      },
      'zh-TW': {
        label: '繁體中文',
        htmlLang: 'zh-Hant',
      },
      en: {
        label: 'English',
        htmlLang: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/adgine/Adgine-Docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/adgine-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Adgine 文档',
      logo: {
        alt: 'Adgine',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://platform.adgine.ai',
          label: '登录平台',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '快速入门', to: '/getting-started/quick-start'},
            {label: '新用户向导', to: '/getting-started/onboarding-wizard'},
            {label: '术语表', to: '/appendix/glossary'},
          ],
        },
        {
          title: '产品',
          items: [
            {label: 'Adgine 平台', href: 'https://platform.adgine.ai'},
            {label: 'Adgine 官网', href: 'https://adgine.ai'},
            {
              label: 'PDF 使用手册',
              href: 'https://docs.adgine.ai/files/Adgine使用手册-v20260531.pdf',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {label: '更新日志', to: '/appendix/changelog'},
            {label: 'GitHub', href: 'https://github.com/adgine/Adgine-Docs'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Adgine. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
