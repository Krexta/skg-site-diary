import { CONSUMED_WORKERS_PERCENTAGE_PRECISION, CONSUMED_WORKERS_PERCENTAGE_SCALE, PositiveDecimal } from "./BaseNumber.js";
export class ConsumedWorkersPercentage extends PositiveDecimal {
    static from(value) {
        return new ConsumedWorkersPercentage({
            value,
            precision: CONSUMED_WORKERS_PERCENTAGE_PRECISION,
            scale: CONSUMED_WORKERS_PERCENTAGE_SCALE
        });
    }
    static new() {
        return new ConsumedWorkersPercentage({
            value: '0.0',
            precision: CONSUMED_WORKERS_PERCENTAGE_PRECISION,
            scale: CONSUMED_WORKERS_PERCENTAGE_SCALE
        });
    }
}

//# sourceMappingURL=ConsumedWorkersPercentage.js.map