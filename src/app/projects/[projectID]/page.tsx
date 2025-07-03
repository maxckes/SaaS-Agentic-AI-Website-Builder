interface Props{
    params: Promise<{projectID:string}>
}

const page = async ({params}:Props) => {
    const {projectID} = await params
  return (
    <div>
      <h1>Project {projectID}</h1>
    </div>
  )
}

export default page