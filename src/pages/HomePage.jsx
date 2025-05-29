import HeroSpace from "../components/HeroSpace";
import Series from "../components/Series";
import Carousel from "../components/Carousel";


function HomePage() {

    return (

        <>
            <div className="gradient">
                <HeroSpace />
                <Carousel />
                <Series />

            </div>

        </>

    )
}

export default HomePage;