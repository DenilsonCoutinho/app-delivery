import { Kodchasan } from "next/font/google";
import Hero from "./components/hero";
import MenuPreview from "./components/menuPreview";
import MenuOrder from "./components/menuOrder";
import ToggleCart from "./components/toggleCart";
import CartDrawerView from "./components/cartDrawerView";
import Loading from "./components/ui/loading/loading";
import Footer from "./components/footer";
import ContactInfo from "./components/contactInfo";

const kodchasan = Kodchasan({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function Home() {

  return (
    <div className={`${kodchasan.className} bg-white`}>
      <CartDrawerView />
      <Hero />
      <MenuPreview />
      <MenuOrder />
      <ToggleCart />
      <ContactInfo />
      <Footer />
    </div>
  );
}
