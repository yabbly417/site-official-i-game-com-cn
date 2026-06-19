// public/site-helper.js

(function() {
  'use strict';

  // 配置数据
  const CONFIG = Object.freeze({
    siteUrl: 'https://site-official-i-game.com.cn',
    keyword: '爱游戏',
    promptText: '欢迎来到爱游戏官方站点，点击下方卡片可查看各板块说明。',
    badgeCount: 3,
    badgeColors: ['#3498db', '#e74c3c', '#2ecc71']
  });

  // 卡片数据结构
  const cards = [
    {
      id: 'card-intro',
      title: '平台简介',
      description: '爱游戏是专注于高品质游戏体验的官方平台。',
      link: CONFIG.siteUrl + '/about'
    },
    {
      id: 'card-guide',
      title: '新手引导',
      description: '首次访问？查看我们的快速上手指南。',
      link: CONFIG.siteUrl + '/guide'
    },
    {
      id: 'card-contact',
      title: '联系我们',
      description: '如有任何问题，可通过官方渠道与我们取得联系。',
      link: CONFIG.siteUrl + '/contact'
    }
  ];

  // 关键词徽章列表
  const badges = [
    { label: '爱游戏', color: CONFIG.badgeColors[0] },
    { label: '官方站点', color: CONFIG.badgeColors[1] },
    { label: '安全提示', color: CONFIG.badgeColors[2] }
  ];

  // 辅助：创建DOM元素并设置属性
  function createElement(tag, attrs, text) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    if (text !== undefined) {
      el.textContent = text;
    }
    return el;
  }

  // 创建提示卡片容器
  function createPromptBanner() {
    var banner = createElement('div', { class: 'site-helper-banner', id: 'helper-banner' });

    var header = createElement('div', { class: 'helper-header' });
    var title = createElement('h2', {}, '页面提示');
    header.appendChild(title);

    var prompt = createElement('p', { class: 'helper-prompt' }, CONFIG.promptText);
    header.appendChild(prompt);

    banner.appendChild(header);

    // 添加卡片列表
    var cardList = createElement('div', { class: 'helper-card-list' });
    cards.forEach(function(card) {
      var cardEl = createElement('a', {
        class: 'helper-card',
        href: card.link,
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      var cardTitle = createElement('div', { class: 'card-title' }, card.title);
      var cardDesc = createElement('div', { class: 'card-desc' }, card.description);
      cardEl.appendChild(cardTitle);
      cardEl.appendChild(cardDesc);
      cardList.appendChild(cardEl);
    });

    banner.appendChild(cardList);

    return banner;
  }

  // 创建关键词徽章区域
  function createBadgeSection() {
    var section = createElement('div', { class: 'helper-badges', id: 'helper-badges' });
    var badgeTitle = createElement('span', { class: 'badge-label' }, '关键词：');
    section.appendChild(badgeTitle);

    badges.forEach(function(badge) {
      var badgeEl = createElement('span', {
        class: 'helper-badge',
        style: 'background-color:' + badge.color + '; color: #fff;'
      }, badge.label);
      section.appendChild(badgeEl);
    });

    return section;
  }

  // 创建访问说明区域
  function createAccessInfo() {
    var info = createElement('div', { class: 'helper-access-info', id: 'helper-access-info' });
    var infoTitle = createElement('h3', {}, '访问说明');
    info.appendChild(infoTitle);

    var list = createElement('ul', {});
    var items = [
      '请认准官方域名：' + CONFIG.siteUrl,
      '爱游戏不会索要您的密码或验证码',
      '建议使用最新版浏览器访问以获得最佳体验',
      '如遇可疑链接，请立即通过官方渠道举报'
    ];
    items.forEach(function(text) {
      var li = createElement('li', {}, text);
      list.appendChild(li);
    });

    info.appendChild(list);

    return info;
  }

  // 插入样式
  function injectStyles() {
    var style = createElement('style', { id: 'helper-styles' });
    style.textContent = [
      '.site-helper-banner { background: #f4f7fa; border: 1px solid #dce1e8; border-radius: 8px; padding: 16px; margin: 16px 0; font-family: sans-serif; }',
      '.helper-header { margin-bottom: 12px; }',
      '.helper-header h2 { margin: 0 0 4px 0; font-size: 1.2em; color: #333; }',
      '.helper-prompt { margin: 0; color: #555; font-size: 0.95em; }',
      '.helper-card-list { display: flex; flex-wrap: wrap; gap: 12px; }',
      '.helper-card { display: block; flex: 1 1 180px; background: white; border: 1px solid #ddd; border-radius: 6px; padding: 12px; text-decoration: none; color: #333; transition: box-shadow 0.2s, border-color 0.2s; }',
      '.helper-card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-color: #b0c4de; }',
      '.card-title { font-weight: bold; margin-bottom: 4px; }',
      '.card-desc { font-size: 0.85em; color: #666; }',
      '.helper-badges { margin: 12px 0; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }',
      '.badge-label { font-weight: 600; margin-right: 4px; color: #333; }',
      '.helper-badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 0.8em; font-weight: 500; }',
      '.helper-access-info { background: #f9fafb; border-left: 4px solid #3498db; padding: 10px 16px; margin-top: 12px; border-radius: 4px; }',
      '.helper-access-info h3 { margin: 0 0 6px 0; font-size: 1em; color: #2c3e50; }',
      '.helper-access-info ul { margin: 0; padding-left: 20px; }',
      '.helper-access-info li { margin-bottom: 4px; color: #444; }'
    ].join(' ');
    document.head.appendChild(style);
  }

  // 主初始化函数
  function init() {
    injectStyles();

    var container = document.body;

    // 按顺序插入各个模块
    var banner = createPromptBanner();
    container.insertBefore(banner, container.firstChild);

    var badgeSection = createBadgeSection();
    container.insertBefore(badgeSection, banner.nextSibling);

    var accessInfo = createAccessInfo();
    container.insertBefore(accessInfo, badgeSection.nextSibling);
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();