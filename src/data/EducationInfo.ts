import { RandomUtils } from "../helpers/randomUtils";

// 20 unreal (fictional) institute name + location pairs
const INSTITUTE: { name: string; location: string }[] = [
    { name: 'Sunrise Valley Public School', location: 'Pune' },
    { name: 'Green Meadows College', location: 'Nashik' },
    { name: 'Silver Oak International School', location: 'Mumbai' },
    { name: 'Horizon Public School', location: 'Nagpur' },
    { name: 'Maple Leaf College', location: 'Bangalore' },
    { name: 'Crimson Hills School', location: 'Hyderabad' },
    { name: 'Northgate Institute of Technology', location: 'Ahmedabad' },
    { name: 'Bluebell Academy', location: 'Chennai' },
    { name: 'Riverside Public School', location: 'Kolkata' },
    { name: 'Evergreen College of Arts & Science', location: 'Jaipur' },
    { name: 'Starlight International School', location: 'Lucknow' },
    { name: 'Pinewood College', location: 'Indore' },
    { name: 'Lakeview Public School', location: 'Bhopal' },
    { name: 'Golden Gate Institute', location: 'Patna' },
    { name: 'Emerald Heights School', location: 'Chandigarh' },
    { name: 'Westbrook College', location: 'Surat' },
    { name: 'Oakridge International School', location: 'Coimbatore' },
    { name: 'Summit Public School', location: 'Kochi' },
    { name: 'Falcon Valley College', location: 'Guwahati' },
    { name: 'Trinity Heights School', location: 'Dehradun' },
];

// 20 degree names
const DEGREE = [
    'Secondary School Certificate (SSC)',
    'Higher Secondary Certificate (HSC)',
    'Bachelor of Science in Computer Science',
    'Bachelor of Engineering in Information Technology',
    'Bachelor of Commerce',
    'Bachelor of Arts',
    'Bachelor of Business Administration',
    'Bachelor of Computer Applications',
    'Master of Science in Computer Science',
    'Master of Business Administration',
    'Master of Computer Applications',
    'Master of Arts',
    'Master of Commerce',
    'Bachelor of Technology in Electronics & Communication',
    'Bachelor of Technology in Mechanical Engineering',
    'Diploma in Computer Engineering',
    'Diploma in Mechanical Engineering',
    'Bachelor of Pharmacy',
    'Bachelor of Architecture',
    'Master of Technology in Computer Science',
];

export class EducationInfo {
    readonly instituteName: string;
    readonly instituteLocation: string;
    readonly degree: string;
    readonly completionDate: string;

    constructor() {
        const institute = RandomUtils.randomArray(INSTITUTE);
        this.instituteName = institute.name;
        this.instituteLocation = institute.location;
        this.degree = RandomUtils.randomArray(DEGREE);

        // completion date: sometime between 15 years ago and 1 year ago
        const completion = RandomUtils.randomPastDate(15, 1);
        this.completionDate = RandomUtils.formatDate(completion);
    }
}