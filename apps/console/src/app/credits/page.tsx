import { CreditOverview } from "@/components/credit-overview";
import { CreditLedger } from "@/components/credit-ledger";

export const metadata = { title: "Credits — SuperCloud Console" };

export default function CreditsPage() {
  return (
    <>
      <CreditOverview />
      <CreditLedger />
    </>
  );
}
