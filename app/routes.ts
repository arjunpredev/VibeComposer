import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("./routes/_index.tsx"),
  route("api/chats", "./routes/api.chats.tsx"),
  route("api/chat/message", "./routes/api.chat.message.tsx"),
];

export default routes;
