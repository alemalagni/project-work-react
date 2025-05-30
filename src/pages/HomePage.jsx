import HeroSpace from "../components/HeroSpace";
import Series from "../components/Series";
import Carousel from "../components/Carousel";
import CarouselPoplarity from "../components/CarouselPoplarity";

function HomePage() {

    return (

        <>
            <div className="mb-5">
                <HeroSpace />
                <Carousel />
                <Series />
                <CarouselPoplarity />


            </div>

        </>

    )
}

export default HomePage;