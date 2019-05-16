export interface Train {
    id: string;
    speed: number | undefined; // -128 ... 0 ... 127
    forwardPins: Pin[];
}
