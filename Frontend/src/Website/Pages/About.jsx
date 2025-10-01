import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const About = () => {
  return (
  <>
      {/* Breadcrumb */}
      <div className="bg-gray-200 text-black mt-2 flex justify-between items-center p-3 px-6 rounded-3xl">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link to="/" className="text-sm font-medium hover:text-[#00BBA7]">
                Home
              </Link>
            </li>
            <li className="inline-flex items-center">
              <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
              <Link to="#" className="text-sm font-medium hover:text-[#00BBA7]">
                Pages
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <HiChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                <span className="text-sm font-medium text-gray-400">About</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-10">
        {/* Banner */}
        <div className="relative bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <img
            src="/about-banner.png"
            alt="About Banner"
            className="rounded-lg w-full max-h-[360px] object-cover"
          />
          <div className="absolute flex flex-col items-start justify-center top-6 sm:top-16 left-4 sm:left-6 text-black max-w-[80%]">
            <h2 className="text-xl sm:text-4xl font-bold leading-snug">
              Best experience always wins
            </h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base font-medium">
              #1 Online Marketplace for Electronic & Technology{" "}
              <br className="hidden sm:block" />
              in Manhattan, CA
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 shadow-md text-center sm:text-left">
          <div>
            <p className="text-lg font-bold text-gray-800">
              OUR PURPOSE IS TO{" "}
              <span className="text-green-500">ENRICH AND ENHANCE LIVES</span>{" "}
              THROUGH TECHNOLOGY
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">$12.5M</p>
            <p className="text-gray-600 text-sm">TOTAL REVENUE FROM 2001 - 2023</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12K+</p>
            <p className="text-gray-600 text-sm">ORDERS DELIVERED SUCCESSFULLY EVERY DAY</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">725+</p>
            <p className="text-gray-600 text-sm">STORES AND OFFICES IN U.S. AND WORLDWIDE</p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div>
            <img
              src="/aboutsecound.png"
              alt="Delivery"
              className="rounded-lg w-full h-[400px] sm:h-[360px] object-container object-center shadow-md"
            />
          </div>
          <div className="bg-[#E2E4EB] p-6 sm:p-10 rounded-lg shadow-md flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              We connect millions of buyers and sellers around the world.
            </h3>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Millions of people connect online and offline to buy and sell
              unique goods. We offer tools and services that help entrepreneurs
              start and grow their businesses.
            </p>
            <div className="mt-4">
              <button className="bg-[#01A49E] text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
                OUR SHOWREEL
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[
            {
              title: "100% AUTHENTIC PRODUCTS",
              desc: "We only distribute authorized products and guarantee quality.",
            },
            {
              title: "FAST DELIVERY",
              desc: "Multiple delivery options with a 100% on-time guarantee.",
            },
            {
              title: "AFFORDABLE PRICE",
              desc: "Affordable prices with frequent special promotions.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-lg shadow-md relative">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
              <div className="absolute top-4 right-4 bg-teal-500 w-6 h-6 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">OUR MISSION AND VISION</h2>
          <p className="text-gray-700 mb-4">
            We deliver high-quality products and services while fostering
            innovation and community growth. Our vision is to be globally
            recognized for customer satisfaction and sustainability.
          </p>
          <img
            src="/ourMission.png"
            alt="Mission and Vision"
            className="mt-4 rounded-lg mx-auto w-full max-w-1xl h-96 object-cover"
          />

          {/* Timeline */}
          <div className="bg-white p-4 sm:p-6 mt-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 uppercase">
              From a Small Retail Store to a Global Chain
            </h2>
            <p className="text-gray-700 mb-4">
              Starting in Brooklyn, our journey highlights growth through key
              milestones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
              <ul className="text-gray-700 space-y-1">
                <li><strong>1997:</strong> Opened first retail store in Brooklyn.</li>
                <li><strong>1998:</strong> Expanded product offerings.</li>
                <li><strong>2000:</strong> Launched first website.</li>
                <li><strong>2004:</strong> Expanded to East Coast.</li>
                <li><strong>2006:</strong> Introduced private-label products.</li>
                <li><strong>2010:</strong> Opened 100th store & international shipping.</li>
              </ul>
              <ul className="text-gray-700 space-y-1">
                <li><strong>2014:</strong> Expanded to Europe and Asia.</li>
                <li><strong>2016:</strong> Launched mobile app.</li>
                <li><strong>2018:</strong> Hit 1M customers globally.</li>
                <li><strong>2021:</strong> Opened global flagship stores.</li>
                <li><strong>2022:</strong> Launched eco-friendly lines.</li>
                <li><strong>2023:</strong> Celebrated 25 years with 500+ stores.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Leadership Section */}
        <section className="bg-white p-6 sm:p-8 mt-10 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">LEADERSHIPS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Henry Avery", title: "CHAIRMAN", img: "/leadershipsperson1.png" },
              { name: "Michael Edward", title: "VICE PRESIDENT", img: "/leadershipsperson2.png" },
              { name: "Eden Hazard", title: "CEO", img: "/leadershipsperson3.png" },
              { name: "Robert Downey Jr", title: "CEO", img: "/leadershipsperson4.png" },
              { name: "Nathan Drake", title: "STRATEGIST DIRECTOR", img: "/leadershipsperson5.png" },
            ].map((leader, index) => (
             <div key={index} className="text-center cursor-pointer group">
  <img
    src={leader.img}
    alt={leader.name}
    className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full mx-auto shadow mb-2 group-hover:scale-105 transition-transform"
  />
  <h3 className="font-semibold text-lg group-hover:text-[#01A49E] transition-colors">
    {leader.name}
  </h3>
</div>
            ))}
          </div>
        </section>

        {/* Promo Bar */}
        <div
          className="relative bg-green-500 text-white text-sm md:text-base px-2 py-3 mt-10 rounded-lg flex justify-center items-center shadow-lg"
          style={{
            backgroundImage: "url('/aboutbar.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="mr-2">✨</span>
          <span>
            Member get{" "}
            <span className="text-yellow-300 font-semibold">FREE SHIPPING</span>{" "}
            with no order minimum!
            <span className="text-gray-200"> *Restriction apply </span>
            <a
              href="#"
              className="text-blue-200 underline hover:text-blue-400 ml-1"
            >
              Try free 30-days trial!
            </a>
          </span>
        </div>
      </section>
  </>
    
  );
};

export default About;
