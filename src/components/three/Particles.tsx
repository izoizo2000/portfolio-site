'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { vertexShader } from './shaders/particle.vert';
import { fragmentShader } from './shaders/particle.frag';
import { generateScatterdPoints, generateSpherePoints, generateTorusPoints, generateTrianglePoints, generateSquarePoints } from '@/lib/geometryUtils';

export default function Particles() {
    const pointRef = useRef<THREE.Points>(null);
    const geometryRef = useRef<THREE.BufferGeometry>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const isTransitioning = useRef(false); // モーフィング中かどうか

    // モーフィングの進捗（0～1）
    const [progress, setProgress] = useState(0);
    const [shapeIndex, setShapeIndex] = useState(0); // どの形状か（0: 球体, 1: トーラス, 2: 三角形, 3: 四角形）
    const [isFormingShape, setIsFormingShape] = useState(true); // true: 散乱→形状, false: 形状→散乱
    const [waitTime, setWaitTime] = useState(0); // 待機時間

    const particleCount = 2000;
    const WAIT_DURATION = 5.0; // 待機時間（秒）
    const MORPH_SPEED = 0.5; // モーフィング速度

    // 散乱状態の位置
    const scatteredPositions = useMemo(() => {
        return generateScatterdPoints(particleCount, 15); // 散乱の広がりを15に設定
    }, []);

    // 球体状態の位置
    const spherePositions = useMemo(() => {
        return generateSpherePoints(particleCount, 2);
    }, []);

    // トーラス状態の位置
    const torusPositions = useMemo(() => {
        return generateTorusPoints(particleCount, 2, 0.7);
    }, []);

    // 三角形状態の位置
    const trianglePositions = useMemo(() => {
        return generateTrianglePoints(particleCount, 2);
    }, []);

    // 四角形状態の位置
    const squarePositions = useMemo(() => {
        return generateSquarePoints(particleCount, 3);
    }, []);


    // ターゲット形状の配列（散乱以外）
    const targetShapes = useMemo(() => [
        spherePositions,
        torusPositions,
        trianglePositions,
        squarePositions
    ], [spherePositions, torusPositions, trianglePositions, squarePositions]);

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
            const targetShape = targetShapes[shapeIndex];

            if (isFormingShape) {
                // 散乱 → 形状
                geometryRef.current.setAttribute(
                    'position', 
                    new THREE.BufferAttribute(scatteredPositions, 3)
                );
                geometryRef.current.setAttribute(
                    'aTarget',
                    new THREE.BufferAttribute(targetShape, 3)
                );
            } else {
                // 形状 → 散乱
                geometryRef.current.setAttribute(
                    'position',
                    new THREE.BufferAttribute(targetShape, 3)
                );
                geometryRef.current.setAttribute(
                    'aTarget',
                    new THREE.BufferAttribute(scatteredPositions, 3)
                );
            }
        }
    }, [shapeIndex, isFormingShape, scatteredPositions, targetShapes]);

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
            const next = prev + delta * MORPH_SPEED;

            // モーフィング完了
            if (next >= 1) {
                if (!isTransitioning.current) {
                    isTransitioning.current = true;

                    if (isFormingShape) {
                        // 散乱 → 形状 完了
                        setIsFormingShape(false);
                    } else {
                        // 形状 → 散乱 完了
                        setShapeIndex((prevIndex) => {
                            const nextIndex = (prevIndex + 1) % targetShapes.length;
                            console.log('現在のshapeIndex:', prevIndex, '→ 次:', nextIndex);
                            return nextIndex;
                        });
                        setIsFormingShape(true);
                    }
                    setWaitTime(WAIT_DURATION); // 待機時間をセット

                    // 次のフレームでフラグをリセット
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 0);
                }
                return 0; // 進捗をリセット
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