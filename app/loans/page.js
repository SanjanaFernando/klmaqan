import { getLoans } from "@/lib/graphql";
import LoansClient from "./LoansClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mortgage & Property Financing | KL MAQAN Dubai",
  description: "Explore competitive Dubai real estate loans, off-plan financing, and bespoke private wealth mortgages with preferred rates.",
};

export default async function LoansPage() {
  const loans = await getLoans();

  return <LoansClient loans={loans} />;
}
