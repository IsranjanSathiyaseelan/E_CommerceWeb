import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="space-y-16 md:space-y-20">
      <section className="-mx-6 md:-mx-16 lg:-mx-24 xl:-mx-32">
        <MainBanner />
      </section>
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
