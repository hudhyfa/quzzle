import Quiz from '@/models/Quiz';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request):Promise<Response | undefined> {
    await connect();
    const {title, author, tnqs, qna} = await request.json();
    const newQuiz = new Quiz({
        title: title,
        author: author,
        totalNumberOfQuestions: tnqs,
        qna: qna
    })
    try {
       await newQuiz.save();
       return new NextResponse("New quiz added successfully", {status: 200}); 
    } catch (error: any) {
        return new NextResponse("Error while adding new quiz: " + error.message, {status: 404});
    }

}