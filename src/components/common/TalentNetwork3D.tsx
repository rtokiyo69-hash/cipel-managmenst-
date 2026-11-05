import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Compass, RotateCw, Eye, EyeOff } from 'lucide-react';

interface TalentNetwork3DProps {
  interactive?: boolean;
  className?: string;
  height?: string;
}

export const TalentNetwork3D: React.FC<TalentNetwork3DProps> = ({
  height = '500px',
  className = '',
  interactive = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hudCollapsed, setHudCollapsed] = useState(false);
  const [activePreset, setActivePreset] = useState<'overview' | 'dossier' | 'network'>('overview');
  const [isRotating, setIsRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isRotatingRef = useRef(true);
  const targetCamPos = useRef(new THREE.Vector3(0, 3.5, 9));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0b1120, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 3.8, 9.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, heightPx);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xe2e8f0, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4f46e5, 2.2); // Electric Indigo rim
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x06b6d4, 1.8, 15); // Cyan fill
    fillLight.position.set(0, 2, 3);
    scene.add(fillLight);

    // Procedural Card Canvas Texture in Modern Obsidian-Indigo
    const createDossierTexture = (name: string, role: string, score: string, skills: string[]) => {
      const cv = document.createElement('canvas');
      cv.width = 512;
      cv.height = 360;
      const ctx = cv.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(cv);

      // Deep Obsidian card background
      ctx.fillStyle = '#0B1120';
      ctx.beginPath();
      ctx.roundRect(0, 0, 512, 360, 24);
      ctx.fill();

      // Border gradient
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#4F46E5';
      ctx.stroke();

      // Header Banner
      ctx.fillStyle = '#16223B';
      ctx.beginPath();
      ctx.roundRect(16, 16, 480, 70, 16);
      ctx.fill();

      // Match Score Ring
      ctx.fillStyle = '#06B6D4';
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(score, 38, 60);

      ctx.fillStyle = '#818CF8';
      ctx.font = 'bold 16px "DM Sans", sans-serif';
      ctx.fillText('MATCH INDEX', 90, 58);

      // Name & Role
      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(name, 28, 130);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '18px "DM Sans", sans-serif';
      ctx.fillText(role, 28, 165);

      // Skill Badges
      let x = 28;
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      skills.forEach((sk) => {
        const textWidth = ctx.measureText(sk).width;
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.roundRect(x, 205, textWidth + 24, 34, 8);
        ctx.fill();
        ctx.strokeStyle = '#4F46E5';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#F8FAFC';
        ctx.fillText(sk, x + 12, 228);
        x += textWidth + 34;
      });

      // Verification Line
      ctx.fillStyle = '#10B981';
      ctx.font = '15px "DM Sans", sans-serif';
      ctx.fillText('✓ Verified Talent Credentials · NexusTalent ID', 28, 310);

      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return tex;
    };

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Plinth
    const plinthGeo = new THREE.CylinderGeometry(2.4, 2.7, 0.28, 48);
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.85,
      roughness: 0.25
    });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = -1.6;
    plinth.receiveShadow = !isSoftwareGl;
    rootGroup.add(plinth);

    // Glowing Inner Ring
    const innerRingGeo = new THREE.TorusGeometry(1.8, 0.05, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    innerRing.rotation.x = Math.PI / 2;
    innerRing.position.y = -1.45;
    rootGroup.add(innerRing);

    // Central Core Orb
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.15
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.2;
    rootGroup.add(coreMesh);

    // Orbital Cyan Ring
    const orbitRingGeo = new THREE.TorusGeometry(1.3, 0.03, 16, 64);
    const orbitRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.95,
      roughness: 0.1
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = 1.1;
    orbitRing.position.y = 0.2;
    rootGroup.add(orbitRing);

    // 4 Floating Holographic Dossier Cards
    const dossierData = [
      { name: 'Ananya Deshmukh', role: 'Lead Cloud AI Architect', score: '94%', skills: ['AWS', 'Kubernetes', 'MLOps'] },
      { name: 'Vikramaditya Roy', role: 'Staff Distributed Eng.', score: '96%', skills: ['Rust', 'Go', 'Raft'] },
      { name: 'Devon Sterling', role: 'Staff UI Lead', score: '91%', skills: ['React', 'TypeScript', 'Node'] },
      { name: 'Clara Johansson', role: 'Clinical AI Scientist', score: '89%', skills: ['PyTorch', 'Vision', 'HIPAA'] }
    ];

    const cardGroup = new THREE.Group();
    rootGroup.add(cardGroup);

    const cardMeshes: THREE.Mesh[] = [];
    const cardDistance = 3.2;
    const cardGeo = new THREE.PlaneGeometry(1.9, 1.34);

    dossierData.forEach((d, idx) => {
      const angle = (idx / dossierData.length) * Math.PI * 2;
      const texture = createDossierTexture(d.name, d.role, d.score, d.skills);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(Math.cos(angle) * cardDistance, 0.3 + (idx % 2 === 0 ? 0.3 : -0.2), Math.sin(angle) * cardDistance);
      cardMesh.lookAt(0, 0.3, 0);
      cardMesh.rotateY(Math.PI);
      cardMeshes.push(cardMesh);
      cardGroup.add(cardMesh);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0.2, 0),
        new THREE.Vector3(cardMesh.position.x * 0.5, 1.4, cardMesh.position.z * 0.5),
        cardMesh.position
      );
      const points = curve.getPoints(24);
      const splineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const splineMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x4f46e5 : 0x06b6d4,
        transparent: true,
        opacity: 0.75,
        linewidth: 2
      });
      const spline = new THREE.Line(splineGeo, splineMat);
      rootGroup.add(spline);
    });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    container.addEventListener('mousemove', handleMouseMove);

    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const elapsedTime = clock.getElapsedTime();

      if (isRotatingRef.current) {
        rootGroup.rotation.y += 0.004;
      }

      coreMesh.rotation.y = elapsedTime * 0.5;
      coreMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
      orbitRing.rotation.z = elapsedTime * 0.8;

      cardMeshes.forEach((c, i) => {
        c.position.y += Math.sin(elapsedTime * 1.5 + i) * 0.0015;
      });

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.current.x + mouseX * 0.6, 3, 0.016);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.current.y + mouseY * 0.4, 3, 0.016);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.current.z, 3, 0.016);
      camera.lookAt(targetLookAt.current);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handlePresetChange = (preset: 'overview' | 'dossier' | 'network') => {
    setActivePreset(preset);
    if (preset === 'overview') {
      targetCamPos.current.set(0, 3.8, 9.5);
      targetLookAt.current.set(0, 0, 0);
    } else if (preset === 'dossier') {
      targetCamPos.current.set(1.5, 1.2, 5.0);
      targetLookAt.current.set(1.2, 0.3, 0);
    } else if (preset === 'network') {
      targetCamPos.current.set(0, 7.5, 4.5);
      targetLookAt.current.set(0, 0, 0);
    }
  };

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`} style={{ height }}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left Minimal Spec Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0B1120]/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400">
        <Compass className="w-3.5 h-3.5 text-indigo-400" />
        <span>TALENT MATRIX 3D</span>
        <span className="text-slate-600">·</span>
        <span className="text-slate-200">4 ACTIVE DOSSIERS</span>
      </div>

      {/* Collapsible Bottom Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <button
          onClick={() => setHudCollapsed(!hudCollapsed)}
          className="mb-1.5 px-3 py-1 bg-[#0B1120]/90 hover:bg-slate-800 border border-slate-800 rounded-full text-[11px] font-medium text-slate-200 transition-colors flex items-center gap-1.5 shadow-md"
        >
          {hudCollapsed ? <Eye className="w-3 h-3 text-cyan-400" /> : <EyeOff className="w-3 h-3 text-slate-400" />}
          <span>{hudCollapsed ? 'Show Controls' : 'Cinema Mode'}</span>
        </button>

        {!hudCollapsed && (
          <div className="flex items-center gap-2 p-1.5 bg-[#0B1120]/95 border border-slate-800 rounded-xl shadow-xl backdrop-blur-md">
            <button
              onClick={() => handlePresetChange('overview')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activePreset === 'overview'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => handlePresetChange('dossier')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activePreset === 'dossier'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Dossier Focus</span>
            </button>
            <button
              onClick={() => handlePresetChange('network')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                activePreset === 'network'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Top-Down Flow</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <button
              onClick={() => setIsRotating(!isRotating)}
              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center justify-center ${
                isRotating ? 'text-cyan-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
              }`}
              title={isRotating ? 'Pause Orbit' : 'Resume Orbit'}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRotating ? '' : 'opacity-50'}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
