export interface SamplingBuffer {
    buffer: Uint8Array;
    lastSampleIdx: number;
    value: number | null;
}

export function addSample(
    sBuffer: SamplingBuffer,
    value: number,
): number | null {
    const nextIdx = nextSampleIdx(sBuffer);
    sBuffer.buffer[nextIdx] = value;
    sBuffer.lastSampleIdx = nextIdx;

    if (isBufferFilled(sBuffer)) {
        sBuffer.value = calculateMin(sBuffer);
        return sBuffer.value;
    }

    return null;
}

export function initBuffer(size: number): SamplingBuffer {
    return {
        buffer: new Uint8Array(size),
        lastSampleIdx: -1,
        value: null,
    } as SamplingBuffer;
}


function nextSampleIdx(sBuffer: SamplingBuffer): number {
    if (sBuffer.lastSampleIdx === -1 || sBuffer.lastSampleIdx === (sBuffer.buffer.length - 1)) {
        return 0;
    } else {
        return sBuffer.lastSampleIdx + 1;
    }
}

function isBufferFilled(sBuffer: SamplingBuffer): boolean {
    if (sBuffer.value !== null) {
        return true;
    }

    return sBuffer.lastSampleIdx === sBuffer.buffer.length - 1;
}

function calculateMean(sBuffer: SamplingBuffer): number {
    const mean = sBuffer.buffer.reduce((prev, v) => prev + v, 0.0) / sBuffer.buffer.length;
    const outlier = sBuffer.buffer.reduce((prev, v) => dist(mean, v) > dist(mean, prev) ? v : prev, mean);
    const stableMean = sBuffer.buffer.reduce((prev, v) => prev + v, -outlier) / (sBuffer.buffer.length - 1);
    return stableMean;
}

function dist(a: number, b: number): number {
    const dist = a - b;
    if (dist < 0) {
        return -dist;
    }
    return dist;
}

function calculateMin(sBuffer: SamplingBuffer): number {
    return sBuffer.buffer.reduce((prev, v) => prev > v ? v : prev, sBuffer.buffer[0]);
}
