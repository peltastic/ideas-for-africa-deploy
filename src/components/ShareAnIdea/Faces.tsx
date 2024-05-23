import React from "react";
import Face1 from "/public/assets/share-an-idea-1.png";
import Face2 from "/public/assets/share-an-idea-2.png";
import Face3 from "/public/assets/share-an-idea-3.png";
import Face4 from "/public/assets/share-an-idea-4.png";
import Image from "next/image";

type Props = {};
const images = [Face1, Face2, Face3, Face4];
const Faces = (props: Props) => {
  return (
    <section className="bg-bg-grey1 mt-10">
      <div className="px-8 sm:px-20 py-20">
        <h1 className="font-semibold text-3xl xs:text-4xl mb-10">
          Faces of Idea for Africa
        </h1>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 mm:grid-cols-4 gap-8">
          {images.map((el, index) => (
            <div key={index} className="mx-auto">
              <Image src={el} alt="face-img" />
              <div className="text-sm mt-8">
                <h1 className="font-bold text-black4">Niyi Akinmolayan</h1>
                <p className="text-[#7E84A3]">Founder idea of Africa</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faces;
