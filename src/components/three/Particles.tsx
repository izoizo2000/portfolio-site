'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader } from './shaders/particle.vert';
import { fragmentShader } from './shaders/particle.frag';
import { generateScatteredPoints } from '@/lib/geometry';
import { PARTICLE_CONFIG, SHAPE_CONFIG } from '@/lib/constants/particle';
import { SHAPES, SHAPE_COUNT } from '@/lib/constants/shapes';
import { useMorphAnimation } from '@/hooks/useMorphAnimation';

export default function Particles() {
    const pointRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // モーフィングアニメーション
    const { shapeIndex, isFormingShape, progressRef } = useMorphAnimation(SHAPE_COUNT);

    // 散乱状態の位置
    const scatteredPositions = useMemo(() => {
        return generateScatteredPoints(PARTICLE_CONFIG.count, SHAPE_CONFIG.scattered.spread);
    }, []);

    // 全形状の位置を生成
    const targetShapes = useMemo(() => {
        return SHAPES.map(shape => shape.generate(PARTICLE_CONFIG.count));
    }, []);

    // シェーダーのuniform
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSize: { value: PARTICLE_CONFIG.size },
            uProgress: { value: 0 },
        }),
        []
    );

    // ジオメトリに属性を設定
    useEffect(() => {
        if (!geometryRef.current) return;

        const targetShape = targetShapes[shapeIndex];
        const [fromPositions, toPositions] = isFormingShape
            ? [scatteredPositions, targetShape]
            : [targetShape, scatteredPositions];

        geometryRef.current.setAttribute(
            'position',
            new THREE.BufferAttribute(fromPositions, 3)
        );
        geometryRef.current.setAttribute(
            'aTarget',
            new THREE.BufferAttribute(toPositions, 3)
        );
    }, [shapeIndex, isFormingShape, scatteredPositions, targetShapes]);

    // 毎フレーム実行
    useFrame((_, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta;
            materialRef.current.uniforms.uProgress.value = progressRef.current;
        }

        if (pointRef.current) {
            pointRef.current.rotation.x += delta * PARTICLE_CONFIG.rotationSpeed.x;
            pointRef.current.rotation.y += delta * PARTICLE_CONFIG.rotationSpeed.y;
            pointRef.current.rotation.z += delta * PARTICLE_CONFIG.rotationSpeed.z;
        }
    });

    return (
        <points ref={pointRef}>
            <bufferGeometry ref={geometryRef} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}