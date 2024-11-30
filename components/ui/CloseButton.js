import React from "react";
import close from "../../public/images/modalclose.svg";
import Image from "next/image";
export default function CloseButton() {
  return (
    <div className="absolute top-4 right-4 md:top-4 md:right-4 p-2 cursor-pointer hover:bg-neutral-100 rounded-lg z-10 bg-white">
      <Image src={close} alt="Admin Signin Button" />
    </div>
  );
}
