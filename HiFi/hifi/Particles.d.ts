/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />
/// <reference path="IColor.d.ts" />

declare module hifi {

    /**
     * A collection of properties of a particle used in the scripting API. Translates between the actual properties of a particle
     * and a JavaScript style hash/QScriptValue storing a set of properties. Used in scripting to set/get the complete set of
     * particle properties via JavaScript hashes/QScriptValues
     * all units for position, velocity, gravity, radius, etc are in meter units
     * /libraries/particles/src/Particle.h
     * /libraries/particles/src/Particle.cpp (see ParticleProperties::copyToScriptValue)
     * Custom mapping
     * September 16th, 2014
     */
    interface IParticleProperties {
        position: IVec3;
        color: IColor;
        radius: number /* float */;
        velocity: IVec3;
        gravity: IVec3;
        damping: number /* float */;
        lifetime: number /* float */;
        script: string;
        inHand: boolean;
        shouldDie: boolean;
        modelURL: string;
        modelScale: number /* float */;
        modelTranslation: IVec3;
        modelRotation: IQuat;
        id: IUInt32;
        isKnownID: boolean;
    }

    /**
     * CollisionInfo contains details about the collision between two things: BodyA and BodyB.
     * The assumption is that the context that analyzes the collision knows about BodyA but
     * does not necessarily know about BodyB.  Hence the data storred in the CollisionInfo
     * is expected to be relative to BodyA (for example the penetration points from A into B).
     * /libraries/shared/src/CollisionInfo.h
     * But I'm not sure how this is getting mapped to the JS API
     */
    interface ICollisionInfo {
        // TODO: add mappings
    }


    /**
     * Abstract ID for editing particles. Used in Particle JS API - When particles are created in the JS api, they are given a
     * local creatorTokenID, the actual id for the particle is not known until the server responds to the creator with the
     * correct mapping. This class works with the scripting API an allows the developer to edit particles they created.
     * Checked against /libraries/particles/src/Particle.h
     * September 16th, 2014
     */
    interface IParticleID {
        id: IUInt32;
        creatorTokenID: IUInt32;
        isKnownID: boolean;
    }

    /**
     * handles scripting of Particle commands from JS passed to assigned clients
     * Checked against /libraries/particles/src/ParticlesScriptingInterface.h
     * September 16th, 2014
     */
    interface IParticles {
        /**
         * adds a particle with the specific properties
         */
        addParticle(properties: IParticleProperties): IParticleID;

        /**
         * identify a recently created particle to determine its true ID
         */
        identifyParticle(particleID: IParticleID): IParticleID;

        /**
         * gets the current particle properties for a specific particle
         * this function will not find return results in script engine contexts which don't have access to particles
         */
        getParticleProperties(particleID: IParticleID): IParticleProperties;

        /**
         * edits a particle updating only the included properties, will return the identified ParticleID in case of
         * successful edit, if the input particleID is for an unknown particle this function will have no effect
         */
        editParticle(particleID: IParticleID, properties: IParticleProperties): IParticleID;

        /**
         * deletes a particle
         */
        deleteParticle(particleID: IParticleID): void;

        /**
         * finds the closest particle to the center point, within the radius
         * will return a ParticleID.isKnownID = false if no particles are in the radius
         * this function will not find any particles in script engine contexts which don't have access to particles
         */
        findClosestParticle(center: IVec3, radius: number /* float */): IParticleID;

        /**
         * finds particles within the search sphere specified by the center point and radius
         * this function will not find any particles in script engine contexts which don't have access to particles
         */
        findParticles(center: IVec3, radius: number /* float */): IParticleID[];

        particleCollisionWithVoxel: ISignal<(particleID: IParticleID, voxel: IVoxelDetail, collision: ICollisionInfo) => void>;
        particleCollisionWithParticle: ISignal<(idA: IParticleID, idB: IParticleID, properties: IParticleProperties) => void>;
    }
}

declare var Particles: hifi.IParticles;
