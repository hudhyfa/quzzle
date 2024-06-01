import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function QuizFeedLayout({
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
