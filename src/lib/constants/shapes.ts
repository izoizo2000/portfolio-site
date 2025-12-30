import { generateSpherePoints } from '@/lib/geometry/sphere';
import { generateTorusPoints } from '@/lib/geometry/torus';
import { generateTrianglePoints } from '@/lib/geometry/tetrahedron';
import { generateSquarePoints } from '@/lib/geometry/cube';
import { SHAPE_CONFIG } from './particle';

/** 形状定義 */
export interface ShapeDefinition {
    name: string;
    generate: (count: number) => Float32Array;
}

/** 形状リスト（追加・削除はここだけで完結） */
export const SHAPES: ShapeDefinition[] = [
    {
        name: 'sphere',
        generate: (count) => generateSpherePoints(count, SHAPE_CONFIG.sphere.radius),
    },
    {
        name: 'torus',
        generate: (count) => generateTorusPoints(
            count,
            SHAPE_CONFIG.torus.majorRadius,
            SHAPE_CONFIG.torus.minorRadius
        ),
    },
    {
        name: 'triangle',
        generate: (count) => generateTrianglePoints(count, SHAPE_CONFIG.triangle.size),
    },
    {
        name: 'square',
        generate: (count) => generateSquarePoints(count, SHAPE_CONFIG.square.size),
    },
];

/** 形状の数 */
export const SHAPE_COUNT = SHAPES.length;