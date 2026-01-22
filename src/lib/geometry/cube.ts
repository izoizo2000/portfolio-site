import { DEFAULT_SHAPE_PARAMS } from '../constants/geometry';

/** 立方体状にパーティクルを配置（面全体） */
export function generateSquarePoints(
    count: number,
    size: number = DEFAULT_SHAPE_PARAMS.cube.size
): Float32Array {
    const positions = new Float32Array(count * 3);
    const half = size / 2;
    const pointsPerFace = Math.floor(count / 6);

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(i / pointsPerFace) % 6;
        const gridSize = Math.ceil(Math.sqrt(pointsPerFace));
        const indexInFace = i % pointsPerFace;
        const row = Math.floor(indexInFace / gridSize);
        const col = indexInFace % gridSize;
        const u = ((col / (gridSize - 1 || 1)) - 0.5) * size;
        const v = ((row / (gridSize - 1 || 1)) - 0.5) * size;

        switch (faceIndex) {
            case 0: positions[i * 3 + 0] = half;  positions[i * 3 + 1] = u; positions[i * 3 + 2] = v; break;
            case 1: positions[i * 3 + 0] = -half; positions[i * 3 + 1] = u; positions[i * 3 + 2] = v; break;
            case 2: positions[i * 3 + 0] = u; positions[i * 3 + 1] = half;  positions[i * 3 + 2] = v; break;
            case 3: positions[i * 3 + 0] = u; positions[i * 3 + 1] = -half; positions[i * 3 + 2] = v; break;
            case 4: positions[i * 3 + 0] = u; positions[i * 3 + 1] = v; positions[i * 3 + 2] = half;  break;
            case 5: positions[i * 3 + 0] = u; positions[i * 3 + 1] = v; positions[i * 3 + 2] = -half; break;
        }
    }
    return positions;
}