class MathHelper {
    static clamp(n, min, max) {
        return n <= min ? min : n >= max ? max : n;
    }

    static random(min, max) {
        return Math.round(Math.random() * (max)) + parseInt(min, 10);
    }

}

export { MathHelper };