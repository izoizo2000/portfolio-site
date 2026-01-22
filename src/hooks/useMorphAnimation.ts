import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PARTICLE_CONFIG } from '@/lib/constants/particle';

interface UseMorphAnimationResult {
    shapeIndex: number;
    isFormingShape: boolean;
    progressRef: React.MutableRefObject<number>;
}

/** モーフィングアニメーションを管理するフック */
export function useMorphAnimation(shapeCount: number): UseMorphAnimationResult {
    const progressRef = useRef(0);
    const waitTimeRef = useRef(0);
    const isTransitioning = useRef(false);

    const [shapeIndex, setShapeIndex] = useState(0);
    const [isFormingShape, setIsFormingShape] = useState(true);

    // state変更後にトランジションフラグをリセット
    useEffect(() => {
        isTransitioning.current = false;
        progressRef.current = 0;
    }, [shapeIndex, isFormingShape]);

    useFrame((_, delta) => {
        // 待機中の場合
        if (waitTimeRef.current > 0) {
            waitTimeRef.current -= delta;
            return;
        }

        // モーフィング中は処理しない
        if (isTransitioning.current) {
            return;
        }

        // モーフィングの進捗を更新
        progressRef.current += delta * PARTICLE_CONFIG.morphSpeed;

        // モーフィング完了
        if (progressRef.current >= 1) {
            isTransitioning.current = true;
            progressRef.current = 1;
            waitTimeRef.current = PARTICLE_CONFIG.waitDuration;

            if (isFormingShape) {
                setIsFormingShape(false);
            } else {
                setShapeIndex((prevIndex) => (prevIndex + 1) % shapeCount);
                setIsFormingShape(true);
            }
        }
    });

    return { shapeIndex, isFormingShape, progressRef };
}