import Icon_Img from "../../assets/Hero_img.png";
import FastFood from "../../assets/Burgur.png";

const OFFER_CONTENTS = [
  {
    title: "Fast Delivery",
    description:
      "The Food Will Be Delivered to Your Home Within 1 - 2 Hours Of Your Ordering.",
    img: Icon_Img,
    gradient: "from-offer-primary-400 to-offer-accent-500",
    shadowColor: "shadow-offer-primary-400/20",
    iconBg: "bg-gradient-to-br from-offer-primary-100 to-offer-primary-200",
    hoverGradient:
      "group-hover:from-offer-primary-400 group-hover:to-offer-accent-500",
  },
  {
    title: "Fresh Food",
    description:
      "Your Food Will Be Delivered 100% Fresh To Your Home. We Do Not Deliver Stale Food.",
    img: FastFood,
    gradient: "from-offer-fresh-400 to-offer-emerald-500",
    shadowColor: "shadow-offer-fresh-400/20",
    iconBg: "bg-gradient-to-br from-offer-fresh-100 to-offer-fresh-200",
    hoverGradient:
      "group-hover:from-offer-fresh-400 group-hover:to-offer-emerald-500",
  },
  {
    title: "Free Delivery",
    description:
      "Your Food Delivery Is Absolutely Free. No Cost Just Order And Enjoy.",
    img: Icon_Img,
    gradient: "from-offer-cool-400 to-offer-purple-500",
    shadowColor: "shadow-offer-cool-400/20",
    iconBg: "bg-gradient-to-br from-offer-cool-100 to-offer-cool-200",
    hoverGradient:
      "group-hover:from-offer-cool-400 group-hover:to-offer-purple-500",
  },
];

const Offer = () => {
  return (
    <section
      className="Offer relative container mx-auto px-4 py-20 -mt-16 z-10 hover:shadow-lg rounded-[25px] transition-all duration-1000"
      id="offer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-offer-neutral-50 via-offer-bg-light to-offer-neutral-100 rounded-3xl opacity-60 blur-3xl"></div>

      <div className="relative">
        <div className="text-center mb-16">
          <h2 className="cal-sans-bold text-4xl md:text-5xl bg-gradient-to-r from-offer-neutral-800 to-offer-neutral-600 bg-clip-text text-transparent mb-4">
            Why Choose Us?
          </h2>
          <p className="cal-sans-regular text-offer-neutral-600 text-lg max-w-2xl mx-auto">
            Experience the difference with our premium food delivery service
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-offer-primary-400 to-offer-accent-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {OFFER_CONTENTS.map((content, index) => (
            <div
              key={index}
              className={`group relative bg-offer-bg-light rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl ${content.shadowColor} hover:shadow-3xl`}
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              ></div>

              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 ${content.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-xl mx-auto`}
                >
                  <img
                    src={content.img}
                    alt={content.title}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-offer-golden-400 to-offer-primary-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-offer-cool-400 to-offer-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-150"></div>
              </div>

              <div className="text-center relative z-10">
                <h3
                  className={`cal-sans-bold text-2xl mb-4 text-offer-neutral-800 group-hover:bg-gradient-to-r ${content.hoverGradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                >
                  {content.title}
                </h3>

                <p className="cal-sans-regular text-offer-neutral-600 leading-relaxed group-hover:text-offer-neutral-700 transition-colors duration-300">
                  {content.description}
                </p>
              </div>

              <div
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${content.gradient} rounded-full group-hover:w-3/4 transition-all duration-500 ease-out`}
              ></div>

              <div className="absolute top-4 right-4 w-2 h-2 bg-offer-neutral-200 rounded-full group-hover:bg-gradient-to-r group-hover:from-offer-neutral-300 group-hover:to-offer-neutral-400 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-offer-primary-400 to-offer-accent-500 opacity-60 animate-pulse"
                style={{ animationDelay: `${i * 300}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
