/** 3次元ベクトル */
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

/** X軸周りに回転 */
export function rotateX(point: Vector3, angleRad: number): Vector3 {
    if (angleRad === 0) return point;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: point.x,
        y: point.y * cos - point.z * sin,
        z: point.y * sin + point.z * cos,
    };
}

/** Y軸周りに回転 */
export function rotateY(point: Vector3, angleRad: number): Vector3 {
    if (angleRad === 0) return point;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: point.x * cos + point.z * sin,
        y: point.y,
        z: -point.x * sin + point.z * cos,
    };
}

/** Z軸周りに回転 */
export function rotateZ(point: Vector3, angleRad: number): Vector3 {
    if (angleRad === 0) return point;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    return {
        x: point.x * cos - point.y * sin,
        y: point.x * sin + point.y * cos,
        z: point.z,
    };
}

/** XYZ軸すべてに回転を適用 */
export function rotateXYZ(point: Vector3, xRad: number, yRad: number, zRad: number): Vector3 {
    let result = rotateX(point, xRad);
    result = rotateY(result, yRad);
    result = rotateZ(result, zRad);
    return result;
}

/** 度数法をラジアンに変換 */
export function degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
}