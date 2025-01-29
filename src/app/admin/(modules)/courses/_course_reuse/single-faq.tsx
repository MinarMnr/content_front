import DynamicHeroIcon from "@/app/_components/DynamicHeroIcon";
import Link from "next/link";
import PublishUn from "./publish-un";

export const SingleFaqHeader = ({
  data,
  courseId,
  controls = true,
}: {
  data: any;
  courseId: string;
  controls?: boolean;
}) => {
  return (
    <div className="bg-green-custom text-white font-medium text-xl px-4 py-3 border border-gray-500 flex">
      <div
        className="flex-grow"
        dangerouslySetInnerHTML={{ __html: data?.question ?? "" }}
      />
      {!!controls ? (
        <div className="w-auto flex gap-x-1">
          <PublishUn data={data} url={`${courseId}/faqs/${data?.id}`} />
          <Link
            className="p-1 bg-white rounded-md"
            href={`/admin/courses/edit/${courseId}/faqs?edit_modal_id=${data?.id}`}
          >
            <DynamicHeroIcon
              s_icon="PencilIcon"
              className="size-5 text-emerald-700"
            />
          </Link>
          <Link
            className="p-1 bg-white rounded-md"
            href={`/admin/courses/edit/${courseId}/faqs?delete_modal_id=${data?.id}`}
          >
            <DynamicHeroIcon
              s_icon="TrashIcon"
              className="size-5 text-red-700"
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export const SingleFaqBody = ({
  data,
  length,
  index,
}: {
  data: any;
  length: number;
  index: number;
}) => {
  return (
    <div
      className={`remove-all w-full px-8 py-4 border-x border-[#6DC067] ${
        length - 1 === index ? "border-b" : ""
      }`}
      dangerouslySetInnerHTML={{
        __html: data?.answer,
      }}
    />
  );
};
