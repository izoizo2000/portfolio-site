import { DEFAULT_SHAPE_PARAMS, TETRAHEDRON } from '@/lib/constants/geometry';

/** 三角錐状にパーティクルを配置（面全体） */
export function generateTrianglePoints(
    count: number,
    size: number = DEFAULT_SHAPE_PARAMS.tetrahedron.size
): Float32Array {
    const positions = new Float32Array(count * 3);
    const pointsPerFace = Math.floor(count / 4);

    const vertices = [
        [0, size, 0],
        [size, -size * TETRAHEDRON.BASE_Y_OFFSET, size * TETRAHEDRON.INNER_RADIUS_RATIO],
        [-size, -size * TETRAHEDRON.BASE_Y_OFFSET, size * TETRAHEDRON.INNER_RADIUS_RATIO],
        [0, -size * TETRAHEDRON.BASE_Y_OFFSET, -size * TETRAHEDRON.OUTER_RADIUS_RATIO],
    ];

    const faces = [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 1],
        [1, 3, 2],
    ];

    for (let i = 0; i < count; i++) {
        const faceIndex = Math.floor(i / pointsPerFace) % 4;
        const [v0, v1, v2] = faces[faceIndex];

        const gridSize = Math.ceil(Math.sqrt(pointsPerFace * 2));
        const indexInFace = i % pointsPerFace;
        const row = Math.floor(indexInFace / gridSize);
        const col = indexInFace % gridSize;
        let u = col / gridSize;
        let v = row / gridSize;

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