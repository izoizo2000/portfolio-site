import { seedRandom } from '@/lib/utils/random';
import { DEFAULT_SHAPE_PARAMS } from '@/lib/constants/geometry';

/** ランダムに散乱したパーティクル */
export function generateScatteredPoints(
    count: number,
    spread: number = DEFAULT_SHAPE_PARAMS.scattered.spread
): Float32Array {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (seedRandom(i * 3 + 0) - 0.5) * spread;
        positions[i * 3 + 1] = (seedRandom(i * 3 + 1) - 0.5) * spread;
        positions[i * 3 + 2] = (seedRandom(i * 3 + 2) - 0.5) * spread;
    }

    return positions;
}