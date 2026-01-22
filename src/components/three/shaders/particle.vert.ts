export const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    uniform float uProgress;

    attribute vec3 aTarget;

    varying vec3 vPosition;

    void main() {
        // 現在位置とターゲット位置をモーフィング
        vec3 morphed = mix(position, aTarget, uProgress);

        vPosition = morphed;

        vec4 modelPosition = modelMatrix * vec4(morphed, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;

        gl_Position = projectedPosition;
        gl_PointSize = uSize * (1.0 / -viewPosition.z);
    }
`;