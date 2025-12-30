/** 球体状にパーティクルを配置 */
export function generateSpherePoints(count: number, radius: number = 2): Float32Array {
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // 黄金角

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y座標
        const radiusAtY = Math.sqrt(1 - y * y); // 半径
        const theta = phi * i; // 角度

        positions[i * 3 + 0] = Math.cos(theta) * radiusAtY * radius; // x座標
        positions[i * 3 + 1] = y * radius; // y座標
        positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius; // z座標
    }

    return positions;
}

/** ランダムに散乱したパーティクル */
export function generateScatterdPoints(count: number, spread: number = 5): Float32Array {
    const positions = new Float32Array(count * 3);

    const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (seedRandom(i * 3 + 0) - 0.5) * spread;
        positions[i * 3 + 1] = (seedRandom(i * 3 + 1) - 0.5) * spread;
        positions[i * 3 + 2] = (seedRandom(i * 3 + 2) - 0.5) * spread;
    }

    return positions;
}