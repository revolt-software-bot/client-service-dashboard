
import { format, parseISO } from "date-fns";
import { Subscription } from "@/data/subscriptions";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarCheck, CalendarX, ClockAlert } from "lucide-react";

interface SubscriptionCardProps {
  subscription: Subscription;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-status-active";
      case "upcoming":
        return "bg-status-upcoming";
      case "expired":
        return "bg-status-expired";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = (subscription: Subscription) => {
    const { status, daysRemaining } = subscription;
    
    switch (status) {
      case "active":
        return (
          <Badge className="bg-status-active hover:bg-status-active">
            <CalendarCheck className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-status-upcoming hover:bg-status-upcoming">
            <ClockAlert className="h-3 w-3 mr-1" />
            Renew in {daysRemaining} days
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-status-expired hover:bg-status-expired">
            <CalendarX className="h-3 w-3 mr-1" />
            Expired {Math.abs(daysRemaining || 0)} days ago
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Calculate progress for active subscriptions
  const calculateProgress = (subscription: Subscription) => {
    if (subscription.status === "expired") return 100;
    
    const start = parseISO(subscription.startDate).getTime();
    const end = parseISO(subscription.endDate).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
    
    const progress = Math.floor((elapsed / total) * 100);
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{subscription.name}</CardTitle>
          {getStatusBadge(subscription)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4">
          {subscription.description}
        </p>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Start: {format(parseISO(subscription.startDate), "MMM d, yyyy")}</span>
            <span>End: {format(parseISO(subscription.endDate), "MMM d, yyyy")}</span>
          </div>
          <Progress 
            value={calculateProgress(subscription)} 
            className={`h-2 ${getStatusColor(subscription.status)}`}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            ${subscription.price.toFixed(2)}/period
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
