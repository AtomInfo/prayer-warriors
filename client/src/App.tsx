import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import AllEvents from "@/pages/AllEvents";
import AllSermons from "@/pages/AllSermons";
import EventDetail from "@/pages/EventDetail";
import SermonDetail from "@/pages/SermonDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/events" component={AllEvents} />
        <Route path="/events/:id" component={EventDetail} />
        <Route path="/sermons" component={AllSermons} />
        <Route path="/sermons/:id" component={SermonDetail} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
