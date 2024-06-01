import Quiz from '@/models/Quiz';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request):Promise<Response | undefined> {
    await connect();
    try {
       const quizes = await Quiz.find();
       return NextResponse.json({ quizes }, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error while adding new quiz: " + error.message, {status: 404});
    }

}