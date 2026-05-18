import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permite acesso apenas à página de encerramento e arquivos estáticos
  if (
    pathname === "/encerramento" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // arquivos estáticos (favicon, imagens, etc.)
  ) {
    return NextResponse.next()
  }

  // Redireciona todas as outras rotas para a página de encerramento
  return NextResponse.redirect(new URL("/encerramento", request.url))
}

export const config = {
  matcher: [

    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
