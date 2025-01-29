// SortableItem component (SortableItem.tsx)
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SingleModuleHeader } from "./single-module";
import SingleContent from "./single-content";
import { DragOverlay } from "@dnd-kit/core";

export function SortableContainer({ content, courseId }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: content.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <SingleModuleHeader module={content} courseId={courseId} />
    </div>
  );
}

export function SortableItem({
  content,
  course_id,
  module_id,
  controls,
  content_id,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: content.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      //className="bg-white p-2 rounded shadow cursor-pointer hover:bg-gray-100"
    >
      <SingleContent
        key={content_id}
        data={content}
        course_id={course_id}
        module_id={module_id}
        controls={controls}
        content_id={`${content_id}`}
      />
    </div>
  );
}
