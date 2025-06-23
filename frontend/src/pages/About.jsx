import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterbox from "../components/NewsLetterbox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Forever, we believe that style should be timeless, effortless,
            and accessible to everyone. Founded with a passion for quality and a
            love for modern design, we offer a curated selection of fashion,
            lifestyle, and everyday essentials that elevate your routine without
            compromising comfort or affordability.
          </p>
          <p>
            Since our inception, Forever has been committed to redefining
            everyday shopping by blending style, quality, and affordability into
            one seamless experience.
          </p>
          <p>
            Whether you’re looking for wardrobe staples, statement pieces, or
            thoughtful gifts, Forever is your go-to destination for all things
            chic. We’re more than a store — we’re a community that celebrates
            confidence, creativity, and individuality. Join us on a journey of
            style that lasts... forever.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Forever, our mission is to empower individuals to express
            themselves through timeless, affordable, and high-quality products.
            We strive to create a seamless and inspiring shopping experience
            that celebrates personal style, encourages confidence, and delivers
            value—every step of the way.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>High Qualiity Products:</b>
          <p className="text-gray-600">
            Every product at Forever goes through a rigorous quality check to
            ensure it meets our high standards—because you deserve nothing less
            than the best.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>User Convenience:</b>
          <p className="text-gray-600">
            From easy navigation to fast, reliable delivery—Forever is designed
            to make your shopping experience as smooth and stress-free as
            possible.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At Forever, our customer support team is always here to
            help—friendly, responsive, and dedicated to making your experience
            seamless from start to finish.
          </p>
        </div>
      </div>
      <NewsLetterbox />
    </div>
  );
};

export default About;
