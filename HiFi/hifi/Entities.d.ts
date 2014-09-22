/// <reference path="IVec3.d.ts" />

/**
 * Abstract ID for editing model items. Used in EntityItem JS API - When models are created in the JS api, they are given a
 * local creatorTokenID, the actual id for the model is not known until the server responds to the creator with the
 * correct mapping. This class works with the scripting API an allows the developer to edit models they created.
 * 
 * checked against /libraries/entities/src/EntityItemID.{cpp,h}
 * September 18th, 2014
 */
interface IEntityItemID {
    /** QUuid */
    id: number;

    /** uint32_t */
    creatorTokenID: number;

    isKnownID: boolean;

    /**
     * not sure if this is mapped in the JS API
     * these methods will reduce the ID down to half the IDs data to allow for comparisons and searches of known values
     */
    convertToKnownIDVersion(): IEntityItemID;

    /**
     * not sure if this is mapped in the JS API
     * these methods will reduce the ID down to half the IDs data to allow for comparisons and searches of known values
     */
    convertToCreatorTokenVersion(): IEntityItemID;
}

/**
 * Abstract ID for editing model items. Used in EntityItem JS API - When models are created in the JS api, they are given a
 * local creatorTokenID, the actual id for the model is not known until the server responds to the creator with the
 * correct mapping. This class works with the scripting API an allows the developer to edit models they created.
 * 
 * checked against /libraries/entities/src/EntityItemID.{cpp,h}
 * September 18th, 2014
 */
declare var EntityItemID: {
    prototype: IEntityItemID;
    new (): IEntityItemID;
    new (other: IEntityItemID): IEntityItemID;

    /**
     * @param id QUuid
     * @param creatorTokenID uint32_t
     */
    new (id: number, creatorTokenID: number, isKnownID: boolean): IEntityItemID;

    /**
     * @param id QUuid
     */
    new (id: number): IEntityItemID;

    /**
     * not sure if this is mapped in the JS API
     * these methods allow you to create models, and later edit them.
     * @param creatorTokenID uint32_t
     */
    getIDfromCreatorTokenID(creatorTokenID: number): IEntityItemID;

    /**
     * not sure if this is mapped in the JS API
     * these methods allow you to create models, and later edit them.
     * @returns uint32_t
     */
    getNextCreatorTokenID(): number;

    /**
     * not sure if this is mapped in the JS API
     * these methods allow you to create models, and later edit them.
     * @param packet QByteArray
     */
    handleAddEntityResponse(packet: any): void;

    /**
     * not sure if this is mapped in the JS API
     * these methods allow you to create models, and later edit them.
     * @param data unsigned char*
     * @param bytesLeftToRead int
     */
    readEntityItemIDFromBuffer(data: string, bytesLeftToRead: number): IEntityItemID;
}

/*
 * A collection of properties of an entity item used in the scripting API. Translates between the actual properties of an
 * entity and a JavaScript style hash/QScriptValue storing a set of properties. Used in scripting to set/get the complete
 * set of entity item properties via JavaScript hashes/QScriptValues
 * all units for position, dimensions, etc are in meter units
 * 
 * checked in /libraries/entities/src/EntityItemProperties.{cpp,h}
 * See EntityItemProperties::copyToScriptValue
 * September 18th, 2014
 */
interface IEntityItemProperties {
    /** QUUid, read-only */
    id?: number;

    /** read-only */
    isKnownID?: boolean;

    /** read-only */
    type?: any; // entity type? enum?

    /**
     * set position in meter units, will be clamped to domain bounds
     */
    position?: IVec3;
    dimensions?: IVec3;

    /** read-only */
    naturalDimensions?: IVec3;

    rotation?: IQuat;

    /**
     * velocity in domain scale units (0.0-1.0) per second
     */
    velocity?: IVec3;

    /**
     * gravity in domain scale units (0.0-1.0) per second squared
     */
    gravity?: IVec3;

    /** float */
    damping?: number;

    /** 
     * float
     * get the lifetime in seconds for the entity
     */
    lifetime?: number;

    /** float, read-only */
    age?: number;

    /** read-only */
    ageAsText?: string;

    script?: string;
    registrationPoint?: IVec3;
    angularVelocity?: IVec3;

    /** float */
    angularDamping?: number;

    visible?: boolean;
    color?: IColor;
    modelURL?: string;
    animationURL?: string;
    animationIsPlaying?: boolean;

    /** float */
    animationFrameIndex?: number;

    /** float */
    animationFPS?: number;

    /** float */
    glowLevel?: number;
}

/**
 * checked from /libraries/entities/src/EntityScriptingInterface.{cpp,h}
 * See: RayToEntityIntersectionResultFromScriptValue
 * September 18th, 2014
 */
interface IRayToEntityIntersectionResult {
    intersects: boolean;
    accurate: boolean;
    entityID: IEntityItemID;
    properties: IEntityItemProperties;
    /** float */
    distance: number;

    /**
     * enum: BoxFace
     * Valid values are MIN_X_FACE, MAX_X_FACE, MIN_Y_FACE, MAX_Y_FACE, MIN_Z_FACE, MAX_Z_FACE,
     * and UNKNOWN_FACE.
     * #research: need to figure out whether these values are mapped somewhere.
     */
    face: string;
    intersection: IVec3;
}

/**
 * handles scripting of Entity commands from JS passed to assigned clients
 * 
 * checked against /libraries/entities/src/EntityScriptingInterface.{h,cpp}
 * September 18th, 2014
 */
interface IEntityScriptingInterface {
    /**
     * adds a model with the specific properties
     */
    addEntity(properties: IEntityItemProperties): IEntityItemID;

    /**
     * identify a recently created model to determine its true ID
     */
    identifyEntity(entityID: IEntityItemID): IEntityItemID;

    /**
     * gets the current model properties for a specific model
     * this function will not find return results in script engine contexts which don't have access to models
     */
    getEntityProperties(entityID: IEntityItemID): IEntityItemProperties;

    /**
     * edits a model updating only the included properties, will return the identified EntityItemID in case of
     * successful edit, if the input entityID is for an unknown model this function will have no effect
     */
    editEntity(entityID: IEntityItemID, properties: IEntityItemProperties): IEntityItemID;

    /**
     * deletes a model
     */
    deleteEntity(entityID: IEntityItemID): void;

    /**
     * finds the closest model to the center point, within the radius
     * will return a EntityItemID.isKnownID = false if no models are in the radius
     * this function will not find any models in script engine contexts which don't have access to models
     * @param radius float
     */
    findClosestEntity(center: IVec3, radius: number): IEntityItemID;

    /**
     * finds models within the search sphere specified by the center point and radius
     * this function will not find any models in script engine contexts which don't have access to models
     * @param radius float
     */
    findEntities(center: IVec3, radius: number): IEntityItemID[];

    /**
     * If the scripting context has visible voxels, this will determine a ray intersection, the results
     * may be inaccurate if the engine is unable to access the visible voxels, in which case result.accurate
     * will be false.
     */
    findRayIntersection(ray: IPickRay): IRayToEntityIntersectionResult;

    /**
     * If the scripting context has visible voxels, this will determine a ray intersection, and will block in
     * order to return an accurate result
     */
    findRayIntersectionBlocking(ray: IPickRay): IRayToEntityIntersectionResult;

    dumpTree(): void;
}

declare var Entities: IEntityScriptingInterface;