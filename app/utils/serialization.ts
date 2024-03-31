/**
 * This file contains custom serialization functions for JSON.stringify to handle BigInts.
 * Reference: https://github.com/GoogleChromeLabs/jsbi/issues/30
 */

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface BigInt {
    /** Convert to BigInt to string form in JSON.stringify */
    toJSON: () => string;
}
BigInt.prototype.toJSON = function () {
    return this.toString();
};
