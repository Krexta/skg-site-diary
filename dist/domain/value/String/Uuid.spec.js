import fc from "fast-check";
import * as uuid from "uuid";
import { describe, expect, it } from "vitest";
import { BillingClientId, CreateUserId, ExecutionBudgetUnitId, FileId, ProgressCheckReportedWorkerId, ProgressCheckReportId, ProjectBudgetChangeId, ProjectCloseReportId, ProjectCommonReportId, ProjectId, ProjectMeetingReportId, ProjectReportId, ProjectStatusUpdateReportId, ProjectWorkerReportId, ReportedWorkerId, UploadUserId, WorkerId } from "./Uuid.js";
describe('Uuid', ()=>{
    describe('ProjectReportId', ()=>{
        it('Should return ProjectReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectReportId.from(id);
                expect(result).toBeInstanceOf(ProjectReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectReportId', ()=>{
            const result = ProjectReportId.make();
            expect(result).toBeInstanceOf(ProjectReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('CreateUserId', ()=>{
        it('Should return CreateUserId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = CreateUserId.from(id);
                expect(result).toBeInstanceOf(CreateUserId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>CreateUserId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate CreateUserId', ()=>{
            const result = CreateUserId.make();
            expect(result).toBeInstanceOf(CreateUserId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectId', ()=>{
        it('Should return ProjectId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectId.from(id);
                expect(result).toBeInstanceOf(ProjectId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
    });
    describe('FileId', ()=>{
        it('Should return FileId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = FileId.from(id);
                expect(result).toBeInstanceOf(FileId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>FileId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate FileId', ()=>{
            const result = FileId.make();
            expect(result).toBeInstanceOf(FileId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('UploadUserId', ()=>{
        it('Should return UploadUserId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = UploadUserId.from(id);
                expect(result).toBeInstanceOf(UploadUserId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>UploadUserId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate UploadUserId', ()=>{
            const result = UploadUserId.make();
            expect(result).toBeInstanceOf(UploadUserId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProgressCheckReportId', ()=>{
        it('Should return ProgressCheckReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProgressCheckReportId.from(id);
                expect(result).toBeInstanceOf(ProgressCheckReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProgressCheckReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProgressCheckReportId', ()=>{
            const result = ProgressCheckReportId.make();
            expect(result).toBeInstanceOf(ProgressCheckReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ExecutionBudgetUnitId', ()=>{
        it('Should return ExecutionBudgetUnitId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ExecutionBudgetUnitId.from(id);
                expect(result).toBeInstanceOf(ExecutionBudgetUnitId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ExecutionBudgetUnitId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ExecutionBudgetUnitId', ()=>{
            const result = ExecutionBudgetUnitId.make();
            expect(result).toBeInstanceOf(ExecutionBudgetUnitId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectBudgetChangeId', ()=>{
        it('Should return ProjectBudgetChangeId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectBudgetChangeId.from(id);
                expect(result).toBeInstanceOf(ProjectBudgetChangeId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectBudgetChangeId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectBudgetChangeId', ()=>{
            const result = ProjectBudgetChangeId.make();
            expect(result).toBeInstanceOf(ProjectBudgetChangeId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('BillingClientId', ()=>{
        it('Should return BillingClientId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = BillingClientId.from(id);
                expect(result).toBeInstanceOf(BillingClientId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>BillingClientId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate BillingClientId', ()=>{
            const result = BillingClientId.make();
            expect(result).toBeInstanceOf(BillingClientId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectCloseReportId', ()=>{
        it('Should return ProjectCloseReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectCloseReportId.from(id);
                expect(result).toBeInstanceOf(ProjectCloseReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectCloseReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectCloseReportId', ()=>{
            const result = ProjectCloseReportId.make();
            expect(result).toBeInstanceOf(ProjectCloseReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectCommonReportId', ()=>{
        it('Should return ProjectCommonReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectCommonReportId.from(id);
                expect(result).toBeInstanceOf(ProjectCommonReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectCommonReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectCommonReportId', ()=>{
            const result = ProjectCommonReportId.make();
            expect(result).toBeInstanceOf(ProjectCommonReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectMeetingReportId', ()=>{
        it('Should return ProjectMeetingReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectMeetingReportId.from(id);
                expect(result).toBeInstanceOf(ProjectMeetingReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectMeetingReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectMeetingReportId', ()=>{
            const result = ProjectMeetingReportId.make();
            expect(result).toBeInstanceOf(ProjectMeetingReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectStatusUpdateReportId', ()=>{
        it('Should return ProjectStatusUpdateReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectStatusUpdateReportId.from(id);
                expect(result).toBeInstanceOf(ProjectStatusUpdateReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectStatusUpdateReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectStatusUpdateReportId', ()=>{
            const result = ProjectStatusUpdateReportId.make();
            expect(result).toBeInstanceOf(ProjectStatusUpdateReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProjectWorkerReportId', ()=>{
        it('Should return ProjectWorkerReportId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProjectWorkerReportId.from(id);
                expect(result).toBeInstanceOf(ProjectWorkerReportId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProjectWorkerReportId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProjectWorkerReportId', ()=>{
            const result = ProjectWorkerReportId.make();
            expect(result).toBeInstanceOf(ProjectWorkerReportId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('WorkerId', ()=>{
        it('Should return WorkerId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = WorkerId.from(id);
                expect(result).toBeInstanceOf(WorkerId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>WorkerId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate WorkerId', ()=>{
            const result = WorkerId.make();
            expect(result).toBeInstanceOf(WorkerId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ProgressCheckReportedWorkerId', ()=>{
        it('Should return ProgressCheckReportedWorkerId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ProgressCheckReportedWorkerId.from(id);
                expect(result).toBeInstanceOf(ProgressCheckReportedWorkerId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ProgressCheckReportedWorkerId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ProgressCheckReportedWorkerId', ()=>{
            const result = ProgressCheckReportedWorkerId.make();
            expect(result).toBeInstanceOf(ProgressCheckReportedWorkerId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
    describe('ReportedWorkerId', ()=>{
        it('Should return ReportedWorkerId when input is valid', ()=>{
            fc.assert(fc.property(fc.uuid({
                version: 7
            }), (id)=>{
                const result = ReportedWorkerId.from(id);
                expect(result).toBeInstanceOf(ReportedWorkerId);
                expect(result.value).toEqual(id);
            }));
        });
        it('Should throw error when input is invalid', ()=>{
            fc.assert(fc.property(fc.uuid().filter((value)=>uuid.version(value) !== 7), (id)=>{
                expect(()=>ReportedWorkerId.from(id)).toThrow(/Invalid UUID v7/);
            }));
        });
        it('Should generate ReportedWorkerId', ()=>{
            const result = ReportedWorkerId.make();
            expect(result).toBeInstanceOf(ReportedWorkerId);
            expect(uuid.validate(result.value)).toBe(true);
            expect(uuid.version(result.value)).toEqual(7);
        });
    });
});

//# sourceMappingURL=Uuid.spec.js.map