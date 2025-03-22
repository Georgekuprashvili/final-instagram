import Image from "next/image";
import mobileImg from "@/photos/mobile.jpg";
function MobileImg() {
  return (
    <div className="w-[380px] h-[580px]">
      <Image
        src={mobileImg}
        alt="Mobile Image"
        priority
        className="h-auto w-[100%]"
      />
    </div>
  );
}

export default MobileImg;
