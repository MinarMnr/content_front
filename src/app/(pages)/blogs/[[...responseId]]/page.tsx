import React from 'react'

const Conversation = async (
  props: {params: Promise<{
    responseId: string[]
  }>}
) => {
  const params = await props.params;
  return (
    <div>Conversation has {params?.responseId?.length} roots</div>
  )
}

export default Conversation