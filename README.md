# Y-Tools 🛠️

一个简洁优雅的网页工具箱，包含汇率换算、JSON 格式化和趣味转盘三个实用功能。项目采用原生 HTML/CSS/JS 构建，界面清爽，交互流畅，支持亮色/暗色/跟随系统三种主题模式。

[**➡️ 访问在线示例**](https://tools.yuitechs.com/) | [**🚀 一键部署到 Cloudflare**](#一键部署)

---

## ✨ 功能特性

### 💱 汇率换算
- **实时汇率**：使用公开 API 提供数据，汇率定时更新
- **双向换算**：在任意货币输入框中输入数值，所有其他货币的金额将自动换算
- **表达式计算**：支持在输入框内进行简单的加减乘除运算（如 `100*1.05`），按下回车即可计算结果并刷新汇率
- **国旗图标**：每种货币显示对应的国家/地区旗帜，直观识别
- **拖拽排序**：通过拖拽每行左侧的图标，可以自由调整货币列表的顺序
- **点击复制**：单击任意输入框中的数字，即可快速复制当前金额到剪贴板
- **三种主题**：支持亮色、暗色、跟随系统三种主题模式，丝滑切换动画
- **响应式设计**：在桌面和移动设备上均有良好的使用体验

### 📋 JSON 格式化
- **实时格式化**：在左侧输入框粘贴 JSON 字符串，右侧将立即显示格式化后的结果
- **分层折叠**：支持任意层级的对象和数组折叠/展开，便于浏览大型 JSON 数据
- **彩色括号**：不同层级的括号使用不同颜色，直观区分嵌套结构
- **计数显示**：折叠前后都显示对象属性数或数组元素数，快速了解数据规模
- **错误提示**：如果输入的 JSON 格式有误，右侧会高亮显示错误信息
- **左右布局**：清晰的对比视图，方便查看和校对

### 🎮 趣味转盘
- **双模式体验**：支持经典转盘和神秘开箱两种游戏模式
- **流畅动画**：使用 JavaScript 动画引擎，确保在各种环境下都能流畅运行
- **稀有度系统**：不同稀有度的选项，增加趣味性和惊喜感
- **隐藏彩蛋**：包含特殊隐藏选项，为用户带来意外惊喜
- **智能备选**：图片加载失败时自动使用精美emoji作为备选显示

---

## 🛠️ 技术栈

- **前端**:
  - 原生 HTML5, CSS3, JavaScript (ES6+)
  - CSS Variables + 主题系统
  - [Sortable.js](https://github.com/SortableJS/Sortable) - 拖拽排序功能
  - [Flag CDN](https://flagcdn.com/) - 国家旗帜图标
- **部署与后端**:
  - [Cloudflare Pages](https://pages.cloudflare.com/) - 静态前端托管
  - [Cloudflare Functions](https://developers.cloudflare.com/functions/) - 后端代理，安全地调用汇率 API
- **数据源**:
  - [ExchangeRate-API](https://www.exchangerate-api.com/) - 提供汇率数据

---

## 🚀 完整部署指南

### 📋 前置准备

#### 1. 获取 ExchangeRate-API 密钥

1. 访问 [ExchangeRate-API 官网](https://www.exchangerate-api.com/)
2. 点击 **"Get Free Key"** 按钮
3. 填写邮箱地址并注册账号
4. 验证邮箱后登录控制台
5. 在 Dashboard 中复制你的 **API Key**（格式类似：`1234567890abcdef1234567890abcdef`）

> 💡 **免费计划**：每月 1,500 次请求，对个人使用完全足够

#### 2. 准备 Cloudflare 账号

1. 访问 [Cloudflare 官网](https://www.cloudflare.com/)
2. 注册并登录账号
3. 进入 **"Workers & Pages"** 部分

---

### 🎯 方法一：一键部署

#### 1. 使用 Cloudflare Pages 一键部署

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/YuiKira/Y-Tools)

> ⚠️ **注意**：部署后需要配置环境变量（见下方步骤）

#### 2. 配置环境变量

部署完成后：

1. 在 Cloudflare Dashboard 中进入你的 Pages 项目
2. 点击 **"Settings"** → **"Environment variables"**
3. 添加新变量：
   - **Variable name**: `EXCHANGE_RATE_API_KEY`
   - **Value**: 你在第一步获取的 API Key
   - **Environment**: 选择 `Production` 和 `Preview`
4. 点击 **"Save"** 保存
5. 重新部署项目以应用环境变量

---

### 🔧 方法二：手动部署

#### 1. 下载项目文件

```bash
# 克隆仓库
git clone https://github.com/YuiKira/Y-Tools.git
cd Y-Tools

# 或直接下载项目文件
# 确保包含以下文件结构：
Y-Tools/
├── index.html           # 主页面文件
└── functions/
    └── api/
        └── rates.js     # Cloudflare Function
```

#### 2. 部署到 Cloudflare Pages

##### 方式 A：通过 Git 连接（推荐）

1. 将项目推送到 GitHub/GitLab
2. 在 Cloudflare Dashboard 中：
   - 进入 **"Workers & Pages"**
   - 点击 **"Create application"**
   - 选择 **"Pages"** → **"Connect to Git"**
   - 选择你的仓库并授权
   - 配置构建设置（可保持默认）
   - 点击 **"Save and Deploy"**

##### 方式 B：直接上传文件

1. 在 Cloudflare Dashboard 中：
   - 进入 **"Workers & Pages"**
   - 点击 **"Create application"**
   - 选择 **"Pages"** → **"Upload assets"**
   - 上传 `index.html` 和 `functions` 文件夹
   - 点击 **"Deploy site"**

#### 3. 配置 API 密钥环境变量

1. 部署完成后，进入项目的 **"Settings"**
2. 点击 **"Environment variables"**
3. 点击 **"Add variable"**
4. 填入：
   - **Variable name**: `EXCHANGE_RATE_API_KEY`
   - **Value**: 你的 ExchangeRate-API 密钥
   - 勾选 **"Production"** 和 **"Preview"**
5. 点击 **"Save"**

#### 4. 触发重新部署

1. 回到 **"Deployments"** 页面
2. 点击最新部署的 **"Retry deployment"** 或
3. 如果使用 Git 连接，推送一个小的更改到仓库

---

### 🔍 验证部署

部署完成后，访问你的 Cloudflare Pages 域名（如：`your-project.pages.dev`），检查：

1. ✅ 页面正常加载，主题切换功能正常
2. ✅ 汇率数据能够正常获取和显示
3. ✅ 国旗图标正常显示
4. ✅ 拖拽排序功能正常
5. ✅ JSON 格式化工具正常工作
6. ✅ JSON 分层折叠功能正常
7. ✅ 彩色括号显示正确
8. ✅ 对象和数组计数显示准确

如果汇率数据无法加载，请检查：
- 环境变量 `EXCHANGE_RATE_API_KEY` 是否正确设置
- API Key 是否有效且未超出免费额度
- 浏览器控制台是否有错误信息

---

### 🛠️ 本地开发

如需本地开发和测试：

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 登录 Cloudflare
wrangler login

# 3. 创建本地环境变量文件
echo "EXCHANGE_RATE_API_KEY=your_api_key_here" > .dev.vars

# 4. 启动本地开发服务器
wrangler pages dev . --compatibility-date 2024-01-01

# 访问 http://localhost:8788
```

---

### ⚡ 性能优化

#### 缓存策略
- API 响应自动缓存 1 小时，减少 API 调用次数
- 静态资源由 Cloudflare CDN 全球加速
- 主题设置本地存储，无需重复请求

#### API 限制
- ExchangeRate-API 免费版：1,500 次/月
- 建议设置汇率自动刷新间隔为 15 分钟（已默认配置）
- 支持手动刷新按钮，按需获取最新汇率

---

### 🎨 自定义配置

#### 修改支持的货币列表

在 `index.html` 中找到 `currencyOrder` 数组：

```javascript
let currencyOrder = [
    'CNY', 'HKD', 'TWD', 'USD', 'RUB', 'VND', 'INR', 'EUR', 'JPY',
    'GBP', 'SGD', 'PHP', 'ARS', 'TRY', 'KRW', 'CHF', 'AUD', 'IDR',
    'THB', 'PKR', 'CAD', 'SAR', 'MXN', 'BDT', 'MYR'
];
```

添加或删除货币代码，同时在 `currencyNames` 和 `currencyFlags` 对象中添加对应的显示名称和国家代码。

#### JSON 格式化工具使用技巧

**折叠操作**：
- 点击 `▼` 按钮折叠对象或数组
- 点击 `▶` 按钮或 `...` 省略号展开
- 空对象/数组的按钮呈灰色，无法折叠

**计数信息**：
- 对象显示 "X properties"（属性数）
- 数组显示 "X items"（元素数）
- 折叠后计数信息仍然可见

**彩色括号**：
- 6 种颜色循环显示不同层级
- 亮色主题：红色→橙色→绿色→蓝色→紫色→粉色
- 暗色主题：优化的高对比度配色方案

#### 修改主题颜色

在 CSS 的 `:root` 和 `[data-theme="dark"]` 选择器中修改 CSS 变量：

```css
:root {
    --primary-green: #28a745;        /* 主题绿色 */
    --light-green-bg: #e9f5ee;       /* 浅绿背景 */
    --page-bg: #f8f9fa;              /* 页面背景 */
    /* ... 其他颜色变量 */
}
```

---

### 🐛 常见问题

#### Q: 汇率数据显示 "获取汇率失败"
**A**: 检查环境变量配置和 API Key 有效性，确保已重新部署应用。

#### Q: 国旗图标显示为空白或错误
**A**: Flag CDN 偶尔可能不稳定，已内置错误处理，会显示默认旗帜图标。

#### Q: 主题切换后页面闪烁
**A**: 这是正常的主题切换过渡效果，可在 CSS 中调整 `--theme-transition` 变量的时长。

#### Q: 移动端拖拽功能异常
**A**: 确保设备支持触摸事件，Sortable.js 已针对移动端优化。

#### Q: API 请求次数超限
**A**: ExchangeRate-API 免费版每月 1,500 次，可升级套餐或优化刷新频率。

#### Q: JSON 折叠功能无反应
**A**: 确保粘贴的是有效的 JSON 格式，空对象和数组的折叠按钮会显示为禁用状态。

#### Q: JSON 彩色括号显示异常
**A**: 这可能是浏览器兼容性问题，建议使用现代浏览器（Chrome 80+、Firefox 75+、Safari 13+）。

---

### 📄 许可证

本项目采用 MIT 许可证，详见 [LICENSE](LICENSE) 文件。

---

### 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

---

### 🔗 相关链接

- [ExchangeRate-API 文档](https://www.exchangerate-api.com/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions 文档](https://developers.cloudflare.com/functions/)
- [Flag CDN 文档](https://flagcdn.com/)

---

**⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！**