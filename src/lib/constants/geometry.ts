// トーラス生成用定数
export const TORUS_V_DISTRIBUTION = 13.37; // パーティクル分布係数（素数に近い値で均等分布）

// 正四面体の幾何学的定数
export const TETRAHEDRON = {
    BASE_Y_OFFSET: 0.5,           // 底面のY座標オフセット
    INNER_RADIUS_RATIO: 0.577,    // 1/√3 ≈ 正三角形の内接円半径比
    OUTER_RADIUS_RATIO: 1.155,    // 2/√3 ≈ 正三角形の外接円半径比
} as const;

// 形状生成のデフォルト値
export const DEFAULT_SHAPE_PARAMS = {
    sphere: { radius: 2 },
    scattered: { spread: 5 },
    tetrahedron: { size: 2 },
    cube: { size: 2 },
    torus: {
        majorRadius: 2,
        minorRadius: 0.7,
        tiltXDeg: 15,
        tiltYDeg: -10,
        tiltZDeg: 0,
    },
} as const;
