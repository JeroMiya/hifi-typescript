/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />
/// <reference path="INumberTypes.d.ts" />

declare module hifi {
    /**
     * Checked against /libraries/animation/src/AnimationCache.h
     * 2014-09-13
     */
    interface IAnimationDetails {
        role: string;
        url: string;
        fps: number /* float */;
        priority: number /* float */;
        loop: boolean;
        hold: boolean;
        startAutomatically: boolean;
        firstFrame: number /* float */;
        lastFrame: number /* float */;
        running: boolean;
        frameIndex: number /* float */;
    }

    /**
     * Checked against /libraries/avatars/src/AvatarData.h
     * September 17th, 2014
     */
    interface IAttachmentData {
        modelURL: string;
        jointName: string;
        translation: IVec3;
        rotation: IQuat;

        /** float */
        scale: number;
        isValid(): boolean;
    }

    /**
     * Scriptable wrapper for attachments.
     * Checked against /libraries/avatars/src/AvatarData.h
     * September 17th, 2014
     */
    interface IAttachmentDataObject {
        modelURL: string;
        jointName: string;
        translation: IVec3;
        rotation: IQuat;

        /** float */
        scale: number;

        // for some reason, the accessors are also invokable?
        // should I map them here as well?
    }


    /**
     * Checked against /libraries/avatars/src/AvatarData.h
     * September 17th, 2014
     */
    interface IAvatarData {
        position: IVec3;
        /** float */
        scale: number;

        handPosition: IVec3;

        /** float */
        bodyYaw: number;

        /** float */
        bodyPitch: number;

        /** float */
        bodyRoll: number;

        chatMessage: string;

        orientation: IQuat;

        headOrientation: IQuat;

        /** float */
        headPitch: number;

        /** float */
        headYaw: number;

        /** float */
        headRoll: number;

        /** float */
        audioLoudness: number;

        /** float */
        audioAverageLoudness: number;

        displayName: string;

        faceModelURL: string;

        skeletonModelURL: string;

        attachmentData: IAttachmentData[];

        billboardURL: string;

        jointNames: string[];

        /** QUuid */
        sessionUUID: number;

        /**
         * @param s char
         */
        setHandState(s: number): void;

        /**
         * @returns char
         */
        getHandState(): number;

        /**
         * @param index int
         */
        setJointData(index: number, rotation: IQuat): void;
        setJointData(name: string, rotation: IQuat): void;

        /**
         * @param index int
         */
        clearJointData(index: number): void;
        clearJointData(name: string): void;

        /**
         * @param index int
         */
        isJointDataValid(index: number): boolean;
        isJointDataValid(name: string): boolean;

        /**
         * @param index int
         */
        getJointRotation(index: number): IQuat;
        getJointRotatoin(name: string): IQuat;

        getJointRotations(): IQuat[];
        setJointRotations(jointRotations: IQuat[]): void;

        clearJointsData(): void;

        /**
         * Returns the index of the joint with the specified name,
         * or -1 if not found/unknown.
         * @returns int
         */
        getJointIndex(name: string): number;

        getJointNames(): string[];

        /**
         * @param val float
         */
        setBlendShape(name: string, val: number): void;

        getAttachmentData(): IAttachmentData[];
        setAttachmentData(attachmentData: IAttachmentData[]): void;

        /**
         * @param jointName default ''
         * @param translation default { x: 0, y: 0, z: 0 }
         * @param rotation default { x: 0, y: 0, z: 0, w: 0 }
         * @param scale default 1.0
         * @param allowDuplicates default false
         * @param useSaved default true
         */
        attach(modelURL: string, jointName?: string,
            translation?: IVec3, rotation?: IQuat, scale?: number,
            allowDuplicates?: boolean, useSaved?: boolean): void;

        /**
         * @param jointName default ''
         */
        detachOne(modelURL: string, jointName?: string): void;

        /**
         * @param jointName default ''
         */
        detachAll(modelURL: string, jointName?: string): void;

        sendIdentityPacket(): void;
        sendBillboardPacket(): void;
        setBillboardFromNetworkReply(): void;
        setJointMappingsFromNetworkReply(): void;

        /**
         * @param sessionUUID QUuid
         */
        setSessionUUID(sessionUUID: number): void;

        hasReferential(): boolean;

        isPlaying(): boolean;

        /**
         * @returns qint64
         */
        playerElapsed(): number;

        /**
         * @returns qint64
         */
        playerLength(): number;
        loadRecording(filename: string): void;
        startPlaying(): void;
        setPlayFromCurrentLocation(playFromCurrentLocation: boolean): void;
        setPlayerLoop(loop: boolean): void;
        play(): void;
        stopPlaying(): void;
    }

    /**
     * /interface/src/avatar/Avatar.h
     * September 16th, 2014
     */
    interface IAvatar extends IAvatarData {
        collisionGroups: IUInt32;
        getJointPosition(index: number): IVec3;
        getJointPosition(name: string): IVec3;
        getJointCombinedRotation(index: number): IQuat;
        getJointCombinedRotation(name: string): IQuat;
        getVelocity(): IVec3;
        getAcceleration(): IVec3;
        getAngularVelocity(): IVec3;
        getAngularAcceleration(): IVec3;
        updateCollisionGroups(): void;
        collisionWithAvatar: ISignal<(myUUID: IQUuid, theirUUID: IQUuid, collision: ICollisionInfo) => void>;
    }

    /**
     * Checked against /interface/src/avatar/MyAvatar.h
     * 2014-09-13
     */
    interface IMyAvatar extends IAvatar {
        shouldRenderLocally: boolean;
        /** quint32 */
        motionBehaviors: number;
        gravity: IVec3;

        /**
         * Allows scripts to run animations.
         * @param fps default: 30.0f
         * @param priority default: 1.0f
         * @param loop default: false
         * @param hold default: false
         * @param firstFrame default: 0.0f
         * @param lastFrame default: FLT_MAX (3.402823466e+38F)
         * @param maskedJoints default: []
         */
        startAnimation(url: string, fps?: number /* float */, priority?: number /* float */, loop?: boolean,
            hold?: boolean, firstFrame?: number /* float */, lastFrame?: number /* float */,
            maskedJoints?: string[]): void;

        /**
         * Stops an animation as identified by a URL.
         */
        stopAnimation(url: string): void;

        /**
         * Starts an animation by its role, using the provided URL and parameters
         * if the avatar doesn't have a custom animation for the role.
         * @param url default: blank
         * @param fps default: 30.0f
         * @param priority default: 1.0
         * @param loop default: false
         * @param hold default: false
         * @param firstFrame default: 1.0f
         * @param lastFrame default: FLT_MAX (3.402823466e+38F)
         * @param maskedJoints default: []
         */
        startAnimationByRole(role: string, url: string, fps: number /* float */,
            priority: number /* float */, loop: boolean, hold: boolean,
            firstFrame: number /* float */, lastFrame: number /* float */, maskedJoints: string[]): void;

        /**
         * Stops an animation identified by its role.
         */
        stopAnimationByRole(role: string): void;

        getAnimationDetailsByRole(role: string): IAnimationDetails;
        getAnimationDetails(url: string): IAnimationDetails;

        getHeadPosition(): IVec3;
        getHeadFinalYaw(): number /* float */;
        getHeadFinalRoll(): number /* float */;
        getHeadFinalPitch(): number /* float */;
        getHeadDeltaPitch(): number /* float */;

        getEyePosition(): IVec3;
        getTargetAvatarPosition(): IVec3;

        increaseSize(): void;
        decreaseSize(): void;
        resetSize(): void;

        /**
         * @param hasOrientation default: false
         * @param newOrientation default: { x: 0.0, y: 0.0, z: 0.0 }
         */
        goToLocation(newPosition: IVec3, hasOrientation: boolean, newOrientation: IVec3): void;

        addThrust(newThrust: IVec3): void;
        getThrust(): IVec3;
        setThrust(newThrust: IVec3): void;

        setVelocity(velocity: IVec3): void;

        updateMotionBehaviorsFromMenu(): void;

        getLeftPalmPosition(): IVec3;
        getRightPalmPosition(): IVec3;

        clearReferential(): void;
        setModelReferential(id: IQUuid): boolean;
        setJointReferential(id: IQUuid, jointIndex: number): boolean;

        isRecording(): boolean;
        /**
         * @returns qint64
         */
        recorderElapsed(): number;
        startRecording(): void;
        stopRecording(): void;
        saveRecording(filename: string): void;
        loadLastRecording(): void;

        transformChanged: ISignal<() => void>;
    }
}

// TODO: Do we need to have separate declaration files for interface.exe
// and the alternative task server? Probably.
declare var MyAvatar: hifi.IMyAvatar;
declare var Avatar: hifi.IAvatar;
