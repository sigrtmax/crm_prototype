import { NextResponse } from "next/server"

import { findProject } from "@/data/mockProjects"

type ProjectRouteContext = {
  params: Promise<{
    projectId: string
  }>
}

export async function GET(_request: Request, { params }: ProjectRouteContext) {
  const { projectId } = await params
  const project = findProject(projectId)

  if (!project) {
    return NextResponse.json(
      { message: "Проект не найден" },
      { status: 404 },
    )
  }

  return NextResponse.json({
    project,
    generatedAt: new Date().toISOString(),
  })
}
