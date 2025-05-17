import Hero_Img from "../assets/Hero_img.png";

const HERO_CONTENT = [
  {
    title: "All Fast Food is Available at ",
    description: "We Are Just a Click Away When You Crave Delicious Fast Food",
    button: "Buy Now",
    orderButton: "How to Order",
    img: Hero_Img,
  },
];

const Hero = () => {
  return (
    <section
      className="Hero relative flex container mt-20 justify-between "
      id="home"
    >
      <div className="Hero_Content flex flex-col w-1/2">
        {HERO_CONTENT.map((content) => (
          <>
            <div key={content.title}>
              <h1 className="cal-sans-bold text-6xl text-bold-red">
                {content.title.split(" is ")[0]} is
                <br />
                {content.title.split(" is ")[1]}
                <span className="relative z-1">
                  Foodle
                  <span className="absolute border-10 border-yellow-light rounded-[25px] bottom-2 left-0 w-full z-[-1]"></span>
                </span>
              </h1>
              <div className="p-6"></div>
              <div className="cal-sans-regular text-2xl">
                <p>
                  {content.description.split(" You ")[0]} You
                  <br />
                  {content.description.split(" You ")[1]}
                </p>
              </div>
              <div className="p-6"></div>

              <div className="flex cal-sans-regular gap-4 text-2xl">
                <button className="group flex items-center gap-2 mr-6 p-2 pr-4 text-light bg-bold-red hover:bg-bold-red-hover rounded-[50px] ">
                  <div className="bg-yellow-dark text-dark rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6 group-hover:scale-110 transition-all duration-300"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>

                  {content.button}
                </button>
                <button className="group text-dark hover:text-regular-hover flex items-center gap-2 mr-6 p-2 pr-4">
                  <div className="relative ">
                    <div
                      className="absolute bg-bold-red rounded-full 
                    w-[120%] h-[120%] left-1/2 top-1/2 -translate-y-1/2 overflow-hidden -translate-x-1/2
                    before:content-[''] before:absolute before:inset-0 
                    before:bg-bold-red before:rounded-full clip-half-circle"
                    ></div>

                    <div className="relative z-10 bg-light p-3 text-yellow-dark rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5 transition-all duration-300 group-hover:rotate-[120deg]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  {content.orderButton}
                </button>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="Hero_Image group w-1/2">
        {HERO_CONTENT.map((content) => (
          <img
            className="group-hover:scale-101 transition-all duration-200 select-none"
            src={content.img}
            alt="Loading..."
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
