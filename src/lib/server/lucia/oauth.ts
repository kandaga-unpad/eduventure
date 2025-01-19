import { Google } from "arctic";
import { PRIVATE_GOOGLE_CLIENTID, PRIVATE_GOOGLE_SECRET } from "$env/static/private";

export const google = new Google(PRIVATE_GOOGLE_CLIENTID, PRIVATE_GOOGLE_SECRET, "http://localhost:5173/login/google/callback");