import { Link } from "react-router-dom";
import "../index.css";
import { Carousel, Image } from "antd";
import IntroductionAI from "../components/home/Introduction";
export const HomePage = () => {
  return (
    <div className="">
      <div className="relative overflow-hidden bg-slate-100 bg-opacity-75 ">
        <div className="pb-80 bg-slate-50 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-2">
                Chẩn đoán thông minh, nông nghiệp bền vững!{" "}
              </h1>
              <p className=" text-xl text-black mt-10">
                "Giải pháp AI cho nhận diện bệnh cây trồng đã đến! Hệ thống
                thông minh của chúng tôi sẽ bảo vệ sức khỏe cây trồng của bạn
                trước những thách thức của tự nhiên."
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-8xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-full w-full overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 mb-10 animate-rotate-y animate-infinite animate-duration-[5000ms]">
                          <Image
                            width={320}
                            height={594}
                            src="./images/leafHome3.png"
                            alt=""
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to={"/recognize"}
                  href="/"
                  className="inline-block rounded-md border border-transparent px-8 py-3 text-center font-medium text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:bg-backgroundPageGradient animate-bounce animate-infinite"
                >
                  Trải nghiệm ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default HomePage;
