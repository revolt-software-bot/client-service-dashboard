
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { processedSubscriptions, activeSubscriptions, upcomingSubscriptions, expiredSubscriptions } from "@/data/subscriptions";
import SubscriptionCard from "@/components/SubscriptionCard";
import { CalendarCheck, CalendarX, ClockAlert, Package } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your subscriptions and services.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <CalendarCheck className="h-5 w-5 text-status-active" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              Services currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Renewals</CardTitle>
            <ClockAlert className="h-5 w-5 text-status-upcoming" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              Due in the next 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Expired Services</CardTitle>
            <CalendarX className="h-5 w-5 text-status-expired" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiredSubscriptions.length}</div>
            <p className="text-xs text-muted-foreground">
              Renewal required
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscriptions Overview</CardTitle>
          <CardDescription>
            Manage and monitor your service subscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                All ({processedSubscriptions.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                Active ({activeSubscriptions.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <ClockAlert className="h-4 w-4" />
                Upcoming ({upcomingSubscriptions.length})
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center gap-2">
                <CalendarX className="h-4 w-4" />
                Expired ({expiredSubscriptions.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {processedSubscriptions.map(subscription => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeSubscriptions.map(subscription => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingSubscriptions.map(subscription => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="expired" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {expiredSubscriptions.map(subscription => (
                  <SubscriptionCard key={subscription.id} subscription={subscription} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Dashboard;
