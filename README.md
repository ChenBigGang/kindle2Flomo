# Send2flomo

![kindle2flomo downloads](https://img.shields.io/github/downloads/Tit1e/kindle2Flomo/total)
&nbsp;&nbsp;&nbsp;&nbsp;
![](https://img.shields.io/badge/license-GPL-green.svg)
&nbsp;&nbsp;&nbsp;&nbsp;
[![](https://img.shields.io/badge/即刻-@直走的螃蟹-FFE440.svg)](https://web.okjike.com/u/FFDB1E46-63DC-43BE-AA1A-36F3D9CD0017)

### 将 Kindle、Apple Books、KOReader、微信阅读笔记一键导入至 flomo

[中文](./README.md) | [English](./README_en_US.md)

## 预览
![](./screenshot/home.png)

![](./screenshot/help.png)

![](./screenshot/edit.png)

![](./screenshot/reset.png)
## 注册
### [flomo](https://flomoapp.com/register2/?MTAzNDE)

## 网页版（仅支持 html 与 txt 格式导入）
### [Send2flomo](https://tit1e.github.io/kindle2Flomo/)

## Mac 应用下载
### [网盘下载](https://wwr.lanzoui.com/b02c3nkyf) 访问密码：47if
### [Github Releases](https://github.com/Tit1e/kindle2Flomo/releases)

## 问题反馈
![](./screenshot/qrcode.png)


## 开发注意事项
**bplistParser** 这个依赖需手动修改 `maxObjectSize` 与 `maxObjectCount` 这两个常量的数值，修改得大一些，否则当 `Books.plist` 中图书数量过多时会出现无法解析的问题。
```js
exports.maxObjectSize = 1000 * 1000 * 1000;
exports.maxObjectCount = 32768 * 2;
```

## 本地启动步骤
node:14.17.0

- npm install -g @vue/cli
- pnpm i -g @vue/cli-service
- npm install
- npm install -E sqlite3@5.1.6
- npm install --save dns mock-aws-s3 nock
- npm install cheerio@^1.0.0-rc.3
- pnpm i -D @types/webpack-env