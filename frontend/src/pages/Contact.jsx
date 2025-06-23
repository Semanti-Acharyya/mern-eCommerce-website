import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterbox from "../components/NewsLetterbox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6">
          <p className="font-semibold text-xl text-gray-800">Our Store</p>
          <p className="text-gray-500">
            54079, Williams Street, Suite 350, Blue City, Tacoma, Washington,
            USA
          </p>
          <p className="font-medium text-gray-600">Tel: (415) 555-1302</p>
          <p className="font-medium text-gray-600">Email: admin@forever.com</p>
          <p className="font-medium text-gray-600">
            Hours: Mon-Fri 9AM - 6PM EST
          </p>
          <p className="font-semibold text-xl text-gray-800">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our career opportunities and how you can join our
            teams at Forever.
          </p>
          <button className="w-fit border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterbox />
    </div>
  );
};

export default Contact;
