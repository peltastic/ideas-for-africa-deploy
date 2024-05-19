import Footer from "@/components/Footer/Footer";
import HomepageHeader from "@/components/Header/HomepageHeader";
import CauroselSection from "@/components/Homepage/CauroselSection";
import InnovativeIdeas from "@/components/Homepage/InnovativeIdeas";
import ShareIdeas from "@/components/Homepage/ShareIdeas";
import StayUpdated from "@/components/Homepage/StayUpdated";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HomepageHeader />
      <div className="ml-10 mt-20">
        <CauroselSection />
        <InnovativeIdeas />
      </div>
      <StayUpdated />
      <ShareIdeas />
      <Footer />
    </div>
  );
}
