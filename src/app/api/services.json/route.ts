import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      name: "Hårklipp",
      duration: "20 min",
      price: "600 kr",
      image: "/images/haircut.jpg",
    },
    {
      id: 2,
      name: "Hårklipp & skjegg",
      duration: "25 min",
      price: "700 kr",
      image: "/images/haircut-beard.jpg",
    },
    {
      id: 3,
      name: "Bego deluxe",
      duration: "1 hr",
      price: "1500 kr",
      image: "/images/deluxe.jpg",
    },
  ]);
}
