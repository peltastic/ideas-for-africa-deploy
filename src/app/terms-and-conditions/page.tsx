import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "/public/assets/logo.svg";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";

type Props = {};

const TermsAndConditionsPage = (props: Props) => {
  return (
    <div className="">
      <nav className="w-full py-4 px-6 ">
        <div className="flex items-center ">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
        </div>
      </nav>
      <div className="px-8 mt-10 max-w-[1600px] mx-auto">
        <h1 className="text-3xl xxl:text-5xl font-semibold">
          IdeasAfrica.org Terms & Conditions
        </h1>
        <h2 className="mt-8 font-semibold text-lg xxl:text-3xl mb-8">Welcome to IdeasAfrica.org!</h2>
        <p className="mb-8 text-base xxl:text-xl">
          IdeasAfrica.org is a platform designed to foster open and
          collaborative
        </p>

        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">1. Sharing Your Ideas:</h3>
        <p className="mb-8 text-base xxl:text-xl">
          IdeasAfrica.org is a platform for publicly sharing ideas. When you
          submit an idea, you understand and agree that your idea will be
          published on the website and accessible to everyone.
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">2. User Content and Intellectual Property:</h3>
        <p className="mb-2 text-base xxl:text-xl ">
          You retain all ownership rights to your ideas submitted on
          IdeasAfrica.org. However, by submitting your idea, you grant
          IdeasAfrica.org a non-exclusive, worldwide, royalty-free license to
          publish, display, reproduce, modify, translate, and distribute your
          idea on the website and other related promotional materials.
        </p>
        <br />
        <p className="mb-8 text-base xxl:text-xl">
          You also grant other users a non-exclusive, worldwide, royalty-free
          license to modify, adapt, and build upon your idea, provided that they
          attribute your original idea.
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">3. User Conduct:</h3>
        <p className="mb-8 text-base xxl:text-xl">
          You agree to use IdeasAfrica.org in a respectful and lawful manner.
          You will not submit any content that is:
        </p>
        <ul className="list-disc px-[3rem] mb-8">
          <li className="text-base xxl:text-xl">
            Illegal, obscene, defamatory, threatening, harassing, abusive,
            hateful, or discriminatory
          </li>
          <li className="text-base xxl:text-xl">Infringes on the intellectual property rights of others.</li>
          <li className="text-base xxl:text-xl">Contains viruses or other malicious code.</li>
          <li className="text-base xxl:text-xl">Spams or solicits users.</li>
        </ul>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">4. Disclaimer:</h3>
        <p className="mb-8 text-base xxl:text-xl">
          IdeasAfrica.org does not endorse or guarantee the validity or success
          of any idea submitted on the website. You are solely responsible for
          the content of your ideas.
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">5. Limitations of Liability:</h3>
        <p className="mb-8 text-base xxl:text-xl">
          IdeasAfrica.org is not liable for any damages arising from your use of
          the website or the ideas shared by others.
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">6. Governing Law:</h3>
        <p className="mb-8 text-base xxl:text-xl">
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Country].
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-2">7. Modification of Terms:</h3>
        <p className="mb-4 text-base xxl:text-xl">
          IdeasAfrica.org reserves the right to modify these Terms at any time.
          Your continued use of the website following the posting of any changes
          to the Terms constitutes acceptance of those changes.
        </p>
        <h3 className="font-semibold text-lg xxl:text-2xl mb-4">8. Entire Agreement:</h3>
        <p className="mb-4 text-base xxl:text-xl">
          These Terms constitute the entire agreement between you and
          IdeasAfrica.org regarding your use of the website.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
