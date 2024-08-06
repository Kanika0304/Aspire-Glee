import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Clothing Donation</a>
          <a className="link link-hover">Education Funding</a>
          <a className="link link-hover">Volunteer</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
