"use client";

import { Button } from "@/components/ui/button";
import { fromatPrice } from "@/lib/format";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  return <Button className="w-full md:w-auto">Enroll in for {fromatPrice(price)}</Button>;
};
