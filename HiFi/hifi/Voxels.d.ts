/// <reference path="IVec3.d.ts" />
/// <reference path="IQuat.d.ts" />
/// <reference path="IColor.d.ts" />

// checked against /libraries/voxels/src/VoxelDetail.h
// September 16th, 2014
interface IVoxelDetail extends IVec3, IColor {
    s: number /* float */;
}

// checked against /libraries/voxels/src/VoxelDetail.h
// September 16th, 2014
interface IRayToVoxelIntersectionResult {
    intersects: boolean;
    accurate: boolean;
    voxel: IVoxelDetail;
    distance: number /* float */;
    /**
     * Enum: BoxFace
     * possible values MIN_X_FACE, MAX_X_FACE, MIN_Y_FACE, 
     * MAX_Y_FACE, MIN_Z_FACE, MAX_Z_FACE, UNKNOWN_FACE
     * values checked against /libraries/shared/src/BoxBase.h
     * September 16th, 2014
     */
    face: string;
    intersection: IVec3;
}

// checked against /libraries/shared/src/RegisteredMetaTypes.h
// September 12
interface IPickRay {
    origin: IVec3;
    direction: IVec3;
}

// checked against /libraries/voxels/src/VoxelsScriptingInterface.h
// September 16th, 2014
interface IVoxels {
    /**
     * provide the world scale.
     */
    getTreeScale(): number;

    /** 
     * checks the local voxel tree for a voxel at the specified location and scale
     * @param x the x-coordinate of the voxel (in meter units)
     * @param y the y-coordinate of the voxel (in meter units)
     * @param z the z-coordinate of the voxel (in meter units)
     * @param scale the scale of the voxel (in meter units)
     */
    getVoxelAt(x: number /* float */, y: number /* float */, z: number /* float */, scale: number /* float */): IVoxelDetail;

    /**
     * queues the creation of a voxel which will be sent by calling process on the PacketSender
     * @param x the x-coordinate of the voxel (in meter units)
     * @param y the y-coordinate of the voxel (in meter units)
     * @param z the z-coordinate of the voxel (in meter units)
     * @param scale the scale of the voxel (in meter units)
     * @param red the R value for RGB color of voxel
     * @param green the G value for RGB color of voxel
     * @param blue the B value for RGB color of voxel
     */
    setVoxelNonDestructive(x: number /* float */, y: number /* float */, z: number /* float */, scale: number /* float */,
        red: IUChar, green: IUChar, blue: IUChar): void;

    /**
     * queues the destructive creation of a voxel which will be sent by calling process on the PacketSender
     * @param x the x-coordinate of the voxel (in meter units)
     * @param y the y-coordinate of the voxel (in meter units)
     * @param z the z-coordinate of the voxel (in meter units)
     * @param scale the scale of the voxel (in meter units)
     * @param red the R value for RGB color of voxel
     * @param green the G value for RGB color of voxel
     * @param blue the B value for RGB color of voxel
     */
    setVoxel(x: number /* float */, y: number /* float */, z: number /* float */, scale: number /* float */,
        red: IUChar, green: IUChar, blue: IUChar): void;

    /**
     * queues the deletion of a voxel, sent by calling process on the PacketSender
     * @param x the x-coordinate of the voxel (in meter units)
     * @param y the y-coordinate of the voxel (in meter units)
     * @param z the z-coordinate of the voxel (in meter units)
     * @param scale the scale of the voxel (in meter units)
     */
    eraseVoxel(x: number /* float */, y: number /* float */, z: number /* float */, scale: number /* float */): void;

    /**
     * If the scripting context has visible voxels, this will determine a ray intersection, the results
     * may be inaccurate if the engine is unable to access the visible voxels, in which case result.accurate
     * will be false.
     */
    findRayIntersection(ray: IPickRay): IRayToVoxelIntersectionResult;

    /**
     * If the scripting context has visible voxels, this will determine a ray intersection, and will block in
     * order to return an accurate result
     */
    findRayIntersectionBlocking(ray: IPickRay): IRayToVoxelIntersectionResult;

    /**
     * returns a voxel space axis aligned vector for the face, useful in doing voxel math
     */
    getFaceVector(face: string): IVec3;

    /**
     * checks the local voxel tree for the smallest voxel enclosing the point
     * @param point the x,y,z coordinates of the point (in meter units)
     * @return VoxelDetail - if no voxel encloses the point then VoxelDetail items will be 0
     */
    getVoxelEnclosingPoint(point: IVec3): IVoxelDetail;

    /**
     * checks the local voxel tree for the smallest voxel enclosing the point and uses a blocking lock
     * @param point the x,y,z coordinates of the point (in meter units)
     * @return VoxelDetail - if no voxel encloses the point then VoxelDetail items will be 0
     */
    getVoxelEnclosingPointBlocking(point: IVec3): IVoxelDetail;
}

declare var Voxels: IVoxels;