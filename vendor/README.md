# 第三方资源本地化说明

本目录包含所有第三方库的本地副本，用于加速网站加载速度并减少对外部 CDN 的依赖。

## 📦 包含的库

### Font Awesome 6.4.0
- **用途**: 图标库
- **大小**: ~380KB（CSS + 4个字体文件）
- **文件**:
  - `fontawesome/css/all.min.css` - 主样式文件
  - `fontawesome/webfonts/*.woff2` - 字体文件

### Highlight.js 11.9.0
- **用途**: 代码语法高亮
- **大小**: ~119KB
- **文件**:
  - `js/highlight.min.js` - 核心库
  - `js/atom-one-dark.min.css` - Atom One Dark 主题

### Marked.js 11.1.1
- **用途**: Markdown 解析器
- **大小**: ~34KB
- **文件**:
  - `js/marked.min.js`

## 🔄 更新说明

当需要更新这些库时：
1. 访问官方 CDN 下载新版本
2. 替换对应文件
3. 更新本 README 中的版本号

## 📝 来源

所有资源均来自 Cloudflare CDN:
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/
- https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/
- https://cdnjs.cloudflare.com/ajax/libs/marked/11.1.1/

## ⚡ 性能优化

使用本地资源的好处：
- ✅ 不依赖外部 CDN（Google Fonts 在国内被墙）
- ✅ 与网站部署在同一服务器，通过 Cloudflare 全球加速
- ✅ 浏览器缓存后无需重复下载
- ✅ 网站可离线开发
