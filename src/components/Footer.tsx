import "@/styles/globals.css";
import Link from "next/link";
import Button from "./ui/Button";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="logo"><h2>Qwzzle.io</h2></div>
          
        <div className="credentials">
          <h5>created by Hudyfa | github link</h5>
        </div>
          
          <div className="go-up">
            <Button color="white" bgColor="black" title="Go Up" />
          </div>
        </div>
      </div>
    </>
  );
}
