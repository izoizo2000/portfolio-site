'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader } from './shaders/particle.vert';
import { fragmentShader } from './shaders/particle.frag';
import { generateScatterdPoints, generateSpherePoints } from '@/lib/geometryUtils';

export default function Particles() {
    const pointRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // モーフィングの進捗（0～1）
    const [progress, setProgress] = useState(0);
    const [direction, setDirection] = useState(1); // 1: 増加, -1: 減少
    const [waitTime, setWaitTime] = useState(0); // 待機時間

    const particleCount = 2000;
    const WAIT_DURATION = 3.0; // 待機時間（秒）
    const MORPH_SPEED = 0.5; // モーフィング速度

    // 散乱状態の位置
    const scatteredPositions = useMemo(() => {
        return generateScatterdPoints(particleCount, 15); // 散乱の広がりを15に設定
    }, []);

    // 球体状態の位置
    const spherePositions = useMemo(() => {
        return generateSpherePoints(particleCount, 2);
    }, []);

    // シェーダーの渡す値（uniform）
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSize: { value: 30.0 },
            uProgress: { value: 0 },
        }),
        []
    );

    // ジオメトリに属性を設定
    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setAttribute(
                'position',
                new THREE.BufferAttribute(scatteredPositions, 3)
            );
            geometryRef.current.setAttribute(
                'aTarget',
                new THREE.BufferAttribute(spherePositions, 3)
            );
        }
    }, [scatteredPositions, spherePositions]);

    // 毎フレーム実行される（アニメーション）
    useFrame((state, delta) => {
        // 時間を更新
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta;
            materialRef.current.uniforms.uProgress.value = progress;
        }

        // 回転させる
        if (pointRef.current) {
            pointRef.current.rotation.y += delta * 0.1; // Y軸回転
        }

        // 待機中の場合
        if (waitTime > 0) {
            setWaitTime((prev) => prev - delta);
            return;
        }   

        // モーフィングの進捗を更新
        setProgress((prev) => {
            const next = prev + delta * MORPH_SPEED * direction;

            // 球体に到達
            if (next >= 1) {
                setDirection(-1);
                setWaitTime(WAIT_DURATION); // 待機開始
                return 1;
            } 
            
            // 散乱に到達
            if (next <= 0) {
                setDirection(1);
                setWaitTime(WAIT_DURATION); // 待機開始
                return 0;
            }
            return next;
        });
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