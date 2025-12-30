import { DEFAULT_SHAPE_PARAMS } from '@/lib/constants/geometry';

/** 球体状にパーティクルを配置 */
export function generateSpherePoints(
    count: number,
    radius: number = DEFAULT_SHAPE_PARAMS.sphere.radius
): Float32Array {
    const positions = new Float32Array(count * 3);
    const phi = Math.PI * (3 - Math.sqrt(5)); // 黄金角

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;

        positions[i * 3 + 0] = Math.cos(theta) * radiusAtY * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * radius;
    }

    return positions;
}