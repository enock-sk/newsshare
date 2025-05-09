import { NextRequest, NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import connectToDatabase from "../../../lib/mongodb";
import News from "../../../models/News";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const form = new formidable.IncomingForm({
    uploadDir: path.join(process.cwd(), "public/uploads"),
    keepExtensions: true,
  });

  return new Promise((resolve) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        resolve(
          NextResponse.json(
            { error: "Error parsing form data" },
            { status: 500 }
          )
        );
        return;
      }

      const { title, content, author } = fields;
      const image = files.image as formidable.File;

      if (!title || !content || !author) {
        resolve(
          NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
          )
        );
        return;
      }

      let imageUrl: string | undefined;
      if (image) {
        imageUrl = `/uploads/${path.basename(image.filepath)}`;
      }

      try {
        const news = new News({
          title: title as string,
          content: content as string,
          author: author as string,
          imageUrl,
          status: "pending",
        });

        await news.save();
        resolve(NextResponse.json(news));
      } catch (error) {
        resolve(
          NextResponse.json({ error: "Failed to save news" }, { status: 500 })
        );
      }
    });
  });
}

export async function GET() {
  await connectToDatabase();

  try {
    const news = await News.find().sort({ createdAt: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetchži news" },
      { status: 500 }
    );
  }
}
