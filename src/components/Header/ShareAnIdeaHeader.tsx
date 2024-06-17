import React from "react";
import ShareAnIdeaImg from "/public/assets/ShareAnIdea.png";
import Image from "next/image";
import Avatar from "/public/assets/avatar.png";

type Props = {};

const ShareAnIdeaHeader = (props: Props) => {
  return (
    <header>
      <div className=" mx-auto w-[90%] sm:w-[70%] lg:w-[50%] sm:ml-10 sm:mr-10 md:mr-auto md:ml-20 pt-14 mt-2">
        <p className="text-gray1">Meet the team</p>
        <h1 className="font-bold sm:font-semibold text-[2rem] sm:text-[2.7rem] leading-[1.3] sm:leading-[1.09]">
          We truly believe that shared ideas are never forgotten.
        </h1>
      </div>
      <div className="mt-10">
        <div className="w-full">
          <Image src={ShareAnIdeaImg} alt="share-an-idea" />
        </div>
      </div>
      <div className="flex flex-wrap px-4 sm:px-20 mt-20 ">
        <div className="w-full mm:w-[50%] text-4xl font-bold sm:font-semibold">
          <div className=" w-full sm:w-[95%] lg:w-[70%]">
            <h1>We do this for a single cause</h1>
          </div>
        </div>
        <div className="w-full mm:w-[50%] mt-10 mm:mt-0">
          <div className="w-full lg:w-[90%]">
            <p className="text-black3 text-sm">
              Sharing ideas is crucial for growth and development, as it allows
              for collaboration, feedback, and the opportunity to expand upon
              initial concepts. By engaging with communities or platforms
              relevant to your interests, you can tap into a wealth of knowledge
              and perspectives, sparking new insights and potential
              partnerships. Additionally, actively participating in discussions
              and sharing your ideas can lead to valuable feedback that helps
              refine and strengthen your concepts over time. <br /> <br /> To
              get your ideas known to the public, it&apos;s essential to adopt a
              multifaceted approach. This includes networking with industry
              peers, leveraging social media platforms to showcase your work,
              and seeking out opportunities to present or publish your ideas. By
              actively promoting your ideas through various channels and
              engaging with a diverse audience, you increase the chances of
              gaining visibility, recognition, and ultimately, making a
              meaningful impact with your innovative concepts.
            </p>
          </div>
          <div className="flex items-center mt-6">
            <div className="mr-4">
              <Image src={Avatar} alt="avatar" />
            </div>
            <div className="text-xs mr-auto ">
              <p className="font-bold">Demilade Odetara</p>
              <p className="leading-5 text-gray1">CEO Pledre Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShareAnIdeaHeader;
