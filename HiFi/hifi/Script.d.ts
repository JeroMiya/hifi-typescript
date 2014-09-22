/// <reference path="ISignal.d.ts" />
interface ITimer { }

interface ISharedNodePointer { }

/**
 * /libraries/script-engine/src/ScriptEngine.h
 * September 16th, 2014
 */
interface IScript {
    setIsAvatar(isAvatar: boolean): void;

    stop(): void;

    /**
     * @param fileName default: ''
     * @param lineNumber default: 1
     */
    evaluate(program: string, fileName?: string, lineNumber?: number): any;

    setInterval(func: Function, intervalMS: number): ITimer;
    setTimeout(func: Function, timeoutMS: number): ITimer;
    clearInterval(timer: ITimer): void;
    clearTimeout(timer: ITimer): void;
    include(includeFile: string): void;
    load(loadFile: string): void;
    print(message: string): void;

    nodeKilled(node: ISharedNodePointer): void;

    update: ISignal<(deltaTime: number /* float */) => void>;
    scriptEnding: ISignal<() => void>;
    finished: ISignal<(fileNameString: string) => void>;
    cleanupMenuItem: ISignal<(menuItemString: string) => void>;
    printedMessage: ISignal<(message: string) => void>;
    errorMessage: ISignal<(message: string) => void>;
    runningStateChanged: ISignal<() => void>;
    evaluationFinished: ISignal<(result: any, isException: boolean) => void>;
    loadScript: ISignal<(scriptName: string, isUserLoaded: boolean) => void>;
}

declare var Script: IScript;
