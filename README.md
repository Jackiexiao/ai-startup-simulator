# AI Startup Simulator

一个由AI驱动的创业模拟游戏，让玩家体验创业过程中的各种决策和挑战。

## 特点

- 🎮 动态生成的创业场景和选择
- 🤖 AI驱动的事件生成和结果模拟
- 📊 实时追踪公司各项指标
- 💬 支持自定义行动输入
- 🌟 多样化的结局（破产、上市等）

## 技术栈

- Next.js 13
- Shadcn UI
- OpenAI GPT-4
- Zustand (状态管理)
- TypeScript

## 开始使用

1. 克隆项目

```bash
git clone https://github.com/jackiexiao/ai-startup-simulator.git
cd ai-startup-simulator
```

2. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 配置环境变量

复制 `.env.example` 文件并重命名为 `.env.local`，然后填入你的 OpenAI API Key：

```bash
cp .env.example .env.local
```

4. 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 游戏玩法

1. 输入公司名称并选择创业类型
2. 根据游戏中出现的事件做出选择
3. 观察你的决策如何影响公司的各项指标
4. 努力避免破产，争取上市成功！

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT

# Next.js Shadcn Template
[English](README.md) | [中文](README.zh-CN.md)

A modern, feature-rich Next.js template with Shadcn UI components. It's particularly suitable for AI code editor development (like Cursor / Windsurf)

## Example AI Projects Based on This Template
- [HackathonWeekly Website - Modern Clean Style](https://hackweek.pages.dev/)
- [HackathonWeekly Website - Terminal Style](https://terminal-style.hackweek.pages.dev/)

## Features

- ⚡️ Next.js 15 with App Directory
- 🎨 Shadcn UI Components
- 🎭 Tailwind CSS
- 📱 Responsive Design
- 🌙 Dark Mode Support
- 🔍 SEO Optimized
- 📊 Built-in Analytics Support
- 🚀 Fast Page Loads
- 🛠️ Easy to Customize
- 📦 Production Ready
- AI Friendly (For Cursor / Windsurf)
- Icons from [Lucide](https://lucide.dev)
- Tailwind CSS class sorting, merging and linting.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/jackiexiao/ai-startup-simulator.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deploy

Easy deploy to Cloudflare Pages:
```bash
npm run deploy
```

## AI Development Support

This template works great with AI coding assistants:
- 🌊 Windsurf
- 🔍 Cursor
- 👨‍💻 GitHub Copilot

Just open this repo in your preferred AI assistant and start coding!

## Recommended VSCode Extensions

For the best development experience, install these extensions:

- 🎨 Tailwind CSS IntelliSense
- 📝 PostCSS Language Support
- ✨ Prettier
- 🔍 ESLint
- 🏷️ Auto Rename Tag
- 📖 Code Spell Checker
- 🎯 Error Lens
- 📊 Import Cost
- 🛠️ Path Intellisense
- 🔧 Pretty TypeScript Errors
- 🧵 Template String Converter

## Development Tips

1. Customize components:
   - Check `components/ui` for base components
   - Add new components in `components/`
   - Modify themes in `app/globals.css`

## Cloudflare Deployment (Optional)
See: https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/get-started/

Ensure all server-rendered routes use the Edge Runtime
```js
export const runtime = "edge";
```

## License

MIT License - feel free to use this template for any project!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
