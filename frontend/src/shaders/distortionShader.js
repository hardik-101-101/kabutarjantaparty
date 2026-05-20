// Vertex Shader
export const distortionVertexShader = `
  uniform float uTime;
  uniform float uDistortion;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 pos = position;
    float distortion = sin(pos.x * 2.0 + uTime) * cos(pos.y * 2.0 + uTime) * uDistortion;
    pos += normal * distortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment Shader
export const distortionFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    float mixFactor = sin(vUv.x * 3.14159 + uTime) * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, mixFactor);

    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    color += vec3(fresnel * 0.5);

    gl_FragColor = vec4(color, 0.8);
  }
`;
