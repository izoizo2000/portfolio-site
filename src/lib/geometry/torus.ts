import { DEFAULT_SHAPE_PARAMS, TORUS_V_DISTRIBUTION } from '@/lib/constants/geometry';
import { rotateXYZ, degToRad } from '@/lib/utils/rotation';

const TORUS_DEFAULTS = DEFAULT_SHAPE_PARAMS.torus;

/** トーラス状にパーティクルを配置 */
export function generateTorusPoints(
    count: number,
    majorRadius: number = TORUS_DEFAULTS.majorRadius,
    minorRadius: number = TORUS_DEFAULTS.minorRadius,
    tiltXDeg: number = TORUS_DEFAULTS.tiltXDeg,
    tiltYDeg: number = TORUS_DEFAULTS.tiltYDeg,
    tiltZDeg: number = TORUS_DEFAULTS.tiltZDeg
): Float32Array {
    const positions = new Float32Array(count * 3);

    const tiltX = degToRad(tiltXDeg);
    const tiltY = degToRad(tiltYDeg);
    const tiltZ = degToRad(tiltZDeg);

    for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2;
        const v = (i * TORUS_V_DISTRIBUTION) % (Math.PI * 2);

        // トーラス上の座標
        const point = {
            x: (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u),
            y: minorRadius * Math.sin(v),
            z: (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u),
        };

        // 回転を適用
        const rotated = rotateXYZ(point, tiltX, tiltY, tiltZ);

        positions[i * 3 + 0] = rotated.x;
        positions[i * 3 + 1] = rotated.y;
        positions[i * 3 + 2] = rotated.z;
    }
    return positions;
}