/// <reference path="INumberTypes.d.ts" />
/// <reference path="IVec3.d.ts" />
/// <reference path="ISignal.d.ts" />

/**
 * Checked against /libraries/audio/src/AudioInjectorOptions.h
 * 2014-09-12
 */
interface IAudioInjectorOptions {
    position: IVec3;
    volume: number /* float */;
    loop: boolean;
}

declare var AudioInjectionOptions: {
    prototype: IAudioInjectorOptions;
    new (): IAudioInjectorOptions;
}

/**
 * Checked against /libraries/audio/src/Sound.h
 * September 17th, 2014
 */
interface ISound {
    /**
     * Read-only
     */
    downloaded: boolean;
    replyFinished(): void;
    replyError(code: any /*INetworkError*/): void;
}

declare var Sound: {
    prototype: ISound;
    /**
     * @param parent default null
     */
    new (sampleURL: string, parent?: any): ISound;

    /**
     * @param volume float
     * @param frequency float
     * @param duration float
     * @param decay float
     * @param parent default null
     */
    new (volume: number, frequency: number, duration: number, decay: number,
        parent?: any): ISound;
}

/**
 * Checked against /libraries/audio/src/AudioInjector.h
 * 2014-09-12
 */
interface IAudioInjector {
    injectAudio(): void;
    stop(): void;
    setupOptions(options: IAudioInjectorOptions): void;

    finished: ISignal<() => void>;
}

/**
 * checked against /libraries/audio/src/AudioScriptingInterface.h
 * 2014-09-12
 */
interface IAudioScriptingInterface {
    //Sound(url: string): ISound; // mentioned in docs, but not in c++?
    playSound(sound: ISound, injectorOptions: IAudioInjectorOptions): IAudioInjector;
    stopInjector(injector: IAudioInjector): void;
    isInjectorPlaying(injector: IAudioInjector): boolean;
    startDrumSound(volume: number /* float */, frequence: number /* float */,
        duration: number /* float */, decay: number /* float */,
        injectorOptions?: IAudioInjectorOptions): void;
}

declare var Audio: IAudioScriptingInterface;