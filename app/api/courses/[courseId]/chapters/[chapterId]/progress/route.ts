import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ courseId: string; chapterId: string }> }) {
  try {
    const { userId } = await auth();
    const { chapterId } = await params;
    const { isCompleted } = await request.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const userProgress = await db.userProgress.upsert({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
      create: {
        userId,
        chapterId,
        isCompleted,
      },
      update: {
        isCompleted,
      },
    });

    return NextResponse.json({ userProgress });
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
