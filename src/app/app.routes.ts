import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Questionario } from "./pages/questionario/questionario";
import { Relatorio } from "./pages/relatorio/relatorio";

export const routes: Routes = [
  { path: "", component: Home },
  { path: "questionario", component: Questionario },
  { path: "relatorio", component: Relatorio },
  { path: "**", redirectTo: "" },
];
