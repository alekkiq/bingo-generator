import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 mb
const ALLOWED_EXTENSIONS = new Set(["png", "jpg", "jpeg", "webp", "svg"]);
const UPLOAD_DIR = "public/uploads";

const getExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() ?? "";
};

const isAllowedFile = (filename: string): boolean => {
  return ALLOWED_EXTENSIONS.has(getExtension(filename));
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: "Empty file" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 413 });
  }

  const ext = getExtension(file.name);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: "File type not allowed" },
      { status: 400 }
    );
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const safeName = file.name.replace(/[^a-z0-9.\-_]/gi, "_");
  const uniqueName = `${Date.now()}_${crypto.randomUUID()}_${safeName}`;
  const filePath = path.join(UPLOAD_DIR, uniqueName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return NextResponse.json(
    {
      url: `/uploads/${uniqueName}`,
    },
    { status: 201 }
  );
};
