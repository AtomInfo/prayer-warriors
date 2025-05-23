import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertEventSchema, insertSermonSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all events
  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Get event by ID
  app.get("/api/events/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });
  
  // Create event
  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(validatedData);
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  // Get all sermons
  app.get("/api/sermons", async (req, res) => {
    try {
      const sermons = await storage.getAllSermons();
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sermons" });
    }
  });

  // Get sermon by ID
  app.get("/api/sermons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sermon = await storage.getSermon(id);
      
      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }
      
      res.json(sermon);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });
  
  // Create sermon
  app.post("/api/sermons", async (req, res) => {
    try {
      const validatedData = insertSermonSchema.parse(req.body);
      const newSermon = await storage.createSermon(validatedData);
      res.status(201).json(newSermon);
    } catch (error) {
      res.status(400).json({ message: "Invalid sermon data" });
    }
  });

  // Get all services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get services by type
  app.get("/api/services/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const services = await storage.getServicesByType(type);
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
