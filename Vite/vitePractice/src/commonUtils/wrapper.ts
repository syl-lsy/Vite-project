type Recordable<T = any> = Record<string, T>;
/**
 * @description: 包装环境变量
 * @param envConfig
 */
export function wrapperEnv(envConfig: Recordable): EnvConfig {
  const ret: any = {};
  for (const envName of Object.keys(envConfig)) {
    // console.log(envName);
    // 打印出有换行符
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    ret[envName] = realName;
  }
  return ret;
}
