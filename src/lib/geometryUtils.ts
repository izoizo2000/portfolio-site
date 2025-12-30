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

/** トーラス状にパーティクルを配置 */
export function generateTorusPoints(
    count: number, 
    majorRadius: number = 2, 
    minorRadius: number = 0.7,
    tiltX: number = 15,  // X軸の傾き（ラジアン）
    tiltY: number = -10,  // Y軸の傾き（ラジアン）
    tiltZ: number = 0   // Z軸の傾き（ラジアン）
): Float32Array {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2;
        const v = (i * 13.37) % (Math.PI * 2);

        // 傾ける前の座標
        let x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
        let y = minorRadius * Math.sin(v);
        let z = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);

        // X軸周りに回転
        if (tiltX !== 0) {
            const cosX = Math.cos(tiltX);
            const sinX = Math.sin(tiltX);
            const newY = y * cosX - z * sinX;
            const newZ = y * sinX + z * cosX;
            y = newY;
            z = newZ;
        }

        // Y軸周りに回転
        if (tiltY !== 0) {
            const cosY = Math.cos(tiltY);
            const sinY = Math.sin(tiltY);
            const newX = x * cosY + z * sinY;
            const newZ = -x * sinY + z * cosY;
            x = newX;
            z = newZ;
        }

        // Z軸周りに回転
        if (tiltZ !== 0) {
            const cosZ = Math.cos(tiltZ);
            const sinZ = Math.sin(tiltZ);
            const newX = x * cosZ - y * sinZ;
            const newY = x * sinZ + y * cosZ;
            x = newX;
            y = newY;
        }

        positions[i * 3 + 0] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
}

/** 三角錐状にパーティクルを配置（面全体） */
export function generateTrianglePoints(count: number, size: number = 2): Float32Array {
    const positions = new Float32Array(count * 3);
    const pointsPerFace = Math.floor(count / 4); // 4面

    // 三角錐の4つの頂点
    const vertices = [
        [0, size, 0],                        // 0: 頂点（上）
        [size, -size * 0.5, size * 0.577],   // 1: 底面1
        [-size, -size * 0.5, size * 0.577],  // 2: 底面2
        [0, -size * 0.5, -size * 1.155],     // 3: 底面3
    ];

    // 4つの三角形面（頂点インデックス）
    const faces = [
        [0, 1, 2], // 側面1
        [0, 2, 3], // 側面2
        [0, 3, 1], // 側面3
        [1, 3, 2], // 底面
    ];

    const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(i / pointsPerFace) % 4;
        const [v0, v1, v2] = faces[faceIndex];

        // 三角形内のランダムな点（重心座標）
        let u = seedRandom(i * 3);
        let v = seedRandom(i * 3 + 1);
        if (u + v > 1) {
            u = 1 - u;
            v = 1 - v;
        }
        const w = 1 - u - v;

        positions[i * 3 + 0] = vertices[v0][0] * w + vertices[v1][0] * u + vertices[v2][0] * v;
        positions[i * 3 + 1] = vertices[v0][1] * w + vertices[v1][1] * u + vertices[v2][1] * v;
        positions[i * 3 + 2] = vertices[v0][2] * w + vertices[v1][2] * u + vertices[v2][2] * v;
    }
    return positions;
}

/** 立方体状にパーティクルを配置（面全体） */
export function generateSquarePoints(count: number, size: number = 2): Float32Array {
    const positions = new Float32Array(count * 3);
    const half = size / 2;
    const pointsPerFace = Math.floor(count / 6); // 6面

    const seedRandom = (seed: number) => {
        const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
        return x - Math.floor(x);
    };

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(i / pointsPerFace) % 6;
        const u = (seedRandom(i * 3) - 0.5) * size;
        const v = (seedRandom(i * 3 + 1) - 0.5) * size;

        switch (faceIndex) {
            case 0: positions[i * 3 + 0] = half;  positions[i * 3 + 1] = u; positions[i * 3 + 2] = v; break; // +X
            case 1: positions[i * 3 + 0] = -half; positions[i * 3 + 1] = u; positions[i * 3 + 2] = v; break; // -X
            case 2: positions[i * 3 + 0] = u; positions[i * 3 + 1] = half;  positions[i * 3 + 2] = v; break; // +Y
            case 3: positions[i * 3 + 0] = u; positions[i * 3 + 1] = -half; positions[i * 3 + 2] = v; break; // -Y
            case 4: positions[i * 3 + 0] = u; positions[i * 3 + 1] = v; positions[i * 3 + 2] = half;  break; // +Z
            case 5: positions[i * 3 + 0] = u; positions[i * 3 + 1] = v; positions[i * 3 + 2] = -half; break; // -Z
        }
    }
    return positions;
}
