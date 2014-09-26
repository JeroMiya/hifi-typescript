/// <reference path="INumberTypes.d.ts" />
/// <reference path="IQuat.d.ts" />

declare module hifi {
    // Checked against /libraries/scriptengine/src/Vec3.h
    // September 12
    interface IVec3 {
        x: number /* float */;
        y: number /* float */;
        z: number /* float */;
    }

    interface IVec3Static {
        cross(v1: IVec3, v2: IVec3): IVec3;
        dot(v1: IVec3, v2: IVec3): number /* float */;
        multiply(v1: IVec3, f: number /* float */): IVec3;
        multiplyQbyV(q: IQuat, v: IVec3): IVec3;
        sum(v1: IVec3, v2: IVec3): IVec3;
        subtract(v1: IVec3, v2: IVec3): IVec3;
        length(v: IVec3): number /* float */;
        distance(v1: IVec3, v2: IVec3): number /* float */;
        normalize(v: IVec3): IVec3;
        print(lable: string, v: IVec3): void;
    }
}

declare var Vec3: hifi.IVec3Static;
