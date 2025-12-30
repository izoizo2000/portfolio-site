'use client';

import { Canvas } from '@react-three/fiber';
import Particles from './Particles';

export default function ThreeCanvas() {
    return (
        <Canvas 
            camera={{ position: [0, 0, 5] }}
            style={{ backgroundColor: '#000000' }}
        >
            <Particles />
        </Canvas>
    );
}