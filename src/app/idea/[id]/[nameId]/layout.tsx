import React, { ReactNode } from "react";
import { Metadata } from "next";
import axios from "axios";

type Props = {
  children: ReactNode;
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  openGraph: {
    title: "sjsj",
    images:
      "https://ideas-for-africa-deploy.vercel.app/api/og?image=https://ideaafricabucket.s3.eu-north-1.amazonaws.com/1724208567753-75589356-AAAABeLOP2XHAUHr9G2NUNFSiOjQiontLUh2PMu2bdFu3Qf-SA5G_CKYDMGv_c1kavKLhqlS6xSrA0SCM5zOvQ8YUtABF8DzU1C8WrMd.jpg",
  },
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const idea = await axios.get(
//     `https://api.ideasafrica.org/api/users/ideas/${params.id}`
//   );
//   if (!idea) {
//     return {
//       title: "Idea post not found",
//     };
//   }
//   return {
//     openGraph: {
//       title: idea.data.idea.headline,
//       images: `https://ideas-for-africa-deploy.vercel.app/api/og?image=${idea.data.thumbs[0].path}`,
//     },
//   };
// }

//https://api.ideasafrica.org/api/users/ideas/b02aa963-9c15-49c5-b9d6-a890422df3aa

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
