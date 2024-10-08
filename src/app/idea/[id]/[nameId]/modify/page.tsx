"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo.svg";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import { useLazyGetSingleIdeaQuery } from "@/lib/features/ideas";
import { useParams } from "next/navigation";
import ModifyIdea from "@/components/Idea/ModifyIdea";
import ModifyIdeaSkeleton from "@/components/Skeleton/ModifyIdeaSkeleton";
import WIthAuth from "@/components/HOC/ProtectRoute";

type Props = {};

const ModifyIdeaPage = (props: Props) => {
  const { id } = useParams<{
    id: string;
  }>();
  const [getIdea, { data }] = useLazyGetSingleIdeaQuery();
  useEffect(() => {
    getIdea({
      id,
    });
  }, []);
  return (
    <div className="bg-idea-bg xs:px-2">
      <nav className="w-full py-4 px-6">
        <div className="flex items-center ">
          <div className="cursor-pointer mr-auto">
            <Link href={"/"}>
              <Image src={Logo} alt="logo" />
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </nav>

      {data ? (
        <ModifyIdea data={data} />
      ) : (
        <div className="bg-white w-full min-h-screen">
          <div className="bg-white w-[95%] sm:w-[80%] lg:w-[60%] mx-auto pt-10">
            <ModifyIdeaSkeleton />
          </div>
        </div>
      )}
    </div>
  );
};

export default WIthAuth(ModifyIdeaPage);
