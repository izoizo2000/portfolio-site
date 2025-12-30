'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';
import { CANVAS_CONFIG } from '@/lib/constants/canvas';

interface ThreeCanvasProps {
    shapeIndex: number;
}

export default function ThreeCanvas({ shapeIndex }: ThreeCanvasProps) {
    return (
        <Canvas 
            camera={{ position: CANVAS_CONFIG.camera.position }}
            style={{ backgroundColor: CANVAS_CONFIG.style.backgroundColor }}
        >
            <Particles shapeIndex={shapeIndex} />
        </Canvas>
    );
}