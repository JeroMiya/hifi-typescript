/// <reference path="INumberTypes.d.ts" />
/// <reference path="IVec3.d.ts" />
/// <reference path="ISignal.d.ts" />

declare module hifi {
    /**
     * Checked against /libraries/audio/src/AudioInjectorOptions.h
     * 2014-09-12
     */
    interface IAudioInjectorOptions {
        position: IVec3;
        volume: number /* float */;
        loop: boolean;
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

    /**
     * checked against /interface/src/scripting/AudioDeviceScriptingInterface.h
     * 2014-09-28
     */
    interface IAudioDeviceScriptingInterface {
        setInputDevice(deviceName: string): boolean;
        setOutputDevice(deviceName: string): boolean;

        getInputDevice(): string;
        getOutputDevice(): string;

        getDefaultInputDevice(): string;
        getDefaultOutputDevice(): string;

        getInputDevices(): string[];
        getOutputDevices(): string[];

        /**
         * @returns float
         */
        getInputVolume(): number;

        /**
         * @param volume float
         */
        setInputVolume(volume: number): void;
    }

    /**
     * checked against /interface/src/AudioReflector.h
     * 2014-09-28
     */
    interface IAudioReflector {
        /** @returns int */
        getReflections(): number;
        /** @returns float */
        getAverageDelayMsecs(): number;
        /** @returns float */
        getAverageAttenuation(): number;
        /** @returns float */
        getMaxDelayMsecs(): number;
        /** @returns float */
        getMaxAttenuation(): number;
        /** @returns float */
        getMinDelayMsecs(): number;
        /** @returns float */
        getMinAttenuation(): number;
        /** @returns float */
        getDelayFromDistance(): number;
        /** @returns int */
        getDiffusionPathCount(): number;
        /** @returns int */
        getEchoesInjected(): number;
        /** @returns int */
        getEchoesSuppressed(): number;

        /**
         * ms of delay added to all echos
         * @returns float
         */
        getPreDelay(): number;
        /**
         * ms of delay added to all echos
         * @param preDelay float
         */
        setPreDelay(preDelay: number): void;

        /**
         * ms per meter that sound travels, larger means slower, which sounds bigger
         * @returns float
         */
        getSoundMsPerMeter(): number;
        /**
         * ms per meter that sound travels, larger means slower, which sounds bigger
         * @param soundsMsPerMeter float
         */
        setSoundMsPerMeter(soundsMsPerMeter: number): void;

        /**
         * scales attenuation to be louder or softer than the default distance attenuation
         * @returns float
         */
        getDistanceAttenuationScalingFactor(): number;
        /**
         * scales attenuation to be louder or softer than the default distance attenuation
         * @param factor float
         */
        setDistanceAttenuationScalingFactor(factor: number): void;

        /**
         * scales attenuation of local audio to be louder or softer than the default attenuation
         * @returns float
         */
        getLocalAudioAttenuationFactor(): number;
        /**
         * scales attenuation of local audio to be louder or softer than the default attenuation
         * @param factor float
         */
        setLocalAudioAttenuationFactor(factor: number): void;

        /**
         * ms window in which we will suppress echoes to reduce comb filter effects
         * @return float
         */
        getCombFilterWindow(): number;
        /**
         * ms window in which we will suppress echoes to reduce comb filter effects
         * @param value float
         */
        setCombFilterWindow(value: number): void;

        /**
         * number of points of diffusion from each reflection point, as fanout increases there are more chances for secondary
         * echoes, but each diffusion ray is quieter and therefore more likely to be below the sound floor
         * @returns int
         */
        getDiffusionFanout(): number;
        /**
         * number of points of diffusion from each reflection point, as fanout increases there are more chances for secondary
         * echoes, but each diffusion ray is quieter and therefore more likely to be below the sound floor
         * @param fanout int
         */
        setDiffusionFanout(fanout: number): void;

        /**
         * ratio 0.0 - 1.0 of amount of each ray that is absorbed upon hitting a surface  
         * @returns float
         */
        getAbsorptionRatio(): number;
        /**
         * ratio 0.0 - 1.0 of amount of each ray that is absorbed upon hitting a surface  
         * @param ratio float
         */
        setAbsorptionRatio(ratio: number): void;

        /**
         * ratio 0.0 - 1.0 of amount of each ray that is diffused upon hitting a surface
         * @return float
         */
        getDiffusionRatio(): number;
        /**
         * ratio 0.0 - 1.0 of amount of each ray that is diffused upon hitting a surface
         * @param ratio float
         */
        setDiffusionRatio(ratio: number): void;

        /**
         * remaining ratio 0.0 - 1.0 of amount of each ray that is cleanly reflected upon hitting a surface
         * @returns float
         */
        getReflectiveRatio(): number;
        /**
         * remaining ratio 0.0 - 1.0 of amount of each ray that is cleanly reflected upon hitting a surface
         * @param ratio float
         */
        setReflectiveRatio(ratio: number): void;

        /**
         * wet/dry mix - these don't affect any reflection calculations, only the final mix volumes
         * @returns float
         */
        getOriginalSourceAttenuation(): number;
        /**
         * wet/dry mix - these don't affect any reflection calculations, only the final mix volumes
         * @param value float
         */
        setOriginalSourceAttenuation(value: number): void;
        /**
         * wet/dry mix - these don't affect any reflection calculations, only the final mix volumes
         * @returns float
         */
        getEchoesAttenuation(): number;
        /**
         * wet/dry mix - these don't affect any reflection calculations, only the final mix volumes
         * @param value float
         */
        setEchoesAttenuation(value: number): void;
    }
}

declare var AudioInjectionOptions: {
    prototype: hifi.IAudioInjectorOptions;
    new (): hifi.IAudioInjectorOptions;
}

declare var Sound: {
    prototype: hifi.ISound;
    /**
     * @param parent default null
     */
    new (sampleURL: string, parent?: any): hifi.ISound;

    /**
     * @param volume float
     * @param frequency float
     * @param duration float
     * @param decay float
     * @param parent default null
     */
    new (volume: number, frequency: number, duration: number, decay: number,
        parent?: any): hifi.ISound;
}

declare var Audio: hifi.IAudioScriptingInterface;
declare var AudioDevice: hifi.IAudioDeviceScriptingInterface;
declare var AudioReflector: hifi.IAudioReflector;
