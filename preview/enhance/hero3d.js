/* PREVIEW: Three.js hero. Three orange rings (the logo's ring) and a field of dust, drifting with the pointer and the scroll. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('.hero3d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reduce) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); } catch (e) { renderer = null; }
  if (renderer) {
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 9;
    const group = new THREE.Group();
    scene.add(group);

    const accent = new THREE.Color(), ink = new THREE.Color();
    const readColours = () => {
      const s = getComputedStyle(document.documentElement);
      accent.set(s.getPropertyValue('--p-accent').trim() || '#ff6a1f');
      ink.set(s.getPropertyValue('--p-ink').trim() || '#0a1a2b');
    };
    readColours();

    const rings = [[2.6, 0.05, 0.95], [3.45, 0.022, 0.55], [4.4, 0.012, 0.32]].map(([r, t, o], i) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 24, 180),
        new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: o }),
      );
      m.rotation.set(1.1 - i * 0.35, i * 0.5, i * 0.8);
      group.add(m);
      return m;
    });

    const N = innerWidth < 700 ? 220 : 520;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 4 + Math.random() * 6, a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(b) * Math.cos(a); pos[i * 3 + 1] = r * Math.sin(b) * Math.sin(a); pos[i * 3 + 2] = r * Math.cos(b);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dustMat = new THREE.PointsMaterial({ color: ink, size: 0.04, transparent: true, opacity: 0.4, sizeAttenuation: true });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const rtl = document.documentElement.dir === 'rtl';
    const fit = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      const wide = w > 900;
      group.position.x = wide ? (rtl ? -3.4 : 3.4) : 0;
      group.scale.setScalar(wide ? 1 : 0.72);
    };
    fit();
    addEventListener('resize', fit);

    const paint = () => {
      readColours();
      const dark = document.documentElement.dataset.theme === 'dark';
      rings.forEach((m) => m.material.color.copy(accent));
      dustMat.color.copy(ink); dustMat.opacity = dark ? 0.55 : 0.32;
    };
    paint();
    addEventListener('themechange', paint);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    addEventListener('pointermove', (e) => { pointer.tx = (e.clientX / innerWidth - 0.5) * 2; pointer.ty = (e.clientY / innerHeight - 0.5) * 2; });

    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(canvas);
    const clock = new THREE.Clock();
    const frame = () => {
      requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime(), p = window.__heroProgress || 0;
      pointer.x += (pointer.tx - pointer.x) * 0.05; pointer.y += (pointer.ty - pointer.y) * 0.05;
      rings.forEach((m, i) => { m.rotation.z += 0.0022 * (i + 1); m.rotation.x += 0.0008 * (i + 1); });
      group.rotation.y = pointer.x * 0.35 + p * 1.4;
      group.rotation.x = pointer.y * 0.2 - p * 0.5;
      group.position.y = p * 2.4;
      dust.rotation.y = t * 0.02 + p * 0.6; dust.position.y = p * 1.2;
      renderer.render(scene, camera);
    };
    frame();
  }
}
