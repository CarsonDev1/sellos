import { Suspense } from "react";
import TaoWebClient from "./TaoWebClient";

export const metadata = { title: "Đang tạo website — SellOS" };

export default function TaoWebPage() {
  return (
    <Suspense fallback={null}>
      <TaoWebClient />
    </Suspense>
  );
}
