export default (file: any) => require('@/views/' + file).default
// ts everyfile is a module ,shouldn't declare module.export
// you can modifly ths settings in tsconfig.json
