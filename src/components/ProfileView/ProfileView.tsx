"use client";
import Tabs from "@/Tabs/Tabs";
import React, { useState } from "react";
import Ideas from "../Ideas/Ideas";
import { useRouter, useSearchParams } from "next/navigation";
import UserModifiedIdeas from "./UserModifiedIdeas";
import UserBrainstormGroups from "./UserBrainstormGroups";

type Props = {
  id: string;
};

const ProfileView = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [currentTab, setCurrentTab] = useState<
    "Ideas" | "Modified Ideas" | "Brainstorm" | string
  >("Ideas");
  let component = <Ideas hideFilter />;
  switch (tab) {
    case "ideas":
      component = <Ideas hideFilter />;
      break;
    case "modified ideas":
      component = <UserModifiedIdeas />;
    case "brainstorm":
      component = <UserBrainstormGroups />
    default:
      break;
  }
  return (
    <div>
      <div className="my-8">
        <Tabs
        profile
          elements={["Ideas", "Modified Ideas", "Brainstorm"]}
          filterVal={tab || "ideas"}
          setVal={(el) =>
            router.push(`/profile/${props.id}?tab=${el.toLowerCase()}`)
          }
        />
      </div>
      {component}
    </div>
  );
};

export default ProfileView;
