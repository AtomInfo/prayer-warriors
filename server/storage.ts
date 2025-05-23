import { 
  User, InsertUser, 
  Event, InsertEvent, 
  Sermon, InsertSermon, 
  Service, InsertService, 
  Testimonial, InsertTestimonial, 
  ContactMessage, InsertContactMessage 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Events
  getAllEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  // Sermons
  getAllSermons(): Promise<Sermon[]>;
  getSermon(id: number): Promise<Sermon | undefined>;
  createSermon(sermon: InsertSermon): Promise<Sermon>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  getServicesByType(type: string): Promise<Service[]>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private events: Map<number, Event>;
  private sermons: Map<number, Sermon>;
  private services: Map<number, Service>;
  private testimonials: Map<number, Testimonial>;
  private contactMessages: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentEventId: number;
  private currentSermonId: number;
  private currentServiceId: number;
  private currentTestimonialId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.events = new Map();
    this.sermons = new Map();
    this.services = new Map();
    this.testimonials = new Map();
    this.contactMessages = new Map();
    
    this.currentUserId = 1;
    this.currentEventId = 1;
    this.currentSermonId = 1;
    this.currentServiceId = 1;
    this.currentTestimonialId = 1;
    this.currentContactMessageId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize services
    const sundayServices: InsertService[] = [
      {
        name: "Morning Worship",
        day: "Sunday",
        startTime: "9:00 AM",
        endTime: "10:30 AM",
        type: "Sunday",
        description: "Traditional morning worship service"
      },
      {
        name: "Family Service",
        day: "Sunday",
        startTime: "11:00 AM",
        endTime: "12:30 PM",
        type: "Sunday",
        description: "Family-friendly worship service"
      },
      {
        name: "Evening Worship",
        day: "Sunday",
        startTime: "6:00 PM",
        endTime: "7:30 PM",
        type: "Sunday",
        description: "Evening worship service"
      }
    ];

    const weekdayServices: InsertService[] = [
      {
        name: "Bible Study",
        day: "Wednesday",
        startTime: "7:00 PM",
        endTime: "8:30 PM",
        type: "Weekday",
        description: "Midweek Bible study for all ages"
      },
      {
        name: "Prayer Meeting",
        day: "Tuesday",
        startTime: "6:30 PM",
        endTime: "7:30 PM",
        type: "Weekday",
        description: "Community prayer meeting"
      },
      {
        name: "Choir Practice",
        day: "Thursday",
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        type: "Weekday",
        description: "Choir rehearsal for Sunday services"
      }
    ];

    // Add services
    [...sundayServices, ...weekdayServices].forEach(service => {
      this.createService(service);
    });

    // Initialize events
    const events: InsertEvent[] = [
      {
        title: "Community Outreach Day",
        description: "Join us as we serve our local community through various projects and activities.",
        date: new Date("2023-06-15T09:00:00"),
        startTime: "9:00 AM",
        endTime: "2:00 PM",
        location: "Church Grounds & Local Park",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18"
      },
      {
        title: "Vacation Bible School",
        description: "A week-long program for children ages 5-12 with games, crafts, and Bible lessons.",
        date: new Date("2023-06-22T09:00:00"),
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        location: "Church Education Wing",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18"
      },
      {
        title: "Summer Concert Series",
        description: "An evening of worship music featuring our church choir and special guests.",
        date: new Date("2023-06-30T19:00:00"),
        startTime: "7:00 PM",
        endTime: "9:00 PM",
        location: "Church Sanctuary",
        imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18"
      }
    ];

    // Add events
    events.forEach(event => {
      this.createEvent(event);
    });

    // Initialize sermons
    const sermons: InsertSermon[] = [
      {
        title: "Walking in Faith",
        description: "Exploring how we can strengthen our faith journey through daily practices and trust in God's plan.",
        speaker: "Pastor Michael Johnson",
        date: new Date("2023-06-11"),
        audioUrl: "https://example.com/sermons/walking-in-faith.mp3",
        imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579"
      },
      {
        title: "The Power of Prayer",
        description: "Discovering how consistent prayer can transform our lives and deepen our relationship with God.",
        speaker: "Pastor Sarah Williams",
        date: new Date("2023-06-04"),
        audioUrl: "https://example.com/sermons/power-of-prayer.mp3",
        imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2"
      },
      {
        title: "Communion: Remembering Christ",
        description: "Understanding the deeper significance of communion and how it connects us to Christ's sacrifice.",
        speaker: "Pastor Michael Johnson",
        date: new Date("2023-05-28"),
        audioUrl: "https://example.com/sermons/communion-remembering-christ.mp3",
        imageUrl: "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382"
      }
    ];

    // Add sermons
    sermons.forEach(sermon => {
      this.createSermon(sermon);
    });

    // Initialize testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Jennifer Davis",
        memberSince: "2015",
        quote: "Prayer Warriors has been like a second family to me. The support and love I've received here has been transformative in my faith journey.",
        initials: "JD"
      },
      {
        name: "Robert Martinez",
        memberSince: "2018",
        quote: "The youth programs here have been incredible for my teenagers. They've found a community that supports their growth both spiritually and personally.",
        initials: "RM"
      },
      {
        name: "Amanda Thompson",
        memberSince: "2020",
        quote: "After moving to the area, I was looking for a church that felt like home. From my first Sunday at Prayer Warriors, I knew I had found that place.",
        initials: "AT"
      }
    ];

    // Add testimonials
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  // Sermons
  async getAllSermons(): Promise<Sermon[]> {
    return Array.from(this.sermons.values());
  }

  async getSermon(id: number): Promise<Sermon | undefined> {
    return this.sermons.get(id);
  }

  async createSermon(insertSermon: InsertSermon): Promise<Sermon> {
    const id = this.currentSermonId++;
    const sermon: Sermon = { ...insertSermon, id };
    this.sermons.set(id, sermon);
    return sermon;
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async getServicesByType(type: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(
      (service) => service.type === type
    );
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Contact Messages
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
