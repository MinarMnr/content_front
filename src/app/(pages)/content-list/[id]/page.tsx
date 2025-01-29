import React from 'react'

const page = async (props: {params: Promise<{id: string}>}) => {
  const params = await props.params;
  return (
    <div>
      Showing data of Content {params?.id}
    </div>
  )
}

export default page