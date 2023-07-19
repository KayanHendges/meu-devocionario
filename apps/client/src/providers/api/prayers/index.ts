import { api } from "@providers/api";
import { Prayer, ResponseList } from "api";

export const listPrayers = () => api.get<ResponseList<Prayer>>("prayers");
