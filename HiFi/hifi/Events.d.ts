/// <reference path="INumberTypes.d.ts" />
/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />

declare module hifi {

    /**
     * checked against /libraries/script-engine/src/EventTypes.h
     * 2014-09-12
     */
    interface IKeyEvent {
        key: number;
        text: string;
        isShifted: boolean;
        isControl: boolean;
        isMeta: boolean;
        isAlt: boolean;
        isKeypad: boolean;
        isValid: boolean;
    }

    /**
     * checked against /libraries/script-engine/src/EventTypes.h
     * 2014-09-12
     */
    interface IMouseEvent {
        x: number;
        y: number;
        /**
         * unsigned int
         */
        deviceID: number;
        button: string;
        isLeftButton: boolean;
        isRightButton: boolean;
        isMiddleButton: boolean;
        isShifted: boolean;
        isControl: boolean;
        isMeta: boolean;
        isAlt: boolean;
    }

    /**
     * checked against /libraries/script-engine/src/EventTypes.h
     * 2014-09-12
     */
    interface ITouchEvent {
        x: number /* float */;
        y: number /* float */;
        isPressed: boolean;
        isMoved: boolean;
        isStationary: boolean;
        isReleased: boolean;
        isShifted: boolean;
        isControl: boolean;
        isMeta: boolean;
        isAlt: boolean;
        touchPoints: number;
        points: IVec3[];
        radius: number /* float */;
        isPinching: boolean;
        isPinchOpening: boolean;
    }

    /**
     * checked against /libraries/script-engine/src/EventTypes.h
     * 2014-09-12
     */
    interface IWheelEvent {
        x: number;
        y: number;
        delta: number;
        /**
         * ??? 0.o huh? a string?
         */
        orientation: string;
        isLeftButton: boolean;
        isRightButton: boolean;
        isMiddleButton: boolean;
        isShifted: boolean;
        isControl: boolean;
        isMeta: boolean;
        isAlt: boolean;
    }

    /**
     * checked against /libraries/script-engine/src/EventTypes.h
     * 2014-09-12
     */
    interface ISpatialEvent {
        locTranslation: IVec3;
        locRotation: IQuat;
        absTranslation: IVec3;
    }
}
