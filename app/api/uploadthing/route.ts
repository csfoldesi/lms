import { createRouteHandler } from "uploadthing/next";

import { outFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: outFileRouter,
});
