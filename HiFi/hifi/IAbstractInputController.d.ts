/// <reference path="IVec2.d.ts" />
/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />
/// <reference path="Events.d.ts" />
/// <reference path="ISignal.d.ts" />

/// WIP from /interface/src/scripting/ControllerScriptingInterface.h

/**
 * Checked from /interface/src/scripting/ControllerScriptingInterface.h
 * September 16th, 2014
 */
interface IAbstractInputController {
    isActive(): boolean;
    getAbsTranslation(): IVec3;
    getAbsRotatoin(): IQuat;
    getLocTranslation(): IVec3;
    getLocRotatoin(): IQuat;

    spatialEvent: ISignal<(event: ISpatialEvent) => void>;
}
