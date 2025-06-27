import { Kodchasan } from "next/font/google";
import Hero from "./components/hero";
import MenuPreview from "./components/menuPreview";
import MenuOrder from "./components/menuOrder";
import CartOrder from "./components/cartOrders";
import { Drawer } from "./components/ui/drawer";
import ViewOrder from "./components/viewOrders";

const kodchasan = Kodchasan({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function Home() {

  return (
    <div className={`${kodchasan.className} bg-white`}>
      <ViewOrder />
      <Hero />
      <MenuPreview />
      <MenuOrder />
      <CartOrder />
    </div>
  );
}
