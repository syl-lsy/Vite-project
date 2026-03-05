### server配置项默认的host就是localhost，为什么要有配置项
1.因为有时需要在局域网内访问，所以需要配置host，0.0.0.0或者true,表示可以所有ip地址都可以访问。有些时候会需要多设备进行测试

### vite.config.js配置
1.配置SCSS的css预编译器 使用@use代替@import并且需要跟as *，否则会报错,vue文件中的style标签当加上scoped时，:root会默认在当前文件
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/common.scss" as *;`
  }
    }
  }
})
```
2.配置别名
```js
import { defineConfig } from 'vite'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
```
3.配置全局变量
```js
export default defineConfig({
  define: {
    //读取package.json中的版本号
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
```

### vite.config.js配置代理
```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 依赖预构建
原因： 1.依赖文件过多，导致浏览器请求过多 2.依赖文件过大，导致浏览器请求过慢 3.某些模块还是CommonJS格式的，导致对ESModule模块的浏览器支持不友好
1.依赖预构建主要使用的是esbuild进行构建，esbuild是使用Go语言编写的，构建速度比使用JavaScript编写的打包器快很多，打包很多都是并行运行的，因为GO是多线程语言，可以并发运行程序。
2.esbuild所做的事有哪些
（1）将CommonJS模块转换为ESModule模块
（2）进行依赖预构建，将依赖的第三方模块进行打包，减少开发环境浏览器的请求次数。
（3）最小化和压缩，在构建阶段，代码的最小化和压缩也是esbuild所做的事情。
3.依赖预构建的缓存
(1)文件缓存 依赖预构建所依赖的缓存项会被缓存到/node_modules/.vite文件夹中，当依赖项发生改变时，会重新进行依赖预构建。
(2)浏览器缓存 会有强缓存max-age:31536000，当依赖项发生改变时，会更新max-age的值，浏览器会重新请求依赖项。
4.哪些情况依赖会重新预构建
（1）包管理器的锁文件，例如package-lock.json或者yarn.lock或者 pnpm-lock.yaml发生改变时，会重新进行依赖预构建。
（2）node_modules文件夹被删除时，会重新进行依赖预构建。
（3）补丁文件的修改时间发生变化时，会重新进行依赖预构建。
（3）NODE_ENV发生改变时，会重新进行依赖预构建。
（4）当vite.config.js中的配置文件发生变化时


### vite生产环境中的构建打包
1.使用rollup进行打包（动态打包已经丰富的插件系统）
```js
export default defineConfig({
  build: {
    target: ['es2015'],
    minify: 'terser', // js压缩工具
    cssMinify: 'esbuild', // 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
```

2.库模式
```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'), // 所要打包的入口文件
      name: 'MyLib',  // 库的名字
      fileName: (format) => `my-lib.${format}.js` // 打包后的文件名
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些全局变量注入代码
        globals: {
          vue: 'Vue' // vue库的全局变量名
        }
      }
    }
  }
})
// 最后需要在package.json中添加main和module字段
{
  name: 'my-lib',
  version: '1.0.0',
  main: 'dist/my-lib.umd.js', // CommonJS模块
  module: 'dist/my-lib.es.js',// ESModule模块
  files: [
    'dist'
  ],
  exports: {
    '.': {
      'import': './dist/my-lib.es.js',
      'require': './dist/my-lib.umd.js'
    }
  },
  scripts: {
    'build': 'vite build'
  }
}
```


### .env文件和vite使用
1.import.meta.env.MODE
2.import.meta.env.DEV
3.import.meta.env.PROD
4.import.meta.env.SSR
import.meta.env这个命令只对VITE开头的变量可以获取

### CLI Command Line Interface 命令行接口
