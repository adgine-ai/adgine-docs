import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '文档首页',
    },
    {
      type: 'category',
      label: '开始',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'getting-started/quick-start',
          label: '快速入门',
        },
        {
          type: 'doc',
          id: 'getting-started/onboarding-wizard',
          label: '新用户向导',
        },
      ],
    },
    {
      type: 'category',
      label: '功能指南',
      collapsed: false,
      items: [
        {type: 'doc', id: 'features/brand', label: '品牌认知'},
        {type: 'doc', id: 'features/topics', label: '主题与提示词'},
        {type: 'doc', id: 'features/content', label: '内容创作与发布'},
        {type: 'doc', id: 'features/opportunities', label: '机会分析'},
        {type: 'doc', id: 'features/analytics', label: '可见性分析'},
        {type: 'doc', id: 'features/crawler', label: '爬虫与流量监控'},
        {type: 'doc', id: 'features/dashboard', label: 'Dashboard 总览'},
        {
          type: 'category',
          label: '第三方集成',
          items: [
            {type: 'doc', id: 'features/integrations/overview', label: '集成总览'},
            {type: 'doc', id: 'features/integrations/ga4', label: 'GA4 集成'},
            {type: 'doc', id: 'features/integrations/cloudflare', label: 'Cloudflare 集成'},
            {type: 'doc', id: 'features/integrations/wordpress', label: 'WordPress 集成'},
            {type: 'doc', id: 'features/integrations/adgine-cms', label: 'Adgine CMS 集成'},
            {type: 'doc', id: 'features/integrations/vercel', label: 'Vercel 集成'},
          ],
        },
        {type: 'doc', id: 'features/billing', label: '订阅与积分'},
        {type: 'doc', id: 'features/api-keys', label: 'API Key 使用'},
      ],
    },
    {
      type: 'category',
      label: '附录',
      items: [
        {type: 'doc', id: 'appendix/glossary', label: '术语表'},
        {type: 'doc', id: 'appendix/changelog', label: '更新日志'},
        {type: 'doc', id: 'appendix/pdf-manual', label: 'PDF 使用手册'},
      ],
    },
  ],
};

export default sidebars;
