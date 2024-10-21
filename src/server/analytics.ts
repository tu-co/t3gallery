import { env } from "@/env";
import { PostHog } from "posthog-node";

function ServerSideAnalytics() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}

const analyticsServerClient = ServerSideAnalytics();

export default analyticsServerClient;
