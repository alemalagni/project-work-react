import HeroSpace from "../components/HeroSpace";
import Series from "../components/Series";
import Carousel from "../components/Carousel";


function HomePage() {

    return (

        <>
            <div className="gradient pb-5">
                <HeroSpace />
                <Carousel />
                <Series />

            </div>

        </>

    )
}

export default HomePage;