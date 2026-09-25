import { getPackageBySlug, getPackages } from "@/lib/wp";
import SinglePackageClient from "./SinglePackageClient";
import { notFound } from "next/navigation";

// Always render fresh from WordPress API
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const pkg = await getPackageBySlug(resolvedParams.slug);

  if (!pkg) {
    return {
      title: "Package Not Found | KL MAQAN",
    };
  }

  const title = pkg.title?.rendered || "Package";
  return {
    title: `${title} Investment Package | KL MAQAN Dubai`,
    description: `Complete breakdown and VIP inclusions of the ${title} real estate package in Dubai.`,
  };
}

export default async function SinglePackagePage({ params }) {
  const resolvedParams = await params;
  const pkg = await getPackageBySlug(resolvedParams.slug);

  if (!pkg) {
    notFound();
  }

  return <SinglePackageClient packageItem={pkg} />;
}
