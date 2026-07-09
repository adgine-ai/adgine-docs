import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: '开始',
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/onboarding-wizard',
      ],
    },
    {
      type: 'category',
      label: '功能指南',
      collapsed: false,
      items: [
        'features/brand',
        'features/topics',
        'features/content',
        'features/opportunities',
        'features/analytics',
        'features/crawler',
        'features/dashboard',
        {
          type: 'category',
          label: '第三方集成',
          items: [
            'features/integrations/overview',
            'features/integrations/ga4',
            'features/integrations/cloudflare',
            'features/integrations/wordpress',
            'features/integrations/adgine-cms',
            'features/integrations/vercel',
          ],
        },
        'features/billing',
        'features/api-keys',
      ],
    },
    {
      type: 'category',
      label: '附录',
      items: [
        'appendix/glossary',
        'appendix/changelog',
        'appendix/pdf-manual',
      ],
    },
  ],
};

export default sidebars;
