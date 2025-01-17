import {
  degreesToRadians,
  Matrix4x4,
  Quaternion,
  toQuaternion,
  Vector3,
} from "./math.ts";
import { Mesh } from "./mesh.ts";
import { Animation } from "./animation.ts";
import { Skin } from "./skin.ts";

export class Node {
  public name = "";
  public mesh?: Mesh;
  public animations: Animation[] = [];
  public skin?: Skin;
  public inverseBindMatrix?: Matrix4x4;

  private _nodes: Node[] = [];
  private _translation?: Vector3;
  private _rotation?: Quaternion;
  private _scale?: Vector3;

  constructor(name = "") {
    this.name = name;
  }

  public addNode(node: Node): void {
    if (this._nodes.indexOf(node) >= 0) {
      return;
    }
    // throw new Error("Node passed to addNode was added prior.");

    this._nodes.push(node);
  }

  public removeNode(node: Node | number): number {
    const idx = node instanceof Node ? this._nodes.indexOf(node) : node;
    if (idx >= 0 && idx < this._nodes.length) {
      this._nodes.splice(idx, 1);
    }
    return idx;
  }

  public forEachNode(fn: (node: Node) => void): void {
    this._nodes.forEach(fn);
  }

  public addAnimation(animation: Animation): void {
    this.animations.push(animation);
  }

  public removeAnimation(animation: Animation | number): number {
    const idx = animation instanceof Animation
      ? this.animations.indexOf(animation)
      : animation;
    if (idx >= 0 && idx < this.animations.length) {
      this.animations.splice(idx, 1);
    }
    return idx;
  }

  public setTranslation(x: number, y: number, z: number): void {
    this._translation = new Vector3(x, y, z);
  }

  public getTranslation(): Vector3 {
    return this._translation || new Vector3(0, 0, 0);
  }

  public setRotationDegrees(x: number, y: number, z: number): void {
    this.setRotationRadians(
      degreesToRadians(x),
      degreesToRadians(y),
      degreesToRadians(z),
    );
  }

  public setRotationRadians(x: number, y: number, z: number): void {
    this._rotation = toQuaternion(x, y, z);
  }

  public setRotationQuaternion(
    x: number,
    y: number,
    z: number,
    w: number,
  ): void {
    this._rotation = new Quaternion(x, y, z, w);
  }

  public getRotationQuaternion(): Quaternion {
    return this._rotation || new Quaternion(0, 0, 0, 1);
  }

  public setScale(x: number, y: number, z: number): void {
    this._scale = new Vector3(x, y, z);
  }

  public getScale(): Vector3 {
    return this._scale || new Vector3(1, 1, 1);
  }
}
