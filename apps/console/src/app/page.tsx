import { CreditOverview } from "@/components/credit-overview";
import { UsageCharts } from "@/components/usage-charts";
import { ResourceGrid } from "@/components/resource-grid";
import { CreditLedger } from "@/components/credit-ledger";

export default function DashboardPage() {
  return (
    <>
      <CreditOverview />
      <UsageCharts />
      <ResourceGrid />
      <CreditLedger />
    </>
  );
}
