"use client"
import "./styles.css"
import CardSlider from "./components/Banner/CardSlider"
import BestSellersGrid from "./components/Grid/Grid"
import NewArrivalsGrid from "./components/NewArrivals/NewArrivals"
import FeaturedCategories from "./components/FeaturedCategories/FeaturedCategories"
import Newsletter from "./components/Newsletter/Newsletter"
import Footer from "./components/Footer/Footer"

export default function Home() {
  return (
    <div>
      <CardSlider />
      <BestSellersGrid />
      <NewArrivalsGrid />
      <FeaturedCategories />
      <Newsletter />
      <Footer />
    </div>
  )
}

