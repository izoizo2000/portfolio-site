'use client';

import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader } from './shaders/particle.vert';
import { fragmentShader } from './shaders/particle.frag';
import { generateScatteredPoints } from '@/lib/geometry';
import { PARTICLE_CONFIG, SHAPE_CONFIG } from '@/lib/constants/particle';
import { SHAPES } from '@/lib/constants/shapes';

interface ParticlesProps {
    shapeIndex: number;
}

export default function Particles({ shapeIndex }: ParticlesProps) {
    const pointRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // モーフィング進捗
    const progressRef = useRef(0);
    const targetProgressRef = useRef(1); // 目標値（形状形成時は1）
    const prevShapeIndexRef = useRef(shapeIndex);

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

    // セクション変更時：散乱→新形状
    useEffect(() => {
        if (!geometryRef.current) return;

        const targetShape = targetShapes[shapeIndex];

        geometryRef.current.setAttribute(
            'position',
            new THREE.BufferAttribute(scatteredPositions, 3)
        );
        geometryRef.current.setAttribute(
            'aTarget',
            new THREE.BufferAttribute(targetShape   , 3)
        );

        // 進捗をリセットして形状形成開始
        progressRef.current = 0;
        targetProgressRef.current = 1;
        prevShapeIndexRef.current = shapeIndex;
    }, [shapeIndex, scatteredPositions, targetShapes]);

    // 毎フレーム実行
    useFrame((_, delta) => {
        // 進捗を目標値に向けて補完
        const diff = targetProgressRef.current - progressRef.current;
        progressRef.current += diff * delta * 3; // 補完速度

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