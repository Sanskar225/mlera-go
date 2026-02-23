import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PageLayout({ children }) {
  return (
    <main className="relative overflow-x-hidden min-h-screen">
      <Navbar />
      <div className="pt-[72px]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
