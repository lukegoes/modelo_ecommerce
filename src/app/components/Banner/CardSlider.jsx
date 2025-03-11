import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "./style.css"

const CardSlider = () => {
  return (
    <main>
      <div className="container">
        <Swiper
          modules={[Pagination, Autoplay]}
          initialSlide={0}
          centeredSlides={true}
          slidesPerView={1}
          speed={800}
          slideToClickedSlide={true}
          pagination={{ el: ".swiper-pagination", clickable: true }}
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
        </Swiper>
      </div>
    </main>
  )
}

export default CardSlider

