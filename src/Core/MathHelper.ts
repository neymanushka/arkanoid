class MathHelper {
    static clamp(n, min, max) {
        return n <= min ? min : n >= max ? max : n;
    }

    static random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export { MathHelper };