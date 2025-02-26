export interface CourseIdParams {
  params: Promise<{
    courseId: string;
  }>;
}

export interface ChapterIdParams {
  params: Promise<{
    chapterId: string;
  }>;
}

export interface AttachemntsIdParams {
  params: Promise<{
    attachmentId: string;
  }>;
}
