declare module hifi {
    interface ISignal<T extends Function> {
        connect(func: T): void;
    }
}
