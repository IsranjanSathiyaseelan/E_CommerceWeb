const NewsLetter = () => {
  return (
    <div className="mt-24 px-4 pb-14">
      <div
        className="max-w-5xl mx-auto flex flex-col md:flex-row 
        items-center justify-between gap-6"
      >
        {/* Left Side - Text */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">
            Never Miss a Deal!
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500">
            Subscribe to get the latest offers, new arrivals, and exclusive discounts
          </p>
        </div>

        {/* Right Side - Form */}
        <form
          className="flex items-center w-full md:w-auto 
          border border-gray-300 rounded-md overflow-hidden h-11 md:h-12"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="px-4 h-full w-full md:w-64 outline-none text-sm text-gray-600"
          />

          <button
            type="submit"
            className="px-6 md:px-8 h-full bg-primary text-white text-sm font-medium 
            hover:bg-primary-dull transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;