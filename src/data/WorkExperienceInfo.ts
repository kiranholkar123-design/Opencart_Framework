import { RandomUtils } from "../helpers/randomUtils";

// 20 unreal (fictional) company name + location pairs
const COMPANY: { name: string; location: string }[] = [
    { name: 'Nimbus Softech Solutions', location: 'Pune' },
    { name: 'Bluewave Technologies', location: 'Bangalore' },
    { name: 'Orbit Digital Pvt Ltd', location: 'Mumbai' },
    { name: 'Skyline Infosystems', location: 'Hyderabad' },
    { name: 'Crestline Consulting', location: 'Chennai' },
    { name: 'Pinnacle Data Labs', location: 'Noida' },
    { name: 'Ironclad Systems', location: 'Gurgaon' },
    { name: 'Zenith Software Corp', location: 'Ahmedabad' },
    { name: 'Novatech Enterprises', location: 'Kolkata' },
    { name: 'Brightpath Technologies', location: 'Jaipur' },
    { name: 'Silverline Global Services', location: 'Indore' },
    { name: 'Meridian Software Pvt Ltd', location: 'Nagpur' },
    { name: 'Falconworks Technologies', location: 'Chandigarh' },
    { name: 'Everest Data Systems', location: 'Lucknow' },
    { name: 'Cobalt Digital Solutions', location: 'Bhopal' },
    { name: 'Quantum Edge Technologies', location: 'Coimbatore' },
    { name: 'Vertex IT Services', location: 'Kochi' },
    { name: 'Starforge Innovations', location: 'Surat' },
    { name: 'Redwood Systems Pvt Ltd', location: 'Guwahati' },
    { name: 'Lighthouse Tech Solutions', location: 'Dehradun' },
];

// 20 designations
const DESIGNATION = [
    'Software Engineer',
    'Senior Software Engineer',
    'QA Engineer',
    'Senior QA Engineer',
    'SDET',
    'Business Analyst',
    'Project Manager',
    'Team Lead',
    'Technical Lead',
    'DevOps Engineer',
    'System Administrator',
    'Database Administrator',
    'UI/UX Designer',
    'Product Manager',
    'Data Analyst',
    'Data Scientist',
    'Network Engineer',
    'Support Engineer',
    'Associate Consultant',
    'Senior Consultant',
];

export class WorkExperience {
    readonly companyName: string;
    readonly companyLocation: string;
    readonly designation: string;
    readonly fromDate: string;
    readonly toDate: string;

    constructor() {
        const company = RandomUtils.randomArray(COMPANY);
        this.companyName = company.name;
        this.companyLocation = company.location;
        this.designation = RandomUtils.randomArray(DESIGNATION);

        // "from" date: sometime between 10 years ago and 2 years ago
        const from = RandomUtils.randomPastDate(10, 2);
        // "to" date: sometime after "from", but not later than today
        const to = RandomUtils.randomDateAfter(from);

        this.fromDate = RandomUtils.formatDate(from);
        this.toDate = RandomUtils.formatDate(to);
    }
}