import Navbar from "../../components/Navbar/NavBar";
import Hero from "../../components/Hero/Hero";
import Info from "../../components/Info/Info";
import Donation from "../../components/Donation/Donation";
import Uploads from "../../components/Uploads/Uploads";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <>
      <Navbar user={user} isLoadingUser={loading} onLogout={logout} />
      <Hero />
      <Info/>
      <Donation/>
      <Uploads/>
      <DashboardCard/>
      <Footer/>
    </>
  );
}