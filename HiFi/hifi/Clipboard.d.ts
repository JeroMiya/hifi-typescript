/// <reference path="INumberTypes.d.ts" />
/// <reference path="Voxels.d.ts" />
/// <reference path="ISignal.d.ts" />

/**
 * /src/scripting/ClipboardScriptingInterface.h
 * September 16th, 2014
 */
interface IClipboard {
    cutVoxel(sourceVoxel: IVoxelDetail): void;
    cutVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    copyVoxel(sourceVoxel: IVoxelDetail): void;
    copyVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    pasteVoxel(destinationVoxel: IVoxelDetail): void;
    pasteVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    deleteVoxel(sourceVoxel: IVoxelDetail): void;
    deleteVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    exportVoxel(sourceVoxel: IVoxelDetail): void;
    exportVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    importVoxels(): boolean;
    importVoxels(filename: string): boolean;
    importVoxels(filename: string, x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): boolean;
    importVoxels(filename: string, destinationVoxel: IVoxelDetail): boolean;

    nudgeVoxel(sourceVoxel: IVoxelDetail, nudgeVec: IVec3): void;
    nudgeVoxel(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */, nudgeVec: IVec3): void;

    importEntities(filename: string): boolean;
    exportEntities(fileName: string, x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): boolean;
    pasteEntities(x: number /* float */, y: number /* float */, z: number /* float */, s: number /* float */): void;

    readyToImport: ISignal<() => void>;
}

declare var Clipboard: IClipboard;
