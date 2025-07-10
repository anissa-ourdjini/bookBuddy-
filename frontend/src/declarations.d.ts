declare module '*.jsx' {
  const value: any;
  export default value;
}
declare module '*.js' {
  const value: any;
  export default value;
}

declare module "*.jsx" {
  import React from "react";
  const component: React.FC<any>;
  export default component;
} 