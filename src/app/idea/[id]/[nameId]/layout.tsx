import { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "dhsdhdsh",
    images:
      "https://ideaafricabucket.s3.eu-north-1.amazonaws.com/1723921467403-857326772-20240730_152544.jpg",
    description: "shshshshj",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">\{children}</body>
    </html>
  );
}
