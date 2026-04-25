import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, formData }) => (
  <input
    className="w-full px-2 py-2.5 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={formData[name]}
    required
  />
);

// Textarea Component
const TextAreaField = ({ placeholder, name, handleChange, formData }) => (
  <textarea
    className="w-full px-2 py-2.5 border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition resize-none"
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={formData[name]}
    rows="5"
    required
  />
);

export const Contact = () => {
  const { axios, navigate } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/contact/send", formData);

      if (data.success) {
        toast.success(data.message || "Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while sending your message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Get In <span className="font-semibold text-primary">Touch</span>
      </p>

      <p className="text-gray-500 mt-3 mb-8">
        We'd love to hear from you. Please fill out the form below and we'll get
        back to you as soon as possible.
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10 gap-8">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">

            <div className="grid grid-cols-2 gap-4">
              <InputField handleChange={handleChange} formData={formData} name="firstName" type="text" placeholder="First Name" />
              <InputField handleChange={handleChange} formData={formData} name="lastName" type="text" placeholder="Last Name" />
            </div>

            <InputField handleChange={handleChange} formData={formData} name="email" type="email" placeholder="Email address" />
            <InputField handleChange={handleChange} formData={formData} name="phone" type="tel" placeholder="Phone number" />
            <InputField handleChange={handleChange} formData={formData} name="subject" type="text" placeholder="Subject" />

            <TextAreaField handleChange={handleChange} formData={formData} name="message" placeholder="Your message" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

          </form>
        </div>

{/* CONTACT INFO (ONLY STYLED AS CARD) */}
<div className="flex-1 md:flex md:flex-col md:justify-center">
  <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

    <h3 className="text-lg font-semibold text-gray-700 mb-4">
      Contact Information
    </h3>

    <div className="space-y-5 text-gray-500 text-sm">

      <div>
        <p className="font-medium text-gray-700">Address</p>
        <p>
          123 colombo Street<br />
          Sri Lanka
        </p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Phone</p>
        <p>+1 (555) 123-4567</p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Email</p>
        <p>support@ecommerce.com</p>
      </div>

      <div>
        <p className="font-medium text-gray-700">Working Hours</p>
        <p>
          Mon - Fri: 9:00 AM - 6:00 PM<br />
          Sat: 10:00 AM - 4:00 PM
        </p>
      </div>

    </div>
  </div>
</div>
      </div>
    </div>
  );
};