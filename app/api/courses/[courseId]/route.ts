import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const muxClient = new Mux({ tokenId: process.env.MUX_TOKEN_ID, tokenSecret: process.env.MUX_TOKEN_SECRET });

export async function DELETE(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const { courseId } = await params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        // TODO: Check if asset exists before deleting
        try {
          await muxClient.video.assets.delete(chapter.muxData.assetId);
        } catch (error) {
          console.log("MuxError", error);
        }
        //TODO: Delete video from Uploadthings
      }
    }

    //TODO: Delete image and attachemnts from Uploadthings

    const deletedCourse = await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[DELETE_COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await auth();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const { courseId } = await params;
    const values = await request.json();

    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
