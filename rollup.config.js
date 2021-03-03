import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import preprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			hydratable: true,
			// compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				css: css => {
					css.write('public/build/bundle.css')
				}
			// },
			// preprocess: preprocess()
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

// import svelte from "rollup-plugin-svelte";
// import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs";
// import livereload from "rollup-plugin-livereload";
// import { terser } from "rollup-plugin-terser";

// const isDev = Boolean(process.env.ROLLUP_WATCH);

// export default [
//   // Browser bundle
//   {
//     input: "src/main.js",
//     output: {
//       sourcemap: true,
//       format: "iife",
//       name: "app",
//       file: "public/bundle.js"
//     },
//     plugins: [
//       svelte({
//         compilerOptions: {
//           hydratable: true,
//           css: css => {
//             css.write("public/bundle.css");
//           }
//         }
//       }),
//       resolve({
// 			browser: true,
// 			dedupe: ['svelte']
// 			}),
//       commonjs(),
//       // App.js will be built after bundle.js, so we only need to watch that.
//       // By setting a small delay the Node server has a chance to restart before reloading.
//       isDev &&
//         livereload({
//           watch: "public/App.js",
//           delay: 200
//         }),
//       !isDev && terser()
//     ]
//   },
//   // Server bundle
//   {
//     input: "src/App.svelte",
//     output: {
//       sourcemap: false,
//       format: "cjs",
//       name: "app",
//       file: "public/App.js"
//     },
//     plugins: [
//       svelte({
//         compilerOptions: {
//           generate: "ssr"
//         }
//       }),
//       resolve(),
//       commonjs(),
//       !isDev && terser()
//     ]
//   }
// ];
