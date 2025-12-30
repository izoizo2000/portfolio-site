'use client';

import dynamic from "next/dynamic";

// Three.jsはサーバサイドで動かないのでクライアントのみで読み込む
const ThreeCanvas = dynamic(() => import("../components/three/Canvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <ThreeCanvas />
    </main>
  );
}
