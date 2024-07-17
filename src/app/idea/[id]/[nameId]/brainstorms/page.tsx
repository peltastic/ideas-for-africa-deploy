"use client";
import ProfileMenu from "@/components/ProfileMenu/ProfileMenu";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Logo from "/public/assets/logo.svg";
import BrainStorms from "@/components/Brainstorms/BrainStorms";
import { useGetGroupsQuery } from "@/lib/features/brainstorms";
import { useDisclosure } from "@mantine/hooks";
import ModalComponent from "@/components/Modal/Modal";
import BrainStormIcon from "/public/assets/psychology_alt.svg";
import Button from "@/components/Button/Button";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useParams } from "next/navigation";
import BrainstormGroups from "@/components/Skeleton/BrainstormGroups";
import HoverCardComponent from "@/components/HoverCard/HoverCard";
import { IoMdAdd } from "react-icons/io";
import CreateBrainstormGroup from "@/components/Brainstorms/CreateBrainstormGroup";
import SetRoute from "@/components/HOC/setRoute";
import NotLoggedInModal from "@/components/ModalComponents/NotLoggedInModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {};

const BrainstormsPage = (props: Props) => {
  const authStatus = useSelector((state: RootState) => state.persistedState.auth.authStatus)
  const { id } = useParams();
  const { data, isFetching } = useGetGroupsQuery((id as string) ?? skipToken);
  const [opened, { open, close }] = useDisclosure(false);
  const [createBrainstormOpened, funcs] = useDisclosure(false);
  const [authOpened, authFuncs] = useDisclosure(false);

  useEffect(() => {
    if (data && data.groups.length === 0) {
      open();
    }
  }, [data]);

  return (
    <>
      <ModalComponent
        size="lg"
        centered
        opened={authOpened}
        onClose={authFuncs.close}
        
      >
        <NotLoggedInModal title="You need to be Logged In to create a brainstorm group" />
      </ModalComponent>
      <ModalComponent
        size="md"
        withCloseButton
        centered
        opened={createBrainstormOpened}
        onClose={funcs.close}
      >
        <CreateBrainstormGroup close={funcs.close} />
      </ModalComponent>
      <ModalComponent centered size="lg" opened={opened} onClose={close}>
        <div className="">
          <Image
            src={BrainStormIcon}
            className="mx-auto"
            alt="brainstorm-icon"
          />
          <div className="text-center mt-10">
            <h1 className="text-black1 text-3xl font-bold">
              Welcome to brainstorm
            </h1>
            <p className="text-gray1 text-sm">
              Here are things you can do in a brainstorm:
            </p>
          </div>
          <ul className="list-disc w-[85%] mx-auto text-sm mt-8 ">
            <li className="mb-3">
              <p>
                Take the original idea to the next level by building a team to
                make it happen.
              </p>
            </li>
            <li className="mb-3">
              <p>
                Create a group to brainstorm and plan how to bring your idea to
                life.
              </p>
            </li>
            <li className="mb-3">
              <p>Work with people who share your enthusiasm for the idea.</p>
            </li>
            <li className="mb-3">
              <p>
                As the group admin, you can control who joins and leaves the
                group.
              </p>
            </li>
          </ul>
          <div className="flex items-center justify-center my-10 w-[80%] mx-auto gap-6 text-sm">
            <Button
              clicked={close}
              classname="bg-gray3 px-8 py-3 rounded-3xl w-[50%]"
            >
              Close
            </Button>
            <Button
              clicked={close}
              classname="bg-primary py-3 px-8 rounded-3xl text-white w-[50%]"
            >
              Continue
            </Button>
          </div>
        </div>
      </ModalComponent>
      <div className="px-2">
        <nav className="w-full py-4 px-2 xs:px-6">
          <div className="flex items-center ">
            <div className="cursor-pointer mr-auto">
              <Link href={"/"}>
                <Image src={Logo} alt="logo" />
              </Link>
            </div>
            <div className="flex items-center">
              <HoverCardComponent text="Create group">
                <Button
                  clicked={ () => {
                    if (authStatus === "LOGGED_OUT") {
                      return authFuncs.open()
                    }
                     funcs.open()
                    }}
                  classname="bg-gray3 text-xs sm:text-sm px-5 py-[0.75rem] xs:py-[0.7rem] mr-3 rounded-full flex items-center"
                >
                  <IoMdAdd />
                  <p className="ml-1 xs:ml-2">Create</p>
                </Button>
              </HoverCardComponent>
              <ProfileMenu />
            </div>
          </div>
        </nav>
        <div className="w-[95%] des:w-[90%] max-w-[1800px] mx-auto mt-6">
          <h1 className="text-3xl font-bold text-black1">Brainstorm</h1>
          <p className="text-gray1 text-sm">
            Start a brainstorm group or join existing groups
          </p>
          {!data ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 mt-16 gap-4 des:gap-10">
              <BrainstormGroups />
              <BrainstormGroups />
              <BrainstormGroups />
              <BrainstormGroups />
              <BrainstormGroups />
              <BrainstormGroups />
            </div>
          ) : (
            <BrainStorms open={funcs.open} data={data} />
          )}
        </div>
      </div>
    </>
  );
};

export default SetRoute(BrainstormsPage);
