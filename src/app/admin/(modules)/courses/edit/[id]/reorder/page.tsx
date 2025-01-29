"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useParams } from "next/navigation";
import { post, show, update } from "@/app/_services/api-call";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { revalidated } from "@/app/actions";

function MultipleContainers() {
  const router = useRouter();
  const [containers, setContainers] = useState<any>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const params = useParams();
  let courseId = params?.id;
  const getModules = () => {
    show({ api_key: "ADMIN_COURSE_API", addon: `${courseId}/modules` })
      .then(async (resp: any) => {
        setContainers(resp.data);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    getModules();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const activeContainerIndex = containers.findIndex(
        (container: any) => container.id == active.id
      );
      const overContainerIndex = containers.findIndex(
        (container: any) => container.id == over.id
      );

      if (activeContainerIndex !== -1 && overContainerIndex !== -1) {
        setContainers((prev: any) =>
          arrayMove(prev, activeContainerIndex, overContainerIndex)
        );
      } else {
        const sourceModule = containers.find(
          (module: { module_contents: any[] }) => {
            return module.module_contents.some(
              (content) => content.id == active.id
            );
          }
        );
        const destinationModule = containers.find(
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

          setContainers(
            containers.map((module: any) =>
              module.id == sourceModule.id
                ? { ...module, module_contents: updatedContents }
                : module
            )
          );
        }
      }
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold m-2 text-center">
        REORDER MODULE AND CONTENT
      </h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        //onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={containers.map((container: any) => container.id)}
          strategy={rectSortingStrategy}
        >
          <div className="flex gap-4 p-4">
            {containers.map((item: any) => (
              <SortableContainer
                key={item.id}
                id={item.id}
                title={item.title}
                items={item.module_contents}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="text-center">
        <button
          className="w-1/3 bg-emerald-600 text-white py-2 rounded-lg"
          onClick={() => {
            update({
              api_key: "ADMIN_COURSE_API",
              body: { modules: containers },
              addon: `${courseId}/organize-order`,
            }).then((resp: any) => {
              if (resp?.status === "success") {
                toast.success(resp?.message);

                revalidated(`/admin/courses/edit/${courseId}/contents`);
                router.push(`/admin/courses/edit/${courseId}/contents`);
              } else {
                toast.error(resp?.error);
              }
            });
          }}
        >
          Reorder
        </button>
      </div>
    </>
  );
}

const SortableContainer = ({ id, title, items }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-64 bg-gray-200 rounded-lg shadow-lg p-4 cursor-move"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <SortableContext key={id} items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "200px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* {items.map((content: any) => (
            <SortableItem key={content.id} content={content} />
          ))} */}
        </div>
      </SortableContext>
    </div>
  );
};

export default MultipleContainers;
