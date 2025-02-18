import { db } from "@/lib/db";

export const GetProgress = async (userId: string, courseId: string): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const prograssPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return prograssPercentage;
  } catch (error) {
    console.error("GET_PROGRESS", error);
    return 0;
  }
};
