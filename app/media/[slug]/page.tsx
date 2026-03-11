import { MEDIA_PROJECTS } from "@/data/mediaProjects"
import { notFound } from "next/navigation"
import MediaProjectClient from "./project-client"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const project = MEDIA_PROJECTS.find(
    (p) => p.slug === slug
  )

  if (!project) return notFound()

  return <MediaProjectClient project={project} />
}
