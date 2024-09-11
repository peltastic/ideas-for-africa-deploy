import { ImageResponse } from "next/og";
import type { NextApiRequest, NextApiResponse } from "next";
export async function GET(req: Request, res: Response) {
  try {
    const { searchParams } = new URL(req.url);
    const image = searchParams.get("image")
    console.log(image)
    if (!image) {
      return new ImageResponse(<h1>Could not generate thubmnail</h1>);
    }
    return new ImageResponse(<img src={image as string} alt="og" />);
  } catch (e: any) {
    console.log(e);
    return new Response("Failed to generate OG Image", {
      status: 500,
    });
  }
}
