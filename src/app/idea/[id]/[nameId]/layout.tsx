import React, { ReactNode } from "react";
import { Metadata } from "next";
import axios from "axios";

type Props = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const idea = await axios.get(
    `https://api.ideasafrica.org/api/users/ideas/${params.id}`
  );
  if (!idea) {
    return {
      title: "Idea post not found",
    };
  }
  return {
    title: idea.data.idea.headline,
    openGraph: {
      title: idea.data.idea.headline,
      images: `${idea.data.thumbs[0].path}`,
    },
  };
}

export default function RootLayout({ children }: Props) {
  return <div className="">{children}</div>;
}
