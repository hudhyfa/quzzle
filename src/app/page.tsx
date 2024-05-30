import Image from "next/image";
import styles from "./page.module.css";
import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <Footer />
    </div>
  );
}
