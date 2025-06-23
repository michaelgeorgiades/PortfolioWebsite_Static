import { 
  users, 
  contactMessages, 
  photos, 
  orders,
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type Photo,
  type InsertPhoto,
  type Order,
  type InsertOrder
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  getPhotos(): Promise<Photo[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private photos: Map<number, Photo>;
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentMessageId: number;
  private currentPhotoId: number;
  private currentOrderId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.photos = new Map();
    this.orders = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
    this.currentPhotoId = 1;
    this.currentOrderId = 1;
    
    // Initialize with sample photos
    this.initializePhotos();
  }

  private initializePhotos() {
    const samplePhotos: InsertPhoto[] = [
      {
        title: "Mountain Vista",
        description: "A stunning mountain landscape at golden hour with dramatic clouds",
        price: "25.00",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "Mountain landscape at golden hour"
      },
      {
        title: "Urban Nights",
        description: "Modern city skyline at night with illuminated skyscrapers",
        price: "30.00",
        imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "City skyline at night"
      },
      {
        title: "Forest Path",
        description: "Serene forest path with dappled sunlight filtering through trees",
        price: "22.00",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "Forest path with sunlight"
      },
      {
        title: "Geometric",
        description: "Abstract architectural detail with geometric patterns and shadows",
        price: "28.00",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "Abstract architectural patterns"
      },
      {
        title: "Eagle Flight",
        description: "Majestic eagle soaring against a dramatic sky",
        price: "35.00",
        imageUrl: "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "Eagle in flight against dramatic sky"
      },
      {
        title: "Ocean Waves",
        description: "Dramatic ocean waves crashing against rocky coastline at sunset",
        price: "27.00",
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        altText: "Ocean waves at sunset"
      }
    ];

    samplePhotos.forEach(photo => {
      this.createPhoto(photo);
    });
  }

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

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getPhotos(): Promise<Photo[]> {
    return Array.from(this.photos.values());
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    return this.photos.get(id);
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const id = this.currentPhotoId++;
    const photo: Photo = { 
      ...insertPhoto, 
      id,
      description: insertPhoto.description ?? null
    };
    this.photos.set(id, photo);
    return photo;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: new Date(),
      status: insertOrder.status ?? "pending",
      currency: insertOrder.currency ?? "USD"
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
