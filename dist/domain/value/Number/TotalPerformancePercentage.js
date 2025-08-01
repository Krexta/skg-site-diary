import { PositiveDecimal, TOTAL_PERFORMANCE_PERCENTAGE_PRECISION, TOTAL_PERFORMANCE_PERCENTAGE_SCALE } from "./BaseNumber.js";
export class TotalPerformancePercentage extends PositiveDecimal {
    static from(value) {
        return new TotalPerformancePercentage({
            value,
            precision: TOTAL_PERFORMANCE_PERCENTAGE_PRECISION,
            scale: TOTAL_PERFORMANCE_PERCENTAGE_SCALE
        });
    }
    static new() {
        return new TotalPerformancePercentage({
            value: '0.0',
            precision: TOTAL_PERFORMANCE_PERCENTAGE_PRECISION,
            scale: TOTAL_PERFORMANCE_PERCENTAGE_SCALE
        });
    }
}

//# sourceMappingURL=TotalPerformancePercentage.js.map