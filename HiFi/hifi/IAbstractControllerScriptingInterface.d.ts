/// <reference path="IVec2.d.ts" />
/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />
/// <reference path="Events.d.ts" />

/**
 * handles scripting of input controller commands from JS
 * /libraries/script-engine/src/AbstractControllerScriptingInterface.h
 * September 16th, 2014
 */
interface IAbstractControllerScriptingInterface extends IAbstractInputController {
    isPrimaryButtonPressed(): boolean;
    getPrimaryJoystickPosition(): IVec2;

    getNumberOfButtons(): number;
    isButtonPressed(buttonIndex: number): boolean;

    getNumberOfTriggers(): number;
    getTriggerValue(triggerIndex: number): number /* float */;

    getNumberOfJoysticks(): number;
    getJoystickPosition(joystickIndex: number): IVec2;

    getNumberOfSpatialControls(): number;
    getSpatialControlPosition(controlIndex: number): IVec3;
    getSpatialControlVelocity(controlIndex: number): IVec3;
    getSpatialControlNormal(controlIndex: number): IVec3;
    getSpatialControlRawRotation(controlIndex: number): IQuat;

    captureKeyEvents(event: IKeyEvent): void;
    releaseKeyEvents(event: IKeyEvent): void;

    captureMouseEvents(): void;
    releaseMouseEvents(): void;

    captureTouchEvents(): void;
    releaseTouchEvents(): void;

    captureWheelEvents(): void;
    releaseWheelEvents(): void;

    captureJoystick(joystickIndex: number): void;
    releaseJoystick(joystickIndex: number): void;

    getViewportDimensions(): IVec2;

    /**
     * Factory to create an InputController
     * #research: is this exposed to the JS api?
     */
    createInputController(category: string, tracker: string):
        IAbstractInputController;

    // signals
    keyPressEvent: ISignal<(event: IKeyEvent) => void>;
    keyReleaseEvent: ISignal<(event: IKeyEvent) => void>;

    mouseMoveEvent: ISignal<(event: IMouseEvent, deviceID: number) => void>;
    mousePressEvent: ISignal<(event: IMouseEvent, deviceID: number) => void>;
    mouseReleaseEvent: ISignal<(event: IMouseEvent, deviceID: number) => void>;

    touchBeginEvent: ISignal<(event: ITouchEvent) => void>;
    touchEndEvent: ISignal<(event: ITouchEvent) => void>;
    touchUpdateEvent: ISignal<(event: ITouchEvent) => void>;

    wheelEvent: ISignal<(event: IWheelEvent) => void>;
}
