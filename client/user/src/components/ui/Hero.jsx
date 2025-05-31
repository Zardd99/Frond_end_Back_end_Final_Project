import { Link } from "react-router-dom";

const HERO_CONTENT = [
  {
    title: "All Fast Food is Available at ",
    description: "We Are Just a Click Away When You Crave Delicious Fast Food",
    button: "Buy Now",
    orderButton: "How to Order",
    img: "https://i.pinimg.com/736x/64/40/c3/6440c345ba03086afa7ef024673574df.jpg",
  },
];

const Hero = () => (
  <section
    className="relative min-h-screen overflow-hidden cal-sans-regular rounded-2xl"
    id="home"
  >
    {/*  */}
    {/* Animate Background Div */}
    {/*  */}
    <div className="absolute inset-0 bg-gradient-to-br from-hero-orange-50 via-hero-red-50 to-hero-yellow-50">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-hero-orange-400 to-hero-red-500 rounded-full opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-hero-yellow-400 to-hero-orange-500 rounded-full opacity-15 animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-hero-red-400 to-hero-orange-400 rounded-full opacity-25 animate-ping"
        style={{ animationDuration: "2s" }}
      ></div>
    </div>

    {/*  */}
    {/* Content */}
    {/*  */}
    <div className="p-7 lg:p-0"></div>
    <div className="relative container mx-auto px-6 py-20 flex items-center min-h-screen">
      <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-8 z-10">
          {HERO_CONTENT.map((content, index) => (
            <div key={index} className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <h1 className="cal-sans-bold text-3xl lg:text-5xl 2xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-hero-orange-600 to-hero-red-600 bg-clip-text text-transparent">
                    All Fast Food is
                  </span>
                  <br />
                  <span className="text-hero-gray-800">Available at</span>
                  <br />
                  <div className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-hero-orange-500 to-hero-red-500 bg-clip-text text-transparent font-black">
                      Foodle
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-hero-yellow-400 to-hero-orange-500 rounded-full transform -skew-x-12 opacity-80"></div>
                    <div className="absolute -top-4 -right-4 w-3 h-3 bg-hero-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-hero-orange-400 rounded-full animate-pulse"></div>
                  </div>
                </h1>
              </div>

              <p className="text-xl lg:text-2xl text-hero-gray-600 max-w-lg leading-relaxed">
                <span className="font-medium text-hero-gray-800">
                  We Are Just a Click Away
                </span>
                <br />
                When You Crave Delicious Fast Food
              </p>

              <div className="flex flex-wrap gap-y-4 md:gap-6 pt-4">
                <Link
                  to="/allmenu"
                  className="group relative overflow-hidden bg-gradient-to-r from-hero-orange-500 to-hero-red-500 hover:from-hero-orange-600 hover:to-hero-red-600 text-hero-white font-semibold px-4 py-2 md:px-8 md:py-4 rounded-full shadow-2xl hover:shadow-[0_10px_30px_rgba(249,115,22,0.25)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-hero-white/20 backdrop-blur-sm p-2 rounded-full group-hover:rotate-12 transition-transform duration-300">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm md:text-lg">{content.button}</span>
                  </div>
                  <div className="absolute inset-0 -top-[200%] bg-gradient-to-r from-transparent via-hero-white/30 to-transparent skew-y-12 group-hover:top-[200%] transition-all duration-700"></div>
                </Link>

                <button className="group flex items-center gap-3 text-hero-gray-800 font-semibold pl-0 pr-4 py-2 md:px-6 md:py-4 hover:bg-hero-white/50 rounded-full transition-all duration-300 backdrop-blur-sm  justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-hero-orange-400 to-hero-red-500 rounded-full scale-110 opacity-20 group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="relative bg-hero-white shadow-lg p-3 rounded-full group-hover:shadow-xl transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-hero-orange-500 ml-0.5 group-hover:scale-110 transition-transform duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm md:text-lg group-hover:text-hero-orange-600 transition-colors duration-300">
                    {content.orderButton}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-4 md:gap-8 pt-8 text-sm text-hero-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-hero-orange-400 to-hero-red-500 rounded-full border-2 border-hero-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-hero-red-400 to-hero-pink-500 rounded-full border-2 border-hero-white"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-hero-yellow-400 to-hero-orange-500 rounded-full border-2 border-hero-white"></div>
                  </div>
                  <span className="font-medium text-2xs md:text-base">
                    10k+ Happy Customers
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex text-hero-yellow-400">
                    {"★".repeat(5)}
                  </div>
                  <span className="font-medium text-2xs md:text-base">
                    4.9 Rating
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          {HERO_CONTENT.map((content, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-hero-orange-100 to-hero-red-100 p-8 shadow-2xl">
                <img
                  src={content.img}
                  alt="Delicious Fast Food"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />

                <div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-hero-yellow-400 to-hero-orange-500 text-hero-white p-3 rounded-full shadow-lg animate-bounce"
                  style={{ animationDuration: "2s" }}
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182L12 18Z"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-hero-red-400 to-hero-pink-500 text-hero-white p-3 rounded-full shadow-lg animate-pulse">
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .311-.06m0 0L12 14l2.13-2.13"
                    />
                  </svg>
                </div>
              </div>

              <div className="absolute -z-10 -top-8 -left-8 w-full h-full bg-gradient-to-r from-hero-orange-200 to-hero-red-500 rounded-3xl opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 fill-current text-hero-white"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          opacity=".25"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          opacity=".5"
        ></path>
        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
      </svg>
    </div>
  </section>
);

export default Hero;
