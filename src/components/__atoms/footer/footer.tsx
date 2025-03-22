import React from "react";
import LanguageSelector from "../language_list/Language";

const Footer = () => {
  return (
    <footer className=" text-gray-400 text-sm  flex flex-col items-center space-y-2 py-6 px-4 ">
      <div className="flex flex-wrap justify-center space-x-4">
        <a
          href="https://about.meta.com/"
          className="hover:underline"
          target="_blank"
        >
          Meta
        </a>
        <a
          href="https://about.instagram.com/"
          className="hover:underline"
          target="_blank"
        >
          About
        </a>
        <a
          href="https://about.instagram.com/blog"
          className="hover:underline"
          target="_blank"
        >
          Blog
        </a>
        <a
          href="https://about.instagram.com/about-us/careers"
          className="hover:underline"
          target="_blank"
        >
          Jobs
        </a>
        <a
          href="https://help.instagram.com"
          target="_blank"
          className="hover:underline"
        >
          Help
        </a>
        <a
          href="https://developers.facebook.com/docs/instagram-platform"
          className="hover:underline"
          target="_blank"
        >
          API
        </a>
        <a
          href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect"
          className="hover:underline"
          target="_blank"
        >
          Privacy
        </a>
        <a
          href="https://help.instagram.com/581066165581870/"
          className="hover:underline"
          target="_blank"
        >
          Terms
        </a>
        <a
          href="https://www.instagram.com/explore/locations/"
          className="hover:underline"
          target="_blank"
        >
          Locations
        </a>
        <a
          href="https://www.instagram.com/web/lite/"
          className="hover:underline"
          target="_blank"
        >
          Instagram Lite
        </a>
        <a
          href="https://www.threads.net"
          className="hover:underline"
          target="_blank"
        >
          Threads
        </a>
        <a
          href="https://www.facebook.com/help/instagram/261704639352628"
          className="hover:underline"
          target="_blank"
        >
          Contact Uploading & Non-Users
        </a>
        <a href="/" className="hover:underline">
          Meta Verified
        </a>
      </div>
      <div className="flex space-x-2">
        <LanguageSelector />
        <span>© 2025 Instagram from Meta</span>
      </div>
    </footer>
  );
};

export default Footer;
