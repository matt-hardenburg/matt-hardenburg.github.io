// appState bridge between controller and React
type ModelSetter = (model: any) => void;
type PageSetter = (pageKey: string) => void;

let modelSetter: ModelSetter | null = null;
let pageSetter: PageSetter | null = null;
let pendingModel: any | null = null;
let pendingPage: string | null = null;

let readyResolve: (() => void) | null = null;
const readyPromise = new Promise<void>((res) => { readyResolve = res });

export function registerModelSetter(fn: ModelSetter): void {
  modelSetter = fn;
  if (pendingModel) { modelSetter(pendingModel); pendingModel = null; }
  if (readyResolve) readyResolve();
}

export function registerPageSetter(fn: PageSetter): void {
  pageSetter = fn;
  if (pendingPage) { pageSetter(pendingPage); pendingPage = null; }
  if (readyResolve) readyResolve();
}

export async function waitUntilReady(): Promise<void> { await readyPromise }

export function setModel(model: any): void {
  if (modelSetter) modelSetter(model);
  else pendingModel = model;
}

export function setPage(pageKey: string): void {
  if (pageSetter) pageSetter(pageKey);
  else pendingPage = pageKey;
}
