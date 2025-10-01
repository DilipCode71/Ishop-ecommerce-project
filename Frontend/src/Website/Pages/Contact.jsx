import React from 'react'
import { Link } from 'react-router-dom'
import { HiChevronRight } from "react-icons/hi";
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';


function Contact() {
  return (
    <>



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
            <span className="text-sm font-medium text-gray-400">CONTACT</span>
          </div>
        </li>
          </ol>
        </nav>
      </div>

  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-teal-500 mb-2">READY TO WORK WITH US</h1>
          <p className="text-gray-600">Contact us for all your questions and opinions.</p>
        </div>

        <div className="bg-white  rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1   lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Email Address*"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Phone Number (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Your message..."
                  />
                </div>


                
                <div className="flex items-center mt-4">
                        <input type="checkbox" id="news" className="mr-2" />
                        <label htmlFor="news" className="text-gray-600 text-sm">I want to receive news and updates once in a while. By submitting, I'm agreed to the <a href="#" className="text-blue-500">Terms & Conditions</a></label>
                    </div>


                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center group cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </form>
            </div>



            {/* Contact Information */}



            <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-8 lg:p-12">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Our Location</h4>
                      <p className="text-blue-100">152 Street Mall Road, IT Park, Gurugram</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Phone Number</h4>
                      <p className="text-blue-100">9950944352</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Email Address</h4>
                      <p className="text-blue-100">Ishop@gamil.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Business Hours</h4>
                      <p className="text-blue-100">Monday - Friday: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>


                    {/* Map */}
                    <div className="mt-12">
                  <div className="rounded-lg overflow-hidden h-48">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1821990.8802510258!2d75.790558!3d26.885211!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1745126496526!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    />
                    



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  </>





  )
}

export default Contact