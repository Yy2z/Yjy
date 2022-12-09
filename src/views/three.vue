<template>
  <div>1</div>
  <div>2</div>
  <div class="relative w-screen h-screen">
  <div class="noise-marble w-screen h-screen bg-blue-grad-4"></div>
  </div>
</template>

<script setup>
import * as THREE from "https://cdn.skypack.dev/three@0.124.0";
import ky from "https://cdn.skypack.dev/kyouka@1.2.5";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/FBXLoader";
import Stats from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/libs/stats.module";
import * as dat from "https://cdn.skypack.dev/dat.gui@0.7.7";
import { RGBELoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/RGBELoader";
const noiseMarbleVertexTopShader = `
varying vec3 vPosition;
varying vec3 vDirection;
`;
const noiseMarbleVertexMainShader = `
vPosition=position;
vDirection=position-cameraPosition;
`;
const noiseMarbleFragmentTopShader = `
uniform sampler2D uHeightMap;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uDepth;
uniform float uSmooth;
uniform float uTime;
uniform float uSpeed;
uniform sampler2D uDisplacementMap;
uniform float uStrength;
uniform float uSlice;

varying vec3 vPosition;
varying vec3 vDirection;
`;
const noiseMarbleFragmentMainShader = `
float rayMarch(vec3 eye,vec3 ray){
    float iter=64.;
    float ratio=1./iter;
    vec3 p=eye;
    float depth=0.;
    
    for(float i=0.;i<iter;i++){
        p+=ray*ratio*uDepth;
        vec2 uv=equirectUv(normalize(p));
        
        // displacement point
        vec2 xOffset=vec2(uTime*uSpeed,0.);
        vec3 displacement1=texture2D(uDisplacementMap,uv+xOffset).rgb;
        vec2 flipY=vec2(1.,-1.);
        vec3 displacement2=texture2D(uDisplacementMap,uv*flipY-xOffset).rgb;
        displacement1-=.5;
        displacement2-=.5;
        vec3 displacement=displacement1+displacement2;
        vec3 displaced=p+displacement*uStrength;
        uv=equirectUv(normalize(displaced));
        
        float h=texture2D(uHeightMap,uv).r;
        float cutoff=1.-i*ratio;
        float slice=smoothstep(cutoff,cutoff+uSmooth,h);
        float dist=slice*ratio*uSlice;
        depth+=dist;
    }
    
    return depth;
}
`;
const noiseMarbleFragmentColorShader = `
vec3 ro=vPosition;
vec3 rd=normalize(vDirection);
float depth=rayMarch(ro,rd);
vec3 result=mix(uColor1,uColor2,depth);
vec4 diffuseColor=vec4(result,1.);
`;

const displacementMapUrl = "https://i.loli.net/2021/08/11/rMpd3hkLGqFaEl5.jpg";
const hdrUrl = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/orbita_1k.hdr";
const heightMapUrl = "https://i.loli.net/2021/08/11/GixLfH28rlbIqTV.jpg";
const calcAspect = (el) => el.clientWidth / el.clientHeight;
const getNormalizedMousePos = (e) => {
    return {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
    };
};
// 加载HDR
const loadHDR = (url, renderer) => {
    const loader = new RGBELoader();
    return new Promise((resolve, reject) => {
        loader.load(url, (texture) => {
            const generator = new THREE.PMREMGenerator(renderer);
            const envmap = generator.fromEquirectangular(texture).texture;
            texture.dispose();
            generator.dispose();
            resolve(envmap);
        }, undefined, (err) => {
            console.log(err);
            reject();
        });
    });
};
class Base {
    constructor(sel, debug = false) {
        this.debug = debug;
        this.container = document.querySelector(sel);
        this.perspectiveCameraParams = {
            fov: 75,
            near: 0.1,
            far: 100
        };
        this.orthographicCameraParams = {
            zoom: 2,
            near: -100,
            far: 1000
        };
        this.cameraPosition = new THREE.Vector3(0, 3, 10);
        this.lookAtPosition = new THREE.Vector3(0, 0, 0);
        this.rendererParams = {
            outputEncoding: THREE.LinearEncoding,
            config: {
                alpha: true,
                antialias: true
            }
        };
        this.mousePos = new THREE.Vector2(0, 0);
        this.mouseSpeed = 0;
    }
    // 初始化
    init() {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.createMesh({});
        this.createLight();
        this.createOrbitControls();
        this.addListeners();
        this.setLoop();
    }
    // 创建场景
    createScene() {
        const scene = new THREE.Scene();
        if (this.debug) {
            scene.add(new THREE.AxesHelper());
            const stats = Stats();
            this.container.appendChild(stats.dom);
            this.stats = stats;
        }
        this.scene = scene;
    }
    // 创建透视相机
    createPerspectiveCamera() {
        const { perspectiveCameraParams, cameraPosition, lookAtPosition } = this;
        const { fov, near, far } = perspectiveCameraParams;
        const aspect = calcAspect(this.container);
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
        this.camera = camera;
    }
    // 创建正交相机
    createOrthographicCamera() {
        const { orthographicCameraParams, cameraPosition, lookAtPosition } = this;
        const { left, right, top, bottom, near, far } = orthographicCameraParams;
        const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
        camera.position.copy(cameraPosition);
        camera.lookAt(lookAtPosition);
        this.camera = camera;
    }
    // 更新正交相机参数
    updateOrthographicCameraParams() {
        const { container } = this;
        const { zoom, near, far } = this.orthographicCameraParams;
        const aspect = calcAspect(container);
        this.orthographicCameraParams = {
            left: -zoom * aspect,
            right: zoom * aspect,
            top: zoom,
            bottom: -zoom,
            near,
            far,
            zoom
        };
    }
    // 创建渲染
    createRenderer(useWebGL1 = false) {
        var _a;
        const { rendererParams } = this;
        const { outputEncoding, config } = rendererParams;
        const renderer = !useWebGL1
            ? new THREE.WebGLRenderer(config)
            : new THREE.WebGL1Renderer(config);
        renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        renderer.outputEncoding = outputEncoding;
        this.resizeRendererToDisplaySize();
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(renderer.domElement);
        this.renderer = renderer;
        this.renderer.setClearColor(0x000000, 0);
    }
    // 允许投影
    enableShadow() {
        this.renderer.shadowMap.enabled = true;
    }
    // 调整渲染器尺寸
    resizeRendererToDisplaySize() {
        const { renderer } = this;
        if (!renderer) {
            return;
        }
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const { clientWidth, clientHeight } = canvas;
        const width = (clientWidth * pixelRatio) | 0;
        const height = (clientHeight * pixelRatio) | 0;
        const isResizeNeeded = canvas.width !== width || canvas.height !== height;
        if (isResizeNeeded) {
            renderer.setSize(width, height, false);
        }
        return isResizeNeeded;
    }
    // 创建网格
    createMesh(meshObject, container = this.scene) {
        const { geometry = new THREE.BoxGeometry(1, 1, 1), material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#d9dfc8")
        }), position = new THREE.Vector3(0, 0, 0) } = meshObject;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        container.add(mesh);
        return mesh;
    }
    // 创建光源
    createLight() {
        const dirLight = new THREE.DirectionalLight(new THREE.Color("#ffffff"), 0.5);
        dirLight.position.set(0, 50, 0);
        this.scene.add(dirLight);
        const ambiLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 0.4);
        this.scene.add(ambiLight);
    }
    // 创建轨道控制
    createOrbitControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        const { lookAtPosition } = this;
        controls.target.copy(lookAtPosition);
        controls.update();
        this.controls = controls;
    }
    // 监听事件
    addListeners() {
        this.onResize();
    }
    // 监听画面缩放
    onResize() {
        window.addEventListener("resize", (e) => {
            if (this.shaderMaterial) {
                this.shaderMaterial.uniforms.uResolution.value.x = window.innerWidth;
                this.shaderMaterial.uniforms.uResolution.value.y = window.innerHeight;
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            }
            else {
                if (this.camera instanceof THREE.PerspectiveCamera) {
                    const aspect = calcAspect(this.container);
                    const camera = this.camera;
                    camera.aspect = aspect;
                    camera.updateProjectionMatrix();
                }
                else if (this.camera instanceof THREE.OrthographicCamera) {
                    this.updateOrthographicCameraParams();
                    const camera = this.camera;
                    const { left, right, top, bottom, near, far } = this.orthographicCameraParams;
                    camera.left = left;
                    camera.right = right;
                    camera.top = top;
                    camera.bottom = bottom;
                    camera.near = near;
                    camera.far = far;
                    camera.updateProjectionMatrix();
                }
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            }
        });
    }
    // 动画
    update() {
        console.log("animation");
    }
    // 渲染
    setLoop() {
        this.renderer.setAnimationLoop(() => {
            this.resizeRendererToDisplaySize();
            this.update();
            if (this.controls) {
                this.controls.update();
            }
            if (this.stats) {
                this.stats.update();
            }
            if (this.composer) {
                this.composer.render();
            }
            else {
                this.renderer.render(this.scene, this.camera);
            }
        });
    }
    // 创建文本
    createText(text = "", config, material = new THREE.MeshStandardMaterial({
        color: "#ffffff"
    })) {
        const geo = new THREE.TextGeometry(text, config);
        const mesh = new THREE.Mesh(geo, material);
        return mesh;
    }
    // 创建音效源
    createAudioSource() {
        const listener = new THREE.AudioListener();
        this.camera.add(listener);
        const sound = new THREE.Audio(listener);
        this.sound = sound;
    }
    // 加载音效
    loadAudio(url) {
        const loader = new THREE.AudioLoader();
        return new Promise((resolve) => {
            loader.load(url, (buffer) => {
                this.sound.setBuffer(buffer);
                resolve(buffer);
            });
        });
    }
    // 加载模型
    loadModel(url) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (gltf) => {
                const model = gltf.scene;
                console.log(model);
                resolve(model);
            }, undefined, (err) => {
                console.log(err);
                reject();
            });
        });
    }
    // 加载FBX模型
    loadFBXModel(url) {
        const loader = new FBXLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (obj) => {
                resolve(obj);
            }, undefined, (err) => {
                console.log(err);
                reject();
            });
        });
    }
    // 加载字体
    loadFont(url) {
        const loader = new THREE.FontLoader();
        return new Promise((resolve) => {
            loader.load(url, (font) => {
                resolve(font);
            });
        });
    }
    // 创建点选模型
    createRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.trackMousePos();
    }
    // 追踪鼠标位置
    trackMousePos() {
        window.addEventListener("mousemove", (e) => {
            this.setMousePos(e);
        });
        window.addEventListener("touchstart", (e) => {
            this.setMousePos(e.touches[0]);
        }, { passive: false });
        window.addEventListener("touchmove", (e) => {
            this.setMousePos(e.touches[0]);
        });
    }
    // 设置鼠标位置
    setMousePos(e) {
        const { x, y } = getNormalizedMousePos(e);
        this.mousePos.x = x;
        this.mousePos.y = y;
    }
    // 获取点击物
    getInterSects(container = this.scene) {
        this.raycaster.setFromCamera(this.mousePos, this.camera);
        const intersects = this.raycaster.intersectObjects(container.children, true);
        return intersects;
    }
    // 选中点击物时
    onChooseIntersect(target, container = this.scene) {
        const intersects = this.getInterSects(container);
        const intersect = intersects[0];
        if (!intersect || !intersect.face) {
            return null;
        }
        const { object } = intersect;
        return target === object ? intersect : null;
    }
    // 获取跟屏幕同像素的fov角度
    getScreenFov() {
        return ky.rad2deg(2 * Math.atan(window.innerHeight / 2 / this.cameraPosition.z));
    }
    // 获取重心坐标系
    getBaryCoord(bufferGeometry) {
        // https://gist.github.com/mattdesl/e399418558b2b52b58f5edeafea3c16c
        const length = bufferGeometry.attributes.position.array.length;
        const count = length / 3;
        const bary = [];
        for (let i = 0; i < count; i++) {
            bary.push(0, 0, 1, 0, 1, 0, 1, 0, 0);
        }
        const aCenter = new Float32Array(bary);
        bufferGeometry.setAttribute("aCenter", new THREE.BufferAttribute(aCenter, 3));
    }
    // 追踪鼠标速度
    trackMouseSpeed() {
        // https://stackoverflow.com/questions/6417036/track-mouse-speed-with-js
        let lastMouseX = -1;
        let lastMouseY = -1;
        let mouseSpeed = 0;
        window.addEventListener("mousemove", (e) => {
            const mousex = e.pageX;
            const mousey = e.pageY;
            if (lastMouseX > -1) {
                mouseSpeed = Math.max(Math.abs(mousex - lastMouseX), Math.abs(mousey - lastMouseY));
                this.mouseSpeed = mouseSpeed / 100;
            }
            lastMouseX = mousex;
            lastMouseY = mousey;
        });
        document.addEventListener("mouseleave", () => {
            this.mouseSpeed = 0;
        });
    }
    // 使用PCFSoft阴影
    usePCFSoftShadowMap() {
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    // 使用VSM阴影
    useVSMShadowMap() {
        this.renderer.shadowMap.type = THREE.VSMShadowMap;
    }
    // 将相机的方向设为z轴
    setCameraUpZ() {
        this.camera.up.set(0, 0, 1);
    }
    // 获取viewport
    getViewport() {
        const { camera } = this;
        const position = new THREE.Vector3();
        const target = new THREE.Vector3();
        const distance = camera.getWorldPosition(position).distanceTo(target);
        const fov = (camera.fov * Math.PI) / 180; // convert vertical fov to radians
        const h = 2 * Math.tan(fov / 2) * distance; // visible height
        const w = h * (window.innerWidth / window.innerHeight);
        const viewport = { width: w, height: h };
        this.viewport = viewport;
    }
    // 加载HDR
    loadHDR(url) {
        const loader = new RGBELoader();
        return new Promise((resolve, reject) => {
            loader.load(url, (texture) => {
                const generator = new THREE.PMREMGenerator(this.renderer);
                const envmap = generator.fromEquirectangular(texture).texture;
                texture.dispose();
                generator.dispose();
                resolve(envmap);
            }, undefined, (err) => {
                console.log(err);
                reject();
            });
        });
    }
}
class NoiseMarble extends Base {
    constructor(sel, debug) {
        super(sel, debug);
        this.clock = new THREE.Clock();
        this.cameraPosition = new THREE.Vector3(0, 0, 2);
        this.params = {
            roughness: 0.1,
            color1: "#000000",
            color2: "#66ccff",
            depth: 0.6,
            smooth: 0.2,
            speed: 0.05,
            strength: 0.2,
            slice: 1.6
        };
        const loader = new THREE.TextureLoader();
        const heightMap = loader.load(heightMapUrl);
        const displacementMap = loader.load(displacementMapUrl);
        displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;
        this.uniforms = {
            uHeightMap: {
                value: heightMap
            },
            uColor1: {
                value: new THREE.Color(this.params.color1)
            },
            uColor2: {
                value: new THREE.Color(this.params.color2)
            },
            uDepth: {
                value: this.params.depth
            },
            uSmooth: {
                value: this.params.smooth
            },
            uTime: {
                value: 0
            },
            uDisplacementMap: {
                value: displacementMap
            },
            uSpeed: {
                value: this.params.speed
            },
            uStrength: {
                value: this.params.strength
            },
            uSlice: {
                value: this.params.slice
            }
        };
    }
    // 初始化
    async init() {
        this.createScene();
        this.createPerspectiveCamera();
        this.createRenderer();
        this.changeRendererParams();
        await this.loadEnvmap();
        this.createNoiseMarbleMaterial();
        this.createSphere();
        this.createOrbitControls();
        this.autoRotateOrbitControl();
        // this.createDebugPanel();
        this.addListeners();
        this.setLoop();
    }
    // 更改渲染器参数
    changeRendererParams() {
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }
    // 加载envmap
    async loadEnvmap() {
        const envmap = await loadHDR(hdrUrl, this.renderer);
        this.scene.environment = envmap;
    }
    // 创建材质
    createNoiseMarbleMaterial() {
        const noiseMarbleMaterial = new THREE.MeshStandardMaterial({
            roughness: this.params.roughness
        });
        noiseMarbleMaterial.onBeforeCompile = (shader) => {
            shader.uniforms = Object.assign(Object.assign({}, shader.uniforms), this.uniforms);
            // vertex
            shader.vertexShader = `
        ${noiseMarbleVertexTopShader}
        ${shader.vertexShader}
        `;
            shader.vertexShader = shader.vertexShader.replace(/void main\(\) {/, (match) => `
        ${match}
        ${noiseMarbleVertexMainShader}
        `);
            // fragment
            shader.fragmentShader = `
      ${noiseMarbleFragmentTopShader}
      ${shader.fragmentShader}
      `;
            shader.fragmentShader = shader.fragmentShader.replace(/void main\(\) {/, (match) => `
          ${noiseMarbleFragmentMainShader}
          ${match}
          `);
            shader.fragmentShader = shader.fragmentShader.replace(/vec4 diffuseColor.*;/, noiseMarbleFragmentColorShader);
        };
        this.noiseMarbleMaterial = noiseMarbleMaterial;
    }
    // 创建球体
    createSphere() {
        const geometry = new THREE.SphereBufferGeometry(1, 128, 128);
        const material = this.noiseMarbleMaterial;
        this.createMesh({
            geometry,
            material
        });
    }
    // 自动旋转场景
    autoRotateOrbitControl() {
        this.controls.autoRotate = true;
    }
    // 动画
    update() {
        const elapsedTime = this.clock.getElapsedTime();
        this.uniforms.uTime.value = elapsedTime;
    }
    // 创建调试面板
    createDebugPanel() {
        const gui = new dat.GUI();
        const material = this.noiseMarbleMaterial;
        const uniforms = this.uniforms;
        gui.add(this.params, "roughness", 0, 1, 0.01).onChange((value) => {
            material.roughness = value;
        });
        gui.add(this.params, "depth", 0, 1, 0.01).onChange((value) => {
            uniforms.uDepth.value = value;
        });
        gui.add(this.params, "smooth", 0, 1, 0.01).onChange((value) => {
            uniforms.uSmooth.value = value;
        });
        gui.add(this.params, "speed", 0, 1, 0.01).onChange((value) => {
            uniforms.uSpeed.value = value;
        });
        gui.add(this.params, "strength", 0, 1, 0.01).onChange((value) => {
            uniforms.uStrength.value = value;
        });
        gui.add(this.params, "slice", 0, 5, 0.01).onChange((value) => {
            uniforms.uSlice.value = value;
        });
        gui.addColor(this.params, "color1").onChange((value) => {
            uniforms.uColor1.value = new THREE.Color(value);
        });
        gui.addColor(this.params, "color2").onChange((value) => {
            uniforms.uColor2.value = new THREE.Color(value);
        });
    }
}
const start = () => {
    const noiseMarble = new NoiseMarble(".noise-marble", false);
    noiseMarble.init();
};
start();

</script>

<style scoped lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

:root {
  --blue-grad-4: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}

.bg-blue-grad-4 {
  background: var(--blue-grad-4);
}

</style>