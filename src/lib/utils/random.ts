/**
 * シード値に基づく疑似乱数を生成
 * 同じシード値からは常に同じ乱数が生成される（再現性あり）
 */
export function seedRandom(seed: number): number {
    const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
}