# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list




# HOW_TO_CONFIGURE_FRONT_END_APPLICATION

# React + TypeScript + Vite

-Front-End of Childcare Facility Application is Develop using React.js with Typescript and Vite is a local development server.

-Please ensure that the system must have node.js, This app is develop in node v20.11.1 because its requires for the npm (Node package manager).   

-To confirm the node version, Please run below given command

node --version

After ensurinn the node version, Please follow the below given steps.

STEP-1:
 
Open the child-facilities-finder-system in your terminal of any compiler (VS Code) or command prompt. Install all project dependencies.

npm install


STEP-2:

To run develop mode, Run command given below.

npm run dev

This cammand will serve the project to  http://localhost:5173/ and start the vite serve

STEP-3:

TO serve your application to your network, Please run below given command

npm run dev -- --host

This cammand will serve the project to IP-Address  http://IP-Address:5173/ and start the vite serve


These are the shortcut that's helps alot for performing different tasks while react app is running

  press r + enter to restart the server
  press u + enter to show server url
  press o + enter to open in browser
  press c + enter to clear console
  press q + enter to quit


That's all in development mode

BEST Regards 
Enjoy Using Application
Cheers 


