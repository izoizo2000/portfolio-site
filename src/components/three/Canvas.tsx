'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';
import { CANVAS_CONFIG } from '@/lib/constants/canvas';

export default function ThreeCanvas() {
    return (
        <Canvas 
            camera={{ position: CANVAS_CONFIG.camera.position }}
            style={{ backgroundColor: CANVAS_CONFIG.style.backgroundColor }}
        >
            <Particles />
        </Canvas>
    );
}