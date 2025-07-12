# 打大A游戏 - 部署指南

本文档介绍如何将打大A游戏部署到公网上。

## 🌟 推荐部署方案

### 方案一：GitHub Pages（免费，推荐）

#### 步骤1：准备GitHub仓库

1. 在GitHub上创建新仓库（例如：`da-da-a-game`）
2. 本地提交代码：

```bash
# 在项目目录下执行
git add .
git commit -m "Initial commit: 打大A游戏"
git branch -M main
git remote add origin https://github.com/你的用户名/da-da-a-game.git
git push -u origin main
```

#### 步骤2：配置GitHub Pages

1. 进入GitHub仓库设置页面
2. 找到"Pages"选项
3. 在"Source"中选择"Deploy from a branch"
4. 选择"main"分支和"/ (root)"目录
5. 点击"Save"

#### 步骤3：访问网站

- 几分钟后，访问：`https://你的用户名.github.io/da-da-a-game`

---

### 方案二：Netlify（免费，功能强大）

#### 步骤1：准备文件

确保项目已构建：
```bash
npm run build
npx webpack
```

#### 步骤2：部署

1. 访问 [Netlify](https://www.netlify.com/)
2. 注册/登录账户
3. 点击"New site from Git"
4. 连接GitHub仓库
5. 设置构建命令：
   - Build command: `npm run build && npx webpack`
   - Publish directory: `./`
6. 点击"Deploy site"

#### 步骤3：自定义域名（可选）

- 在Netlify控制台中可以设置自定义域名

---

### 方案三：Vercel（免费，速度快）

#### 步骤1：部署

1. 访问 [Vercel](https://vercel.com/)
2. 使用GitHub账户登录
3. 点击"New Project"
4. 导入GitHub仓库
5. 设置构建配置：
   - Framework Preset: Other
   - Build Command: `npm run build && npx webpack`
   - Output Directory: `./`
6. 点击"Deploy"

---

### 方案四：阿里云OSS/腾讯云COS（国内访问快）

#### 阿里云OSS步骤：

1. **开通OSS服务**
   - 登录阿里云控制台
   - 开通对象存储OSS服务

2. **创建Bucket**
   - 创建新的Bucket
   - 设置读写权限为"公共读"

3. **上传文件**
   ```bash
   # 构建项目
   npm run build
   npx webpack
   
   # 上传以下文件到OSS：
   # - index.html
   # - styles.css
   # - dist/bundle.js
   # - package.json
   # - README.md
   ```

4. **配置静态网站**
   - 在OSS控制台设置静态网站托管
   - 设置默认首页为`index.html`

5. **绑定域名（可选）**
   - 可以绑定自定义域名并配置CDN

---

## 🔧 部署前优化

### 1. 压缩资源

在`webpack.config.js`中添加生产环境配置：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};
```

### 2. 添加生产构建脚本

在`package.json`中添加：

```json
{
  "scripts": {
    "build:prod": "NODE_ENV=production npm run build && NODE_ENV=production npx webpack"
  }
}
```

### 3. 添加PWA支持（可选）

创建`manifest.json`：

```json
{
  "name": "打大A游戏",
  "short_name": "打大A",
  "description": "经典纸牌游戏",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

## 📱 移动端优化

游戏已经包含响应式设计，但可以进一步优化：

1. **添加触摸友好的交互**
2. **优化移动端布局**
3. **添加振动反馈**

## 🌍 域名和HTTPS

- GitHub Pages、Netlify、Vercel都自动提供HTTPS
- 可以绑定自定义域名
- 建议使用CDN加速（Cloudflare等）

## 📊 性能监控

部署后可以使用以下工具监控性能：

- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🔍 SEO优化

在`index.html`中添加更多meta标签：

```html
<meta name="description" content="打大A - 经典三人纸牌游戏，支持在线游玩">
<meta name="keywords" content="打大A,纸牌游戏,在线游戏,斗地主">
<meta property="og:title" content="打大A游戏">
<meta property="og:description" content="经典三人纸牌游戏">
```

---

## 🎯 推荐部署顺序

1. **新手推荐**：GitHub Pages → 最简单，免费
2. **功能需求**：Netlify → 功能强大，有CI/CD
3. **性能要求**：Vercel → 全球CDN，速度快
4. **国内用户**：阿里云OSS → 国内访问速度最佳

选择任一方案，您的打大A游戏就可以在全世界访问了！ 