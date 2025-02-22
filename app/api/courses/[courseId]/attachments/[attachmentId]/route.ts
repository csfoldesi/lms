import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(request: Request, { params }: { params: { courseId: string; attachmentId: string } }) {
  try {
    const { userId } = await auth();
    const { courseId, attachmentId } = await params;
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId: courseId,
        id: attachmentId,
      },
    });

    if (attachment) {
      const key = attachment.url.split("/").pop();
      const utapi = new UTApi();
      await utapi.deleteFiles(key!);
    }

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("ATTACHMEWNT_ID", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
