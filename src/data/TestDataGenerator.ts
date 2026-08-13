import { BasicInfo } from "./BasicInfo";
import { EducationInfo } from "./EducationInfo";
import { WorkExperience } from "./WorkExperienceInfo";



export class TestDataGenerator {
    readonly basicInfo: BasicInfo;
    readonly eduData: EducationInfo;
    readonly workExpData: WorkExperience;

    constructor() {
        this.basicInfo = new BasicInfo();
        this.eduData = new EducationInfo();
        this.workExpData = new WorkExperience();
    }
}