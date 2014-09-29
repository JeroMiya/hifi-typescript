/// <reference path="IVec2.d.ts" />
/// <reference path="IColor.d.ts" />
declare module hifi {

    /**
     * Checked against /interface/src/ui/overlays/Overlay.cpp
     * see Overlay::setProperties
     * 2014-09-28
     */
    interface IOverlayProperties {
        color?: IColor;
        /** float */
        alpha?: number;
        visible?: boolean;
        anchor?: string;
    }

    /**
     * Checked against interface/src/ui/overlays/Overlays.{h,cpp}
     * 2014-09-28
     */
    interface IOverlays {
        /**
         * adds an overlay with the specific properties
         * @param type valid values: image, text, cube, sphere,
         * line3d, localvoxels, localmodels, model, billboard
         * @returns unsigned int
         */
        addOverlay(type: string, properties: IOverlayProperties): number;

        /**
         * edits an overlay updating only the included properties, will return the identified OverlayID in case of
         * successful edit, if the input id is for an unknown overlay this function will have no effect
         * @param id unsigned int
         */
        editOverlay(id: number, properties: IOverlayProperties): boolean;

        /**
         * deletes a particle
         * @param id unsigned int
         */
        deleteOverlay(id: number): void;

        /**
         * returns the top most overlay at the screen point, or 0 if not overlay at that point
         * @returns unsigned int
         */
        getOverlayAtPoint(point: IVec2): number;

        /**
         * returns whether the overlay's assets are loaded or not
         * @param id unsigned int
         */
        isLoaded(id: number): boolean;
    }
}

declare var Overlays: hifi.IOverlays;
