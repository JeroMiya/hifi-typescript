/// <reference path="IAbstractControllerScriptingInterface.d.ts" />
/// <reference path="IAbstractInputController.d.ts" />

declare module hifi {

    /**
     * handles scripting of input controller commands from JS
     * /interface/src/scripting/ControllerScriptingInterface.h
     * September 16th, 2014
     */
    interface IControllerScriptingInterface extends IAbstractControllerScriptingInterface {
        releaseInputController(input: IAbstractInputController): void;
    }
}

declare var Controller: hifi.IControllerScriptingInterface;
