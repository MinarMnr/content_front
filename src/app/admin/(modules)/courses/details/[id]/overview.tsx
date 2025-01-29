import React from "react";

const Overview = async ({ data }: { data: any }) => {
  return (
    <>
      <div className="w-full text-3xl font-semibold mb-6">Course Overview</div>
      <div className="w-full">
        <div className="remove-all" dangerouslySetInnerHTML={{ __html: data?.description ?? "" }} />
        <div className="remove-all" dangerouslySetInnerHTML={{ __html: data?.specification ?? "" }} />
        <div className="remove-all" dangerouslySetInnerHTML={{ __html: data?.requirement ?? "" }} />
      </div>
    </>
  );
};

export default Overview;
