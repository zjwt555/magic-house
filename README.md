# 魔法小屋（Magic House）

给 4 岁半小朋友的装扮游戏：**换装、布置房间、做好吃的**。
纯静态网页（HTML/CSS/JS，零依赖零构建），所有美术均为代码手绘 SVG。

## 玩法

- **衣帽间**：小女孩纸娃娃（6 发型 × 6 发色 × 8 裙子 × 6 鞋 × 6 配饰）+ 小猫伙伴（4 配件），照镜子转圈圈
- **卧室**：12 件家具 + 3 种贴纸随意摆放拖动，6 种墙纸 6 种地板一键换，换好装的娃娃会住进房间
- **厨房**：3 个食谱（水果沙拉 / 煮面条 / 小蛋糕），放食材、手指画圈搅拌、魔法烹饪、喂给娃娃和小猫

特点：零文字零规则、大触控目标、永不失败、自动存档（localStorage）、
合成音效 + 中文语音夸奖（TTS）、PWA 离线全屏运行。

## 本地运行

```
node server.js
# 打开 http://127.0.0.1:8765
```

## 自动化测试

```
# 无头 Chrome 打开 http://127.0.0.1:8765/test-auto.html
# 31 项交互测试（导航/换装/存档/拖动/收起/搅拌/烹饪/喂食）
```

## 部署（GitHub Pages）

推送 main 分支后开启 Pages 即可。iPad 上用 Safari 打开网址 →
分享 → 添加到主屏幕 → 全屏离线运行。

以后想转原生 iOS App：用 Capacitor 直接打包这套代码，在 iMac 上编译即可。

## 目录

```
index.html            入口（PWA meta）
manifest.webmanifest  PWA 清单
sw.js                 Service Worker（离线缓存）
css/style.css         全部样式
js/                   store/audio/fx + 三个素材库 + 三个模块 + main
icons/                应用图标（SVG 源 + PNG）
server.js             本地预览服务器
test-auto.html        自动化测试页
```
