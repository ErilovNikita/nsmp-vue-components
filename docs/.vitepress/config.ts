import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NSMP Vue Components',
  description: 'Vue-компоненты и утилиты для встроенных приложений NSMP',
  lang: 'ru-RU',
  base: '/nsmp-vue-components/',
  cleanUrls: true,
  lastUpdated: true,
  head: [['meta', { name: 'theme-color', content: '#556e95' }]],
  themeConfig: {
    logo: {
      src: '/logo.png',
      alt: 'NSMP Vue Components',
    },
    siteTitle: 'NSMP Vue Components',
    search: { provider: 'local' },
    nav: [
      { text: 'Руководство', link: '/guide/getting-started' },
      { text: 'Компоненты', link: '/components/button' },
      { text: 'Утилиты', link: '/utilities/notifications' },
    ],
    sidebar: [
      {
        text: 'Начало работы',
        items: [
          { text: 'Введение', link: '/' },
          { text: 'Установка', link: '/guide/getting-started' },
          { text: 'Темизация', link: '/guide/theming' },
        ],
      },
      {
        text: 'Компоненты',
        items: [
          { text: 'Alert', link: '/components/alert' },
          { text: 'AttrGroup', link: '/components/attr-group' },
          { text: 'Button', link: '/components/button' },
          { text: 'ConfigProvider', link: '/components/config-provider' },
          { text: 'Form', link: '/components/form' },
          { text: 'FormInput', link: '/components/form-input' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Table', link: '/components/table' },
          { text: 'Tabs', link: '/components/tabs' },
        ],
      },
      {
        text: 'Утилиты',
        items: [
          { text: 'Уведомления', link: '/utilities/notifications' },
          { text: 'Данные и тема', link: '/utilities/data' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ErilovNikita/nsmp-vue-components' },
    ],
    editLink: {
      pattern: 'https://github.com/ErilovNikita/nsmp-vue-components/edit/main/docs/:path',
      text: 'Редактировать эту страницу',
    },
    lastUpdated: { text: 'Обновлено' },
    outline: { label: 'На странице', level: [2, 3] },
    docFooter: { prev: 'Назад', next: 'Далее' },
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Тема',
    lightModeSwitchTitle: 'Светлая тема',
    darkModeSwitchTitle: 'Тёмная тема',
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url)),
      },
    },
  },
})
