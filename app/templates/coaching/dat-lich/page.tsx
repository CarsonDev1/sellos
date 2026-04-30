import CoachNavbar from "@/components/templates/coaching/CoachNavbar";
import CoachFooter from "@/components/templates/coaching/CoachFooter";
import BookingPage from "@/components/templates/coaching/BookingPage";

export const metadata = {
  title: "Đặt Lịch Tư Vấn — KHOAcoach",
  description: "Đặt Discovery Call miễn phí 30 phút với Business Coach Nguyễn Trọng Khoa.",
};

export default function DatLichPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <CoachNavbar />
      <BookingPage />
      <CoachFooter />
    </main>
  );
}
