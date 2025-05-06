
import { addDays, subDays, format } from "date-fns";

export type SubscriptionStatus = "active" | "upcoming" | "expired";

export interface Subscription {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  status: SubscriptionStatus;
  daysRemaining?: number;
}

const today = new Date();

export const subscriptions: Subscription[] = [
  {
    id: "sub-1",
    name: "Website Maintenance - Basic",
    description: "Monthly website maintenance including updates, backups, and security checks",
    startDate: format(subDays(today, 180), "yyyy-MM-dd"),
    endDate: format(addDays(today, 185), "yyyy-MM-dd"),
    price: 49.99,
    status: "active",
  },
  {
    id: "sub-2",
    name: "Website Maintenance - Premium",
    description: "Premium website maintenance with priority support and performance optimization",
    startDate: format(subDays(today, 90), "yyyy-MM-dd"),
    endDate: format(addDays(today, 15), "yyyy-MM-dd"),
    price: 99.99,
    status: "upcoming",
  },
  {
    id: "sub-3", 
    name: "Mobile App Support",
    description: "Technical support and updates for mobile applications",
    startDate: format(subDays(today, 365), "yyyy-MM-dd"),
    endDate: format(subDays(today, 5), "yyyy-MM-dd"),
    price: 149.99,
    status: "expired",
  },
  {
    id: "sub-4",
    name: "E-commerce Platform License",
    description: "Yearly license for e-commerce platform with all features",
    startDate: format(subDays(today, 30), "yyyy-MM-dd"),
    endDate: format(addDays(today, 335), "yyyy-MM-dd"),
    price: 299.99,
    status: "active",
  },
  {
    id: "sub-5",
    name: "SEO Services",
    description: "Monthly search engine optimization services",
    startDate: format(subDays(today, 25), "yyyy-MM-dd"),
    endDate: format(addDays(today, 5), "yyyy-MM-dd"),
    price: 199.99,
    status: "upcoming",
  },
  {
    id: "sub-6",
    name: "Email Marketing Tool",
    description: "Access to premium email marketing software",
    startDate: format(subDays(today, 180), "yyyy-MM-dd"),
    endDate: format(subDays(today, 15), "yyyy-MM-dd"),
    price: 79.99,
    status: "expired",
  },
  {
    id: "sub-7",
    name: "Cloud Storage - 1TB",
    description: "1TB of cloud storage for website assets and backups",
    startDate: format(subDays(today, 45), "yyyy-MM-dd"),
    endDate: format(addDays(today, 320), "yyyy-MM-dd"),
    price: 59.99,
    status: "active",
  }
];

// Helper function to calculate days remaining
export const calculateDaysRemaining = (subscription: Subscription): Subscription => {
  const endDate = new Date(subscription.endDate);
  const today = new Date();
  const differenceInTime = endDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  
  return {
    ...subscription,
    daysRemaining: differenceInDays
  };
};

// Process subscriptions and add daysRemaining
export const processedSubscriptions = subscriptions.map(calculateDaysRemaining);

// Separate subscriptions by status
export const getSubscriptionsByStatus = (status: SubscriptionStatus) => {
  return processedSubscriptions.filter(sub => sub.status === status);
};

export const activeSubscriptions = getSubscriptionsByStatus("active");
export const upcomingSubscriptions = getSubscriptionsByStatus("upcoming");
export const expiredSubscriptions = getSubscriptionsByStatus("expired");
