import * as THREE from "three";

/**
 * Конфигурация 3D позиций для зон тела
 */
export const BODY_ZONES_3D_CONFIG: Record<
  string,
  {
    position: [number, number, number];
    scale: number;
    shape: "sphere" | "cylinder" | "box";
    rotation?: [number, number, number];
  }
> = {
  head: {
    position: [0, 1.8, 0],
    scale: 0.3,
    shape: "sphere",
  },
  neck: {
    position: [0, 1.4, 0],
    scale: 0.15,
    shape: "cylinder",
    rotation: [0, 0, 0],
  },
  chest: {
    position: [0, 0.8, 0],
    scale: 0.4,
    shape: "sphere",
  },
  breast: {
    position: [-0.2, 0.9, 0.1],
    scale: 0.15,
    shape: "sphere",
  },
  abdomen: {
    position: [0, 0.2, 0],
    scale: 0.35,
    shape: "sphere",
  },
  pelvis: {
    position: [0, -0.4, 0],
    scale: 0.3,
    shape: "sphere",
  },
  skin: {
    position: [0, 0.5, 0.3],
    scale: 0.1,
    shape: "sphere",
  },
  blood: {
    position: [0, 0.5, -0.3],
    scale: 0.1,
    shape: "sphere",
  },
  lymph: {
    position: [0.3, 0.8, 0],
    scale: 0.1,
    shape: "sphere",
  },
  bones: {
    position: [0, 0, 0],
    scale: 0.05,
    shape: "sphere",
  },
};

/**
 * Цветовая схема для уровней риска
 */
export const RISK_COLORS = {
  low: "#4CAF50",
  medium: "#FF9800",
  high: "#F44336",
  default: "#E5E7EB",
} as const;

/**
 * Анимационные параметры
 */
export const ANIMATION_CONFIG = {
  pulseDuration: 2000, // мс
  hoverScaleMultiplier: 1.2,
  transitionDuration: 0.3, // секунды
  rotationSpeed: 0.01,
} as const;

/**
 * Настройки камеры и освещения
 */
export const SCENE_CONFIG = {
  camera: {
    position: [0, 0, 4] as [number, number, number],
    fov: 50,
    near: 0.1,
    far: 1000,
  },
  controls: {
    minDistance: 2,
    maxDistance: 8,
    maxPolarAngle: Math.PI,
    enableDamping: true,
    dampingFactor: 0.05,
  },
  lighting: {
    ambient: {
      intensity: 0.4,
      color: "#ffffff",
    },
    directional: {
      position: [5, 5, 5] as [number, number, number],
      intensity: 0.8,
      castShadow: true,
      shadowMapSize: 2048,
    },
    point: {
      position: [-2, 2, 2] as [number, number, number],
      intensity: 0.3,
    },
  },
} as const;

/**
 * Материалы для различных частей тела
 */
export const BODY_MATERIALS = {
  skin: {
    color: "#FFD1A0",
    transparent: true,
    opacity: 0.3,
    roughness: 0.8,
    metalness: 0.1,
  },
  riskZone: {
    transparent: true,
    opacity: 0.8,
    roughness: 0.2,
    metalness: 0.1,
  },
} as const;

/**
 * Утилитарные функции для работы с 3D
 */
export class Body3DUtils {
  /**
   * Создает материал для зоны риска
   */
  static createRiskZoneMaterial(
    color: string,
    hovered = false,
  ): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: BODY_MATERIALS.riskZone.opacity,
      roughness: BODY_MATERIALS.riskZone.roughness,
      metalness: BODY_MATERIALS.riskZone.metalness,
      emissive: hovered ? color : "#000000",
      emissiveIntensity: hovered ? 0.2 : 0,
    });
  }

  /**
   * Вычисляет пульсирующий масштаб для зон высокого риска
   */
  static getPulseScale(
    time: number,
    baseScale: number,
    isHighRisk: boolean,
  ): number {
    if (!isHighRisk) return baseScale;

    const pulsePhase = (time * 1000) % ANIMATION_CONFIG.pulseDuration;
    const normalizedPhase = pulsePhase / ANIMATION_CONFIG.pulseDuration;
    const pulseValue = Math.sin(normalizedPhase * Math.PI * 2) * 0.1 + 1;

    return baseScale * pulseValue;
  }

  /**
   * Интерполирует между двумя цветами
   */
  static interpolateColor(
    color1: string,
    color2: string,
    factor: number,
  ): string {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    return c1.lerp(c2, factor).getHexString();
  }

  /**
   * Создает градиентный материал для перехода между уровнями риска
   */
  static createGradientMaterial(
    lowColor: string,
    highColor: string,
    riskLevel: number,
  ): THREE.MeshStandardMaterial {
    const interpolatedColor = this.interpolateColor(
      lowColor,
      highColor,
      riskLevel,
    );

    return new THREE.MeshStandardMaterial({
      color: `#${interpolatedColor}`,
      transparent: true,
      opacity: 0.8,
      roughness: 0.2,
      metalness: 0.1,
    });
  }

  /**
   * Вычисляет позицию для текста/HTML элементов
   */
  static getHtmlPosition(
    worldPosition: THREE.Vector3,
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
  ): { x: number; y: number } {
    const vector = worldPosition.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * renderer.domElement.clientHeight;

    return { x, y };
  }

  /**
   * Создает анимацию появления для зон риска
   */
  static createAppearanceAnimation(
    mesh: THREE.Mesh,
    targetScale: number,
    duration = 1000,
  ): void {
    const startScale = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentScale =
        startScale + (targetScale - startScale) * easedProgress;
      mesh.scale.setScalar(currentScale);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  /**
   * Проверяет пересечение луча с объектом для интерактивности
   */
  static checkRayIntersection(
    mouse: THREE.Vector2,
    camera: THREE.Camera,
    objects: THREE.Object3D[],
  ): THREE.Intersection[] {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    return raycaster.intersectObjects(objects, true);
  }
}
