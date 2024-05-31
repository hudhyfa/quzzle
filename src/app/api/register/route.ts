import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await connect();
    const {username, email, password} = await request.json();
    const existingUser = await User.findOne({email: email});
    if(existingUser) {
        return new NextResponse("Email is already in use", {status: 400});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })
    try {
        await newUser.save();
        return new NextResponse("user is registered", {status: 200});
    } catch (error: any) {
        return new NextResponse("Error: " + error.message, {status: 404});
    }
}