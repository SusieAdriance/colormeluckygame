import { useEffect, useRef } from "react";
import {
  ArcRotateCamera,
  Color3,
  Color4,
  Engine,
  GlowLayer,
  HemisphericLight,
  MeshBuilder,
  Scene,
  StandardMaterial,
  TransformNode,
  Vector3,
} from "@babylonjs/core";

/** A low-poly 3D signal wheel that keeps the broadcast-game atmosphere visual, not engine-heavy. */
export function LiveStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: true }, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.025, 0.04, 0.11, 0);
    const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.3, 8, Vector3.Zero(), scene);
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 8;
    camera.inputs.clear();
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.72;
    const glow = new GlowLayer("glow", scene);
    glow.intensity = 0.34;
    const root = new TransformNode("signal-wheel", scene);
    const colors = ["#e5463e", "#2d66b9", "#5ba75a", "#ffcf42"];
    colors.forEach((hex, index) => {
      const angle = index * Math.PI / 2 + Math.PI / 4;
      const orb = MeshBuilder.CreateSphere(`orb-${index}`, { diameter: 1.18, segments: 14 }, scene);
      orb.position = new Vector3(Math.cos(angle) * 2.6, Math.sin(angle) * 1.25, 0);
      orb.parent = root;
      const material = new StandardMaterial(`material-${index}`, scene);
      material.diffuseColor = Color3.FromHexString(hex);
      material.emissiveColor = Color3.FromHexString(hex).scale(0.26);
      material.specularColor = Color3.White().scale(0.35);
      orb.material = material;
    });
    const core = MeshBuilder.CreatePolyhedron("core", { type: 1, size: 1.15 }, scene);
    core.parent = root;
    const coreMaterial = new StandardMaterial("core-material", scene);
    coreMaterial.diffuseColor = Color3.FromHexString("#f1c85b");
    coreMaterial.emissiveColor = Color3.FromHexString("#b99021").scale(0.38);
    core.material = coreMaterial;
    const ring = MeshBuilder.CreateTorus("ring", { diameter: 5.6, thickness: 0.06, tessellation: 64 }, scene);
    ring.parent = root;
    ring.rotation.x = Math.PI / 2.4;
    const ringMaterial = new StandardMaterial("ring-material", scene);
    ringMaterial.emissiveColor = Color3.FromHexString("#f1c85b").scale(0.3);
    ring.material = ringMaterial;
    scene.onBeforeRenderObservable.add(() => {
      root.rotation.z += 0.0021;
      root.rotation.y += 0.0011;
    });
    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    engine.runRenderLoop(() => scene.render());
    return () => {
      window.removeEventListener("resize", resize);
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="live-stage" aria-hidden="true" />;
}
