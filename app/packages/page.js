import { getPackages } from "@/lib/wp";
import PackagesClient from "./PackagesClient";

// Always fetch fresh from WordPress — no static/ISR caching
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Investment & VIP Packages | KL MAQAN Dubai",
  description: "Explore exclusive Ultra and Elite investment packages for Dubai luxury real estate, off-plan allocations, and UAE Golden Visa concierge.",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <PackagesClient packages={packages} />
  );
}
