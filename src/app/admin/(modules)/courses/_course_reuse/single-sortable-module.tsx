import { SortableItem } from "./SortableItem";
export const SingleSortableModuleBody = ({
  contents,
  course_id,
  module_id,
  controls = true,
}: {
  contents: any[];
  course_id: string;
  module_id: string;
  controls?: boolean;
}) => {
  return (
    <ul className="w-full ladder-list">
      {contents?.map((tada: any, index: number) => (
        <SortableItem
          key={tada.id}
          content={tada}
          course_id={course_id}
          module_id={module_id}
          controls={controls}
          content_id={`${index}`}
        ></SortableItem>
      ))}
    </ul>
  );
};
