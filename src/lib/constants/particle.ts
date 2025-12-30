// パーティクル設定
export const PARTICLE_CONFIG = {
    count: 2000,           // パーティクル数
    size: 30.0,            // パーティクルサイズ
    rotationSpeed: {       // 回転速度
        x: 0.05,
        y: 0.1,
        z: 0.03,
    },
    morphSpeed: 0.5,       // モーフィング速度
    waitDuration: 5.0,     // 形状維持時間（秒）
} as const;

// 形状サイズ設定
export const SHAPE_CONFIG = {
    scattered: { spread: 15 },
    sphere: { radius: 2 },
    torus: { majorRadius: 2, minorRadius: 0.7 },
    triangle: { size: 2.5 },
    square: { size: 3 },
} as const;