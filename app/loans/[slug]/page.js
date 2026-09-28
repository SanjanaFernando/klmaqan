import { getLoanBySlug } from "@/lib/graphql";
import SingleLoanClient from "./SingleLoanClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const loan = await getLoanBySlug(resolvedParams.slug);

  if (!loan) {
    return {
      title: "Loan Option Not Found | KL MAQAN",
    };
  }

  const title = loan.title?.rendered || loan.rawTitle || "Loan Program";
  const rate = loan.acf?.interest_rate || loan.loanDetails?.interestRate || "";

  return {
    title: `${title} Mortgage & Financing (${rate}) | KL MAQAN Dubai`,
    description: `Complete terms, interest rate (${rate}), eligibility criteria, and repayment details for the ${title} financing structure.`,
  };
}

export default async function SingleLoanPage({ params }) {
  const resolvedParams = await params;
  const loan = await getLoanBySlug(resolvedParams.slug);

  if (!loan) {
    notFound();
  }

  return <SingleLoanClient loan={loan} />;
}
