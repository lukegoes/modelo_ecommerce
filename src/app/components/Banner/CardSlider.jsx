import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "./style.css"

const CardSlider = () => {
  return (
    <main>
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          initialSlide={0}
          centeredSlides={true}
          slidesPerView={1}
          speed={800}
          loop={true}
          slideToClickedSlide={true}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { spaceBetween: 40 },
            430: { spaceBetween: 50 },
            580: { spaceBetween: 70 },
            650: { spaceBetween: 30 },
          }}
        >
          <SwiperSlide
            className="swiper-slide slide-1"
            style={{ width: "1440px", height: "500px" }}
            key="slide-1"
          ></SwiperSlide>
          <SwiperSlide
            className="swiper-slide slide-2"
            style={{ width: "1440px", height: "500px" }}
            key="slide-2"
          ></SwiperSlide>
          <SwiperSlide
            className="swiper-slide slide-3"
            style={{ width: "1440px", height: "500px" }}
            key="slide-3"
          ></SwiperSlide>
          <SwiperSlide
            className="swiper-slide slide-4"
            style={{ width: "1440px", height: "500px" }}
            key="slide-4"
          ></SwiperSlide>

          <div className="swiper-pagination"></div>
          
          <div className="swiper-button-prev">
            <span className="swiper-button-prev-icon"></span>
          </div>
          <div className="swiper-button-next">
            <span className="swiper-button-next-icon"></span>
          </div>
        </Swiper>
      </div>
    </main>
  )
}

export default CardSlider

