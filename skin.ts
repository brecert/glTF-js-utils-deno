import { Node } from "./node.ts";

export class Skin {
  public name = "";
  public skeletonNode: Node | null;

  constructor(skeletonNode: Node | null = null, name = "") {
    this.skeletonNode = skeletonNode;
    this.name = name;
  }
}
