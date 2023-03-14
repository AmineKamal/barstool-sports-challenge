export function sum(arr: number[]) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T extends any[]>(arr: Readonly<T>): T[number] {
    return arr[getRandomInt(0, arr.length - 1)];
}
