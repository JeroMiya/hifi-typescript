/// <reference path="INumberTypes.d.ts" />
declare module hifi {
    interface IUUidStatic {
        print(lable: string, id: IQUuid): void;
    }
}

declare var Uuid: hifi.IUUidStatic;