import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function QuizFeed() {
    const session = await getServerSession();
    if(!session) {
        redirect('/login');
    }
    return <h3>Quizfeed</h3>
}