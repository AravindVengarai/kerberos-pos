// making a type declaration for media assets that end with .svg to use throughout the typescript app

declare module '*.svg' {
  const content: string;
  export default content;
}
