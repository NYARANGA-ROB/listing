import React, { useCallback, useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <section className="pb-20 pt-20 dark:bg-dark lg:pb-[120px] lg:pt-[120px]">
        <div className="container mx-auto">
          <Swiper slidesPerView={1} ref={sliderRef}>
            <SwiperSlide>
              <SingleTestimonial 
                image="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/image-01.jpg"
                reviewImg="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/lineicon.svg"
                reviewAlt="lineicon"
                details="Urban Homes stands out as a leading real estate agency, recognized for its unwavering commitment to excellence! Our mission is deeply rooted in helping clients achieve their unique real estate goals. "
                name="Larry Diamond"
                position="Chief Executive Officer."
              />
            </SwiperSlide>
            <SwiperSlide>
              <SingleTestimonial
                image="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/image-01.jpg"
                reviewImg="https://cdn.tailgrids.com/2.0/image/marketing/images/testimonials/testimonial-01/lineicon.svg"
                reviewAlt="lineicon"
                details="Urban Homes stands out as a leading real estate agency, recognized for its unwavering commitment to excellence! Our mission is deeply rooted in helping clients achieve their unique real estate goals. "
                
              />
            </SwiperSlide>
            {/* <div className="absolute left-0 right-0 z-10 flex items-center justify-center gap-5 sm:bottom-0 hover:none">
              <div className="prev-arrow cursor-pointer" onClick={handlePrev}>
                <FaArrowAltCircleLeft className="h-5 w-5" />

              </div>
              <div className="next-arrow cursor-pointer" onClick={handleNext}>
               
            <FaArrowAltCircleRight  className="h-5 w-5"/>
              </div>

            </div> */}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Testimonial;

const SingleTestimonial = ({
  image,
  reviewImg,
  reviewAlt,
  details,
  name,
  position,
}) => {
  return (
    <div className="relative flex justify-center">
      <div className="relative w-full pb-16 md:w-11/12 lg:w-10/12 xl:w-8/12">
        <div className="w-full items-center md:flex">
          <div className="relative mb-12 w-full max-w-[310px] md:mb-0 md:mr-12 md:max-w-[250px] lg:mr-14 lg:max-w-[280px] 2xl:mr-16">
            <img src={image} alt="image" className="w-full" />
            <span className="absolute -left-6 -top-6 z-[-1] hidden sm:block">
              <DotShape />
            </span>
            <span className="absolute -bottom-6 -right-6 z-[-1]">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z"
                  stroke="#13C296"
                  strokeWidth="6"
                />
              </svg>
            </span>
          </div>
          <div className="w-full">
            <div>
              <div className="mb-7">
                <img src={reviewImg} alt={reviewAlt} />
              </div>

              <p className="mb-11 text-blue-700 font-normal italic leading-[1.81] text-body-color dark:text-dark-6 sm:text-[22px]">
                {details}
              </p>

              <h4 className="mb-2 text-[22px] font-bold leading-[27px] text-black ">
                {name}
              </h4>
              <p className="text-base text-body-color dark:text-dark-6">
                {position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DotShape = () => {
  return (
    <>
      <svg
        width="77"
        height="77"
        viewBox="0 0 77 77"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="1.66343"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 1.66343 74.5221)"
          fill="#3056D3"
        />
        <circle
          cx="1.66343"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 1.66343 30.94)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 16.3016 74.5221)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 16.3016 30.94)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 30.9398 74.5221)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 30.9398 30.94)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="74.5221"
          r="1.66343"
          transform="rotate(-90 45.578 74.5221)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="30.94"
          r="1.66343"
          transform="rotate(-90 45.578 30.94)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="74.5216"
          r="1.66343"
          transform="rotate(-90 60.2162 74.5216)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="74.5216"
          r="1.66343"
          transform="rotate(-90 74.6634 74.5216)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="30.9398"
          r="1.66343"
          transform="rotate(-90 60.2162 30.9398)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="30.9398"
          r="1.66343"
          transform="rotate(-90 74.6634 30.9398)"
          fill="#3056D3"
        />
        <circle
          cx="1.66343"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 1.66343 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="1.66343"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 1.66343 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 16.3016 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 16.3016 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 30.9398 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 30.9398 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 45.578 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 45.578 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 60.2162 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="59.8839"
          r="1.66343"
          transform="rotate(-90 74.6634 59.8839)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 60.2162 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="16.3017"
          r="1.66343"
          transform="rotate(-90 74.6634 16.3017)"
          fill="#3056D3"
        />
        <circle
          cx="1.66343"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 1.66343 45.2455)"
          fill="#3056D3"
        />
        <circle
          cx="1.66343"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 1.66343 1.66342)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 16.3016 45.2455)"
          fill="#3056D3"
        />
        <circle
          cx="16.3016"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 16.3016 1.66342)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 30.9398 45.2455)"
          fill="#3056D3"
        />
        <circle
          cx="30.9398"
          cy="1.66342"
          r="1.66343"
          transform="rotate(-90 30.9398 1.66342)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="45.2455"
          r="1.66343"
          transform="rotate(-90 45.578 45.2455)"
          fill="#3056D3"
        />
        <circle
          cx="45.578"
          cy="1.66344"
          r="1.66343"
          transform="rotate(-90 45.578 1.66344)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="45.2458"
          r="1.66343"
          transform="rotate(-90 60.2162 45.2458)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="45.2458"
          r="1.66343"
          transform="rotate(-90 74.6634 45.2458)"
          fill="#3056D3"
        />
        <circle
          cx="60.2162"
          cy="1.66371"
          r="1.66343"
          transform="rotate(-90 60.2162 1.66371)"
          fill="#3056D3"
        />
        <circle
          cx="74.6634"
          cy="1.66371"
          r="1.66343"
          transform="rotate(-90 74.6634 1.66371)"
          fill="#3056D3"
        />
      </svg>
    </>
  );
};
