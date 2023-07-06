import { NextResponse } from "next/server";
import connect from "../../../utils/db";
import Image from "../../../models/Image";

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    const file = await Image.findById(id);
    return new NextResponse(JSON.stringify(file), { status: 201 });
  } catch (error) {
    return new NextResponse("File not found", { status: 401 });
  }
};
