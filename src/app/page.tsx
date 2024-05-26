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
      <Navbar homepage />
      <div className="mx-auto bg-primary-bg max-w-[1500px]">
        <HomepageHeader />
        <div className="ml-4 mr-4 xs:mr-10 sm:mr-0 xs:ml-10 mt-20">
          <CauroselSection />
          <InnovativeIdeas />
        </div>
        <StayUpdated />
        <ShareIdeas />
      </div>
      <Footer />
    </div>
  );
}
