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
      {
        text: 'Документация',
        link: '/guide/getting-started',
        activeMatch: '^/guide/',
      },
      {
        text: 'Компоненты',
        link: '/components/button',
        activeMatch: '^/components/',
      },
      {
        text: 'Утилиты',
        link: '/utilities/notifications',
        activeMatch: '^/utilities/',
      },
      {
        text: 'Демо',
        link: '/demo/',
        activeMatch: '^/demo/',
      },
      {
        text: 'Проект',
        items: [
          {
            text: 'Репозиторий',
            link: 'https://github.com/ErilovNikita/nsmp-vue-components',
          },
          {
            text: 'Последний релиз',
            link: 'https://github.com/ErilovNikita/nsmp-vue-components/releases/latest',
          },
          {
            text: 'Пакет в npm',
            link: 'https://www.npmjs.com/package/@minitwiks/nsmp-vue-components',
          },
          {
            text: 'Сообщить о проблеме',
            link: 'https://github.com/ErilovNikita/nsmp-vue-components/issues/new',
          },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Документация',
          items: [
            { text: 'Начало работы', link: '/guide/getting-started' },
            { text: 'Темизация', link: '/guide/theming' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Основные',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Caption', link: '/components/caption' },
            { text: 'Code', link: '/components/code' },
            { text: 'ConfigProvider', link: '/components/config-provider' },
          ],
        },
        {
          text: 'Формы',
          items: [
            { text: 'Form', link: '/components/form' },
            { text: 'FormCheckbox', link: '/components/form-checkbox' },
            { text: 'FormInput', link: '/components/form-input' },
            { text: 'FormNumber', link: '/components/form-number' },
            { text: 'FormSelect', link: '/components/form-select' },
            { text: 'FormSlider', link: '/components/form-slider' },
            { text: 'FormSwitch', link: '/components/form-switch' },
          ],
        },
        {
          text: 'Данные и навигация',
          items: [
            { text: 'AttrGroup', link: '/components/attr-group' },
            { text: 'Table', link: '/components/table' },
            { text: 'Tabs', link: '/components/tabs' },
          ],
        },
        {
          text: 'Обратная связь',
          items: [
            { text: 'Alert', link: '/components/alert' },
            { text: 'Modal', link: '/components/modal' },
          ],
        },
      ],
      '/utilities/': [
        {
          text: 'Утилиты',
          items: [
            { text: 'Уведомления', link: '/utilities/notifications' },
            { text: 'Данные и тема', link: '/utilities/data' },
          ],
        },
      ],
    },
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
