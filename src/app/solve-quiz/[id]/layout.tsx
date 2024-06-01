import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SolveQuiz({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}
