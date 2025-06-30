import { Kodchasan } from "next/font/google";
import Hero from "./components/hero";
import MenuPreview from "./components/menuPreview";
import MenuOrder from "./components/menuOrder";
import ToggleCart from "./components/toggleCart";
import CartDrawerView from "./components/cartDrawerView";

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
    </div>
  );
}
