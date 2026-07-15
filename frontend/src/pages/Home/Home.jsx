import Navbar from "../../components/Navbar/NavBar";
import Hero from "../../components/Hero/Hero";
import Info from "../../components/Info/Info";
import Donation from "../../components/Donation/Donation";
import Uploads from "../../components/Uploads/Uploads";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Footer from "../../components/Footer/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Info/>
      <Donation/>
      <Uploads/>
      <DashboardCard/>
      <Footer/>
    </>
  );
}