# File System

https://developer.mozilla.org/zh-CN/docs/Web/API/FileSystem

保存文件到沙盒系统中，21 年之后没有更新；

https://developer.mozilla.org/zh-CN/docs/Web/API/File_and_Directory_Entries_API/Introduction

## File System Access API

https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle

## 使用 indexDb 保存 FileSystemHandler 对象以便复用
- 可以优化用户选择文件夹的交互
- 刷新场景下必须通过 “用户交互” 调用 `requestPermission` 以便获取权限


## 可能的场景

- 网盘
- 游戏、媒体资源缓存

## 问题

- 首次使用需要显示授权文件访问权限
- 兼容性：https://caniuse.com/?search=FileSystemDirectoryHandle
