import "styled-components";
import { designSystem } from "./src/styles/designSystem";

export type DesignSystemType = typeof designSystem;

declare module "styled-components" {
  export interface DefaultTheme extends DesignSystemType {}
}
