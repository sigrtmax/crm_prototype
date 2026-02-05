import { NextResponse } from "next/server"

import { getProjectSummaries } from "@/data/mockProjects"

export function GET() {
  return NextResponse.json({
    projects: getProjectSummaries(),
    generatedAt: new Date().toISOString(),
  })
}
