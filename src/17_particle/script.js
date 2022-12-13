import * as THREE from '../../build/three.module.js';
import { OrbitControls } from '../../../jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('../texture/crate.gif')


/**
 * Particle
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32)
const count = 5000

// Multiply by 3 because each position is composed of 3 values (x, y, z)
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

// Multiply by 3 for same reason
for(let i = 0; i < count * 3; i++) {
    // Math.random() - 0.5 to have a random value between -0.5 and +0.5
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}


// Create the Three.js BufferAttribute and specify that each information is composed of 3 values
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

// particlesMaterial.color = new THREE.Color('#ff88cc')
// particlesMaterial.map = particleTexture
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending
// gui.add(particlesMaterial, 'alphaTest').name('alphaMap').min(0.001).max(1).step(0.01)
particlesMaterial.vertexColors = true
// gui.add(particlesMaterial, 'depthWrite').name('depthWrite')
// gui.add(particlesMaterial, 'depthTest').name('depthTest')


// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

// Example random cube fot depthWritr
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    // Update particles
    particles.rotation.y = - elapsedTime * 0.2

    for(let i = 0; i < count; i++)
    {
        let i3 = i * 3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()