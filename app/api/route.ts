import { type NextRequest } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("pagenum");

//   if (!pagenum) {
//     return new Response("Missing pagenum", { status: 400 });
//   }

//   const session = await auth();

//   if (!session || !session.user) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   const documents = await getDocumentsById({ id });

//   const [document] = documents;

//   if (!document) {
//     return new Response("Not Found", { status: 404 });
//   }

//   if (document.userId !== session.user.id) {
//     return new Response("Unauthorized", { status: 401 });
//   }

//   return Response.json(documents, { status: 200 });
// }

export function getPageId(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumRes = searchParams.get("pagenum");

  return pageNumRes;
  // const searchParams = request.nextUrl.searchParams
  // const query = searchParams.get('query')
  // query is "hello" for /api/search?query=hello
}
