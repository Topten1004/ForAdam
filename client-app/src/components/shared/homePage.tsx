import About from "../../components/About";
import HowItWorks from "../../components/HowItWorks";
import FaqComponent from "../../components/FaqComponent";
import Banner from "../../components/Banner";
import Footer from "../Footer";

const HomePage = () => {
  return (
    <main className="max-w-8xl mx-auto">
      <Banner />
      <About />
      <HowItWorks />
      <FaqComponent />
      <Footer />
    </main>
  );
};

export default HomePage;
