import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { images } = await request.json();
}
