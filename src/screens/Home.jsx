import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card"
import Carousel from "../components/Carousel";
export default function Home() {
    return (
        <div>
            <Navbar />
                <div>
                    <Carousel />
                </div>

                <div className="container d-flex">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>

            <Footer />
        </div>
    )
}