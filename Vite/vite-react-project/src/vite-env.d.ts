declare interface EnvConfig {
  VITE_APP_TITLE: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_DROP_CONSOLE: boolean;
}
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};
declare interface ImportMetaEnv extends MyReadonly<EnvConfig> {}
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
