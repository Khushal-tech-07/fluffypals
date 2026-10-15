import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBlobCreature } from '../blobCreature.js';
import { createGPUFurSystem, SHELL_COUNT, WEBGL_SHELL_COUNT } from '../furSystem.js';

interface FurViewer3DProps {
  baseColor: string;
  tipColor: string;
  interactive?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  cameraDistance?: number;
  height?: string;
  className?: string;
  onBoop?: () => void;
  showControlsBadge?: boolean;
  lightweight?: boolean;
}

export const FurViewer3D: React.FC<FurViewer3DProps> = ({
  baseColor,
  tipColor,
  interactive = true,
  autoRotate = true,
  autoRotateSpeed = 0.8,
  cameraDistance = 6.2,
  height = '100%',
  className = '',
  onBoop,
  showControlsBadge = false,
  lightweight = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const creatureRef = useRef<any>(null);
  const furSystemRef = useRef<any>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const [fpsAlert, setFpsAlert] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Update colors when props change without recreating the WebGL context
  useEffect(() => {
    if (furSystemRef.current && creatureRef.current) {
      furSystemRef.current.sharedUniforms.uBaseColor.value.set(baseColor);
      furSystemRef.current.sharedUniforms.uTipColor.value.set(tipColor);
      creatureRef.current.skinMaterial.color.set(baseColor).multiplyScalar(0.55);
    }
  }, [baseColor, tipColor]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDestroyed = false;
    let isVisible = true;

    // 1. Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !lightweight,
      alpha: true,
      powerPreference: lightweight ? 'default' : 'high-performance'
    });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth || 300, container.clientHeight || 300);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Scene & Camera
    const scene = new THREE.Scene();
    const aspect = (container.clientWidth || 300) / (container.clientHeight || 300);
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    camera.position.set(0, 0.35, cameraDistance);

    // 3. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = interactive;
    controls.enableRotate = interactive;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 10.0;
    controls.maxPolarAngle = Math.PI * 0.65;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.target.set(0, 0, 0);

    // 4. Lighting Rig
    const keyLight = new THREE.DirectionalLight('#fff7ed', 1.8);
    keyLight.position.set(2.4, 2.5, 2.8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#c4b5fd', 1.4);
    rimLight.position.set(-2.5, 2.0, -3.0);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight('#f5d0fe', '#1e1b4b', 0.9);
    scene.add(hemiLight);

    // Soft grounded shadow plane
    const shadowGeo = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.92;
    scene.add(shadowMesh);

    // 5. Creature & Fur
    const creature = createBlobCreature();
    creatureRef.current = creature;
    scene.add(creature.root);

    const initialShells = lightweight ? 16 : 32;
    const furSystem = createGPUFurSystem(creature.bodyGeometry, {
      furLength: 0.34,
      furDensity: lightweight ? 0.65 : 0.88,
      clumping: 0.38,
      curliness: 0.28,
      baseColor,
      tipColor,
      roughness: 0.52,
      specular: 0.72,
      lightIntensity: 1.35,
      rimIntensity: 1.25,
      windStrength: 0.75,
      gpuFurEnabled: false // Stable high-performance analytical fur
    });
    furSystemRef.current = furSystem;

    // Apply initial shell count
    if (furSystem.shellMesh.geometry) {
      furSystem.shellMesh.geometry.instanceCount = initialShells;
    }

    creature.root.add(furSystem.shellMesh);
    if (!lightweight) {
      creature.root.add(furSystem.strandMesh);
    }

    // 6. Interactive Raycasting & Petting
    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();
    let isPointerDown = false;
    let pointerMoveCount = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      pointerNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      pointerMoveCount++;
      if (pointerMoveCount % 2 === 0) {
        raycaster.setFromCamera(pointerNDC, camera);
        const hits = raycaster.intersectObject(creature.bodyMesh, false);
        if (hits.length > 0) {
          const localPoint = creature.root.worldToLocal(hits[0].point.clone());
          furSystem.sharedUniforms.uPointerLocalPos.value.copy(localPoint);
          furSystem.sharedUniforms.uPointerActive.value = 1.0;
        } else {
          furSystem.sharedUniforms.uPointerActive.value = 0.0;
        }
      }
    };

    const onPointerDown = () => {
      isPointerDown = true;
      setIsInteracting(true);
      controls.autoRotate = false;
    };

    const onPointerUp = () => {
      if (!isPointerDown) return;
      isPointerDown = false;
      setIsInteracting(false);
      controls.autoRotate = autoRotate;
      furSystem.sharedUniforms.uPointerActive.value = 0.0;
    };

    const onClick = () => {
      raycaster.setFromCamera(pointerNDC, camera);
      const hits = raycaster.intersectObject(creature.bodyMesh, false);
      if (hits.length > 0) {
        creature.triggerBoop();
        if (onBoop) onBoop();
      }
    };

    if (interactive) {
      const el = renderer.domElement;
      el.addEventListener('mousemove', onPointerMove, { passive: true });
      el.addEventListener('mousedown', onPointerDown);
      el.addEventListener('mouseup', onPointerUp);
      el.addEventListener('click', onClick);
      el.addEventListener('touchmove', onPointerMove, { passive: true });
      el.addEventListener('touchstart', onPointerDown, { passive: true });
      el.addEventListener('touchend', onPointerUp, { passive: true });
    }

    // 7. Auto FPS monitoring & mobile adaptive throttling
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let currentShellCount = initialShells;
    let lowFpsCount = 0;

    const clock = new THREE.Clock();

    // 8. Animation Loop
    const renderLoop = () => {
      if (isDestroyed) return;

      animFrameId.current = requestAnimationFrame(renderLoop);

      if (!isVisible) return; // Save GPU/battery when off-screen!

      const dt = clock.getDelta();
      furSystem.sharedUniforms.uTime.value += dt;

      // Update creature physics & gaze
      creature.update(dt, pointerNDC, camera.position as any, false);

      controls.update();
      renderer.render(scene, camera);

      // FPS tracking for auto-downgrading shell count on low-spec phones
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastFpsTime));
        frameCount = 0;
        lastFpsTime = now;

        if (fps < 32 && currentShellCount > 12) {
          lowFpsCount++;
          if (lowFpsCount >= 2) {
            currentShellCount = Math.max(10, currentShellCount - 8);
            if (furSystem.shellMesh.geometry) {
              furSystem.shellMesh.geometry.instanceCount = currentShellCount;
            }
            setFpsAlert(`Optimized for device (${currentShellCount} shells)`);
            lowFpsCount = 0;
          }
        } else if (fps >= 48) {
          lowFpsCount = 0;
        }
      }
    };

    renderLoop();

    // 9. Resize & Visibility Observers
    const handleResize = () => {
      if (!container || isDestroyed) return;
      const width = container.clientWidth || 300;
      const height = container.clientHeight || 300;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    intersectionObserver.observe(container);

    // 10. WebGL Context Loss Handler
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      setFpsAlert('WebGL context suspended. Tap to resume.');
    };

    const handleContextRestored = () => {
      setFpsAlert(null);
      renderLoop();
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('webglcontextlost', handleContextLost, false);
    domEl.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Clean disposal on unmount
    return () => {
      isDestroyed = true;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      if (interactive) {
        domEl.removeEventListener('mousemove', onPointerMove);
        domEl.removeEventListener('mousedown', onPointerDown);
        domEl.removeEventListener('mouseup', onPointerUp);
        domEl.removeEventListener('click', onClick);
        domEl.removeEventListener('touchmove', onPointerMove);
        domEl.removeEventListener('touchstart', onPointerDown);
        domEl.removeEventListener('touchend', onPointerUp);
      }

      domEl.removeEventListener('webglcontextlost', handleContextLost);
      domEl.removeEventListener('webglcontextrestored', handleContextRestored);

      controls.dispose();
      scene.clear();
      renderer.dispose();
      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
    };
  }, [cameraDistance, interactive, autoRotate, autoRotateSpeed, lightweight]);

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`} style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {showControlsBadge && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 flex items-center gap-2 pointer-events-none shadow-lg whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-pink-400"></span>
          <span>Drag to orbit · Comb fur · Click to boop</span>
        </div>
      )}

      {fpsAlert && (
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-950/70 backdrop-blur-sm border border-slate-700/50 text-[11px] text-slate-400 pointer-events-none">
          {fpsAlert}
        </div>
      )}
    </div>
  );
};
