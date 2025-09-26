# Y-Tools
一个简洁优雅的网页工具箱，目前包含汇率换算和 JSON 格式化两个实用工具。项目采用原生 HTML/CSS/JS 构建，界面清爽，交互流畅。

[**➡️ 访问在线示例 **](https://tools.yuitechs.com)

---

## 功能特性

### 汇率换算
- **实时汇率**：使用公开 API 提供数据，汇率定时更新。
- **双向换算**：在任意货币输入框中输入数值，所有其他货币的金额将自动换算。
- **表达式计算**：支持在输入框内进行简单的加减乘除运算 (如 `100*1.05`)，按下回车即可计算结果并刷新汇率。
- **拖拽排序**：通过拖拽每行左侧的图标，可以自由调整货币列表的顺序。
- **点击复制**：单击任意输入框中的数字，即可快速复制当前金额到剪贴板。
- **响应式设计**：在桌面和移动设备上均有良好的使用体验。

### JSON 格式化
- **实时格式化**：在左侧输入框粘贴 JSON 字符串，右侧将立即显示格式化后的结果。
- **错误提示**：如果输入的 JSON 格式有误，右侧会高亮显示错误信息。
- **左右布局**：清晰的对比视图，方便查看和校对。

## 技术栈

- **前端**:
  - 原生 HTML5, CSS3, JavaScript (ES6+)
  - [Sortable.js](https://github.com/SortableJS/Sortable) - 用于实现拖拽排序功能
- **部署与后端**:
  - [Cloudflare Pages](https://pages.cloudflare.com/) - 用于托管静态前端页面。
  - [Cloudflare Functions](https://developers.cloudflare.com/functions/) - 作为后端代理，用于安全地调用汇率 API，避免在前端暴露 API Key [2]。
- **数据源**:
  - [ExchangeRate-API](https://www.exchangerate-api.com/) - 提供汇率数据。

## 如何部署

本项目包含两部分：前端静态文件和 Cloudflare Function 代理。

### 1. 部署前端
将项目中的 `index.html` 文件（包含所有 HTML, CSS, a和 JavaScript）部署到任何静态网站托管平台，如 Cloudflare Pages, GitHub Pages 或 Vercel。

### 2. 部署后端代理 (Cloudflare Function)
为了保证 API 密钥的安全，前端通过请求您自己域名下的 `/api/rates` 路径来获取数据。您需要在 Cloudflare 上创建一个 Function 来处理这个请求。

1.  登录您的 Cloudflare 账号，进入 `Workers & Pages`。
2.  创建一个新的 Function (或在您现有的 Pages 项目中创建一个 Function)。
3.  将该 Function 的路由设置为 `yourdomain.com/api/rates`。
4.  将以下代码粘贴到您的 Function 文件中 (例如 `functions/api/rates.js`)：

    ```javascript
    /**
     * Cloudflare Function 处理器
     * 路径: /api/rates
     * @param {EventContext} context
     */
    export async function onRequest(context) {
      // 从环境变量中获取 API Key
      const API_KEY = context.env.EXCHANGE_RATE_API_KEY;

      if (!API_KEY) {
        return new Response('API key not configured', { status: 500 });
      }

      // 建议在 API 调用中指定基础货币，例如 CNY
      const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/CNY`;

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json();

        // 返回从 API 获取的 JSON 数据
        return new Response(JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
            // 可选：添加缓存头以减少 API 请求次数 (例如，缓存1小时)
            'Cache-Control': 's-maxage=3600',
          },
        });
      } catch (error) {
        console.error('Error fetching from external API:', error);
        return new Response('Failed to fetch exchange rates', { status: 500 });
      }
    }
