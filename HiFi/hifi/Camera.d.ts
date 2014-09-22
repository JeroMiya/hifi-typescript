/// <reference path="INumberTypes.d.ts" />
/// <reference path="IVec3.d.ts" />

/**
 * checked against /interface/src/Camera.h
 * September 12, 2014
 */
interface ICameraStatic {
    getMode(): string;
    setMode(mode: string): void;
    setModeShiftPeriod(r: number /* float */): void;
    setPosition(v: IVec3): void;
    getPosition(): IVec3;
    setOrientation(q: IQuat): void;
    getOrientation(): IQuat;

    /**
     * These only work on independent cameras.
     * one time change to what the camera is looking at.
     */
    lookAt(value: IVec3): void;

    /**
     * fix what the camera is looking at, and keep the camera
     * looking at this even if position changes.
     */
    keepLookingAt(value: IVec3): void;

    /**
     * stops the keep looking at feature, doesn't change what's
     * being looked at, but will stop camera from continuing to
     * update its orientation to keep looking at the item.
     */
    stopLooking(): void;

    computePickRay(x: number /* float */, y: number /* float */): IPickRay;
}

/**
 * The camera is the viewport for an interactive client
 * (Interface). You can move the camera (independent of
 * the avatar) through the javascript calls here.
 */
declare var Camera: ICameraStatic;
