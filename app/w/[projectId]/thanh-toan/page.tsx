import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <CheckoutClient projectId={projectId} />;
}
