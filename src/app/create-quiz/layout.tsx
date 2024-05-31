import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

export default function CreateQuizLayout({children}:{children:React.ReactNode}) {
    return(
        <>
            <Navbar />
            <ToastContainer />
            {children}
            <Footer />
        </>
    )
}