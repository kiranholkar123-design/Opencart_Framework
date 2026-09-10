import { RandomUtils } from "../helpers/randomUtils";


const USERS = [
  { firstName: "Aarav", middleName: "Kumar", lastName: "Sharma", gender: "Male" },
  { firstName: "Ishita", middleName: "Rani", lastName: "Patel", gender: "Female" },
  { firstName: "Rohan", middleName: "Dev", lastName: "Mehta", gender: "Male" },
  { firstName: "Sneha", middleName: "Priya", lastName: "Joshi", gender: "Female" },
  { firstName: "Kabir", middleName: "Raj", lastName: "Verma", gender: "Male" },
  { firstName: "Ananya", middleName: "Sita", lastName: "Kulkarni", gender: "Female" },
  { firstName: "Vikram", middleName: "Arun", lastName: "Deshmukh", gender: "Male" },
  { firstName: "Pooja", middleName: "Lata", lastName: "Nair", gender: "Female" },
  { firstName: "Aditya", middleName: "Ravi", lastName: "Chopra", gender: "Male" },
  { firstName: "Meera", middleName: "Gita", lastName: "Rao", gender: "Female" },

  // European-style names
  { firstName: "Lukas", middleName: "Johann", lastName: "Müller", gender: "Male" },
  { firstName: "Sofia", middleName: "Maria", lastName: "Rossi", gender: "Female" },
  { firstName: "Mateo", middleName: "Carlos", lastName: "Garcia", gender: "Male" },
  { firstName: "Elena", middleName: "Isabel", lastName: "Fernandez", gender: "Female" },
  { firstName: "Niklas", middleName: "Peter", lastName: "Schmidt", gender: "Male" },
  { firstName: "Anna", middleName: "Klara", lastName: "Weber", gender: "Female" },
  { firstName: "Hugo", middleName: "Louis", lastName: "Dupont", gender: "Male" },
  { firstName: "Camille", middleName: "Claire", lastName: "Moreau", gender: "Female" },
  { firstName: "Jakub", middleName: "Tomasz", lastName: "Nowak", gender: "Male" },
  { firstName: "Zuzanna", middleName: "Ewa", lastName: "Kowalska", gender: "Female" },

  // More Indian names
  { firstName: "Siddharth", middleName: "Hari", lastName: "Bhat", gender: "Male" },
  { firstName: "Kavya", middleName: "Uma", lastName: "Menon", gender: "Female" },
  { firstName: "Nikhil", middleName: "Jay", lastName: "Singh", gender: "Male" },
  { firstName: "Ritika", middleName: "Leela", lastName: "Kapoor", gender: "Female" },
  { firstName: "Arjun", middleName: "Mohan", lastName: "Gupta", gender: "Male" },
  { firstName: "Divya", middleName: "Radha", lastName: "Iyer", gender: "Female" },
  { firstName: "Manish", middleName: "Suresh", lastName: "Yadav", gender: "Male" },
  { firstName: "Priya", middleName: "Shanti", lastName: "Reddy", gender: "Female" },
  { firstName: "Karan", middleName: "Om", lastName: "Malhotra", gender: "Male" },
  { firstName: "Neha", middleName: "Savita", lastName: "Bose", gender: "Female" },

  // More European names
  { firstName: "Oliver", middleName: "James", lastName: "Smith", gender: "Male" },
  { firstName: "Emily", middleName: "Grace", lastName: "Johnson", gender: "Female" },
  { firstName: "Daniel", middleName: "Michael", lastName: "Brown", gender: "Male" },
  { firstName: "Chloe", middleName: "Rose", lastName: "Taylor", gender: "Female" },
  { firstName: "Sebastian", middleName: "Andreas", lastName: "Fischer", gender: "Male" },
  { firstName: "Amelia", middleName: "Charlotte", lastName: "Wilson", gender: "Female" },
  { firstName: "Leon", middleName: "Markus", lastName: "Becker", gender: "Male" },
  { firstName: "Eva", middleName: "Sophie", lastName: "Hoffmann", gender: "Female" },
  { firstName: "David", middleName: "George", lastName: "Martinez", gender: "Male" },
  { firstName: "Laura", middleName: "Cristina", lastName: "Lopez", gender: "Female" },

  // Final mix
  { firstName: "Varun", middleName: "Tej", lastName: "Pillai", gender: "Male" },
  { firstName: "Aditi", middleName: "Nisha", lastName: "Das", gender: "Female" },
  { firstName: "Harsh", middleName: "Deep", lastName: "Bhatt", gender: "Male" },
  { firstName: "Tanvi", middleName: "Rekha", lastName: "Mukherjee", gender: "Female" },
  { firstName: "Yash", middleName: "Anil", lastName: "Saxena", gender: "Male" },
  { firstName: "Rhea", middleName: "Sunita", lastName: "Ghosh", gender: "Female" },
  { firstName: "Hugo", middleName: "Jean", lastName: "Bernard", gender: "Male" },
  { firstName: "Clara", middleName: "Louise", lastName: "Dubois", gender: "Female" },
  { firstName: "Marco", middleName: "Antonio", lastName: "Silva", gender: "Male" },
  { firstName: "Isabella", middleName: "Francesca", lastName: "Ricci", gender: "Female" },
];


const CITY = [
    'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Ranchi', 'Guwahati', 'Chandigarh', 'Noida',
    'Gurgaon', 'Thane', 'Navi mumbai', 'Vasai', 'Varanasi', 'Allahabad', 'Coimbatore', 'Madurai', 'Trivandrum', 'Kochi',
    'Vijayawada', 'Visakhapatnam', 'Mysore', 'Udaipur', 'Jodhpur', 'Raipur', 'Bhubaneswar', 'Cuttack', 'Siliguri', 'Agra',
    'Meerut', 'Moradabad', 'Saharanpur', 'Jamshedpur', 'Dhanbad', 'Dehradun', 'Shimla', 'Manali', 'Srinagar', 'Amritsar'
];

const STATE = [
    'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil nadu', 'Kerala', 'Andhra pradesh', 'Telangana', 'West bengal', 'Uttar pradesh', 'Madhya pradesh',
    'Bihar', 'Jharkhand', 'Assam', 'Punjab', 'Haryana', 'Himachal pradesh', 'Uttarakhand', 'Rajasthan', 'Odisha', 'Chhattisgarh',
    'Goa', 'Delhi', 'Tripura', 'Meghalaya', 'Manipur', 'Mizoram', 'Nagaland', 'Arunachal pradesh', 'Sikkim', 'Ladakh',
    'Jammu & kashmir', 'Andaman & nicobar', 'Lakshadweep', 'Puducherry', 'Chandigarh', 'Dadra & nagar haveli', 'Daman & diu', 'Mahe', 'Yanam', 'Karaikal',
    'Salem', 'Kanchipuram', 'Satara', 'Sangli', 'Solapur', 'Nashik', 'Aurangabad', 'Latur', 'Beed', 'Dhule'
];

const REGISTERED_EMAIL = [
    'qaenvkirantest234@gmail.com',
]

const UNREGISTERED_EMAIL = [
    'notfound@example.com',
]

export class BasicInfo {

    readonly firstName: string;
    readonly middleName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly city: string;
    readonly state: string;
   // readonly email: string;
    readonly registeredEmail: string;
    readonly unregisteredEmail: string;

    constructor() {
        const userDetails = RandomUtils.randomArray(USERS)
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.middleName = userDetails.middleName;
        this.gender = userDetails.gender;
        this.city = BasicInfo.randomArray(CITY);
        this.state = BasicInfo.randomArray(STATE);
       // this.email = RandomUtils.generateUniqueEmail(name);
        this.registeredEmail = BasicInfo.randomArray(REGISTERED_EMAIL);
        this.unregisteredEmail = BasicInfo.randomArray(UNREGISTERED_EMAIL)
    }

    private static randomArray<T>(arr: T[]): T {
        return arr[Math.floor(Math.random() * arr.length)]!;
    }

    async email(name: string){
        return RandomUtils.generateUniqueEmail(name);
    }

}
