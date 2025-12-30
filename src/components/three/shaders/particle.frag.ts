export const fragmentShader = /* glsl */ `
    uniform float uTime;

    varying vec3 vPosition;

    void main() {
        // 円形にする
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        // 位置に応じて色を変える
        vec3 color;
        color.r = 0.5 + 0.5 * sin(vPosition.x + uTime);
        color.g = 0.5 + 0.5 * sin(vPosition.y + uTime * 0.7);
        color.b = 0.5 + 0.5 * sin(vPosition.z + uTime * 0.5);

        gl_FragColor = vec4(color, 1.0);
    }
`;