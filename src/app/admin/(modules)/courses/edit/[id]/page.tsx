import { redirect } from "next/navigation";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  redirect(`/admin/courses/edit/${params?.id}/overview`);
};

export default Page;
