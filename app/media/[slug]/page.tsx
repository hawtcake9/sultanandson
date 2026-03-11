import { MEDIA_PROJECTS } from "@/data/mediaProjects"
import { notFound } from "next/navigation"
import MediaProjectClient from "./project-client"

export default function Page({ params }: { params: { slug: string } }) {

  const project = MEDIA_PROJECTS.find(
    (p) => p.slug === params.slug
  )

  if (!project) return notFound()

  return <MediaProjectClient project={project} />
}
