import { Application } from "https://deno.land/x/oak/mod.ts";
import * as Demo from "https://git.n.xiaomi.com/maqun1/bff-test/-/raw/master/test1.ts";

const app = new Application();

console.log(Demo);

app.use((ctx) => {
  ctx.response.body = "Hello World 2 !";
});

await app.listen({ port: 8141 });