# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 前提

- **このプロジェクトは学習用です。**
- **ユーザーがスキルを向上させることが目的です。**
- **指示に対してわかりやすい手順を伝えるようにしてください。**

## 禁止事故

- **Claude Codeがコードを書くことを禁止します。**

## 言語設定

**日本語でやり取りを行ってください。すべての回答、質問、選択肢、コミュニケーションは日本語で行う。**

## コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# ESLint実行
npm run lint
```

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **3Dグラフィックス**: Three.js + React Three Fiber + Drei
- **スタイリング**: Tailwind CSS 4
- **Lint**: ESLint 9 (Flat Config)

## アーキテクチャ

### ディレクトリ構成

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホームページ
│   └── globals.css         # グローバルスタイル
├── components/
│   └── three/              # Three.js関連コンポーネント
│       ├── Canvas.tsx      # R3Fのルートキャンバス
│       ├── Particles.tsx   # パーティクルアニメーション
│       └── shaders/        # GLSLシェーダー
└── lib/
    └── geometryUtils.ts    # 形状生成ユーティリティ
```

### Three.js統合パターン

- **SSR回避**: Three.jsコンポーネントは`next/dynamic`で`ssr: false`指定して読み込む
- **シェーダー管理**: GLSLコードは`.ts`ファイルにテンプレートリテラルとして記述（`/* glsl */`コメント付き）
- **パスエイリアス**: `@/*`で`./src/*`を参照可能

### パーティクルシステム

`Particles.tsx`が中心的なアニメーションコンポーネント:
- 複数形状間のモーフィングアニメーション（球体→トーラス→三角錐→立方体）
- カスタムシェーダーによるパーティクル描画
- `geometryUtils.ts`の関数で各形状の頂点座標を生成

## 注意事項

- 作業完了時は`npm run lint`を実行して品質を確認する
- コミットは明示的に指示された場合のみ実行する
