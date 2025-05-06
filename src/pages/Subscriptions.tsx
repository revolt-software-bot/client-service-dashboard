
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { processedSubscriptions, activeSubscriptions, upcomingSubscriptions, expiredSubscriptions } from "@/data/subscriptions";
import SubscriptionCard from "@/components/SubscriptionCard";
import { CalendarCheck, CalendarX, ClockAlert, Package, Search } from "lucide-react";

const Subscriptions = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [activeTab, setActiveTab] = useState("all");

  // Filter subscriptions based on search
  const filterSubscriptions = (subs: any[]) => {
    return subs.filter(
      sub => sub.name.toLowerCase().includes(search.toLowerCase()) || 
             sub.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Sort subscriptions
  const sortSubscriptions = (subs: any[]) => {
    return [...subs].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "date") {
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      } else if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });
  };

  // Get filtered and sorted subscriptions
  const getFilteredAndSortedSubscriptions = (subs: any[]) => {
    const filtered = filterSubscriptions(subs);
    return sortSubscriptions(filtered);
  };

  const filteredAll = getFilteredAndSortedSubscriptions(processedSubscriptions);
  const filteredActive = getFilteredAndSortedSubscriptions(activeSubscriptions);
  const filteredUpcoming = getFilteredAndSortedSubscriptions(upcomingSubscriptions);
  const filteredExpired = getFilteredAndSortedSubscriptions(expiredSubscriptions);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage and view all your service subscriptions.
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Services & Subscriptions</CardTitle>
          <CardDescription>
            View and manage all your service subscriptions in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscriptions..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="date">Sort by End Date</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                All ({filteredAll.length})
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                Active ({filteredActive.length})
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <ClockAlert className="h-4 w-4" />
                Upcoming ({filteredUpcoming.length})
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center gap-2">
                <CalendarX className="h-4 w-4" />
                Expired ({filteredExpired.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredAll.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAll.map(subscription => (
                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No subscriptions found matching your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="active" className="space-y-4">
              {filteredActive.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredActive.map(subscription => (
                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No active subscriptions found matching your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-4">
              {filteredUpcoming.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredUpcoming.map(subscription => (
                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No upcoming renewals found matching your search.</p>
              )}
            </TabsContent>
            
            <TabsContent value="expired" className="space-y-4">
              {filteredExpired.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredExpired.map(subscription => (
                    <SubscriptionCard key={subscription.id} subscription={subscription} />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">No expired subscriptions found matching your search.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Subscriptions;
