import Quiz from '@/models/Quiz';
import connect from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest):Promise<Response | undefined> {
    await connect();
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("id");
    try {
       const quiz = await Quiz.findOne({_id: query});
       return NextResponse.json({ quiz }, { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error while adding new quiz: " + error.message, {status: 404});
    }
}