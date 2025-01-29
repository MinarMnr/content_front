"use client";

import React, { useEffect, useState } from "react";

import { show, update } from "@/app/_services/api-call";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  SortableContainer,
  SortableItem,
} from "../../../_course_reuse/SortableItem";
import { revalidated } from "@/app/actions";
import { toast } from "react-toastify";
import { SingleSortableModuleBody } from "../../../_course_reuse/single-sortable-module";
import { useSearchParams } from "next/navigation";
import { SingleModuleHeader } from "../../../_course_reuse/single-module";
import SingleContent from "../../../_course_reuse/single-content";

const AllContents = ({
  // content_list,
  courseId,
}: {
  // content_list: any[];
  courseId: string;
}) => {
  const [content_list, setContent] = useState<any[]>([]);
  const searchParams = useSearchParams();

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   })
  // );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  useEffect(() => {
    show({
      api_key: "ADMIN_COURSE_API",
      addon: `${courseId}/modules`,
      parameters: {
        page: 1,
        size: -1,
      },
    })?.then((resp: any) => {
      setContent(resp?.data);
    });
  }, [searchParams.size]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    setActiveId(null);
    if (active.id !== over.id) {
      const activeContainerIndex = content_list.findIndex(
        (container: any) => container.id == active.id
      );
      const overContainerIndex = content_list.findIndex(
        (container: any) => container.id == over.id
      );

      if (activeContainerIndex !== -1 && overContainerIndex !== -1) {
        setContent((prev: any) =>
          arrayMove(prev, activeContainerIndex, overContainerIndex)
        );
        let sortedContent = arrayMove(
          content_list,
          activeContainerIndex,
          overContainerIndex
        );

        updatedOrder(sortedContent);
      } else {
        const sourceModule = content_list.find(
          (module: { module_contents: any[] }) => {
            return module.module_contents.some(
              (content) => content.id == active.id
            );
          }
        );
        const destinationModule = content_list.find(
          (module: { module_contents: any[] }) =>
            module.module_contents.some((content) => content.id == over.id)
        );

        if (!sourceModule || !destinationModule) return;

        if (sourceModule.id == destinationModule.id) {
          // Reorder within the same module
          const updatedContents = arrayMove(
            sourceModule.module_contents,
            sourceModule.module_contents.findIndex(
              (content: any) => content.id == active.id
            ),
            sourceModule.module_contents.findIndex(
              (content: any) => content.id == over.id
            )
          );

          setContent(
            content_list.map((module: any) =>
              module.id == sourceModule.id
                ? { ...module, module_contents: updatedContents }
                : module
            )
          );

          updatedOrder(
            content_list.map((module: any) =>
              module.id == sourceModule.id
                ? { ...module, module_contents: updatedContents }
                : module
            )
          );
        }
      }
    }
  }

  const updatedOrder = (sortedContent: any) => {
    // return;
    update({
      api_key: "ADMIN_COURSE_API",
      body: { modules: sortedContent },
      addon: `${courseId}/organize-order`,
    }).then((resp: any) => {
      if (resp?.status === "success") {
        //toast.success(resp?.message);
        revalidated(`/admin/courses/edit/${courseId}/contents`);
        // router.push(`/admin/courses/edit/${courseId}/contents`);
      } else {
        toast.error(resp?.error);
      }
    });
  };
  return (
    <div className="pt-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={
            content_list.length > 0
              ? content_list.map((container: any) => container.id)
              : []
          }
          strategy={rectSortingStrategy}
        >
          {content_list.length > 0 &&
            content_list?.map((tada: any, tada_i: number) => (
              <div key={`all-content-${tada_i}`}>
                <div>
                  <SortableContainer
                    key={tada.id}
                    content={tada}
                    courseId={courseId}
                  ></SortableContainer>
                </div>

                <div
                  className={`w-full px-8 py-4 border-x ${
                    content_list?.length - 1 === tada_i ? "border-b" : ""
                  }`}
                >
                  <SortableContext
                    key={tada_i}
                    items={tada?.module_contents}
                    strategy={rectSortingStrategy}
                  >
                    <SingleSortableModuleBody
                      contents={tada?.module_contents}
                      course_id={courseId}
                      module_id={tada?.id}
                    />
                  </SortableContext>
                </div>
              </div>
            ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="p-4 bg-gray-100 border rounded shadow"></div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default AllContents;
