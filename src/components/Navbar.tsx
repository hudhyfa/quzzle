import '@/styles/globals.css';
import Button from './ui/Button';
import Link from 'next/link';

export default function Navbar() {
    return (
        <>
            <div className="navbar">
                <div className="logo">
                    <h2>Qwzzle.io</h2>
                </div>
                <div className="nav-menu">
                    <Link href={'/login'}>
                        <Button color='white' bgColor='black' title="Login"/>
                    </Link>
                </div>
            </div>
        </>
    )
}