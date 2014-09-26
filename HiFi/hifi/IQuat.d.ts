/// <reference path="INumberTypes.d.ts" />
/// <reference path="IVec3.d.ts" />

declare module hifi {
    interface IQuat {
        x: number /* float */;
        y: number /* float */;
        z: number /* float */;
        w: number /* float */;
    }
    /**
     * TODO: rename?
     */
    interface IQuatStatic {
        multiply(q1: IQuat, q2: IQuat): IQuat;
        fromVec3Degrees(vec3: IVec3): IQuat;
        fromVec3Radians(vec3: IVec3): IQuat;
        fromPitchYawRollDegrees(pitch: number /* float */, yaw: number /* float */, roll: number /* float */): IQuat;
        fromPitchYawRollRadians(pitch: number /* float */, yaw: number /* float */, roll: number /* float */): IQuat;
        inverse(q: IQuat): IQuat;
        getFront(orientation: IQuat): IVec3;
        getRight(orientation: IQuat): IVec3;
        getUp(orientation: IQuat): IVec3;
        safeEulerAngles(orientation: IQuat): IVec3;
        angleAxis(angleInDegrees: number /* float */, v: IVec3): IQuat;
        mix(q1: IQuat, q2: IQuat, alpha: number /* float */): IQuat;
        slerp(q1: IQuat, q2: IQuat, alpha: number /* float */): IQuat;
        squad(q1: IQuat, q2: IQuat, s1: IQuat, s2: IQuat, h: number /* float */): IQuat;
        dot(q1: IQuat, q2: IQuat): number /* float */;
        print(lable: string, q: IQuat): void;
    }
}

declare var Quat: hifi.IQuatStatic;
