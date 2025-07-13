// 创意头像生成器工具函数
// 基于 ugly-avatar 项目的核心算法，用 TypeScript 重新实现

export interface Point {
  x: number;
  y: number;
}

export interface AvatarData {
  faceShape: Point[];
  leftEye: Point[];
  rightEye: Point[];
  leftPupil: Point;
  rightPupil: Point;
  hairLines: Point[][];
  hairType: number;
  hairColor: string;
  mouthShape: Point[];
  mouthType: number;
  noseType: number;
  nosePoints: Point[];
  backgroundColor: string;
  hasRainbowHair: boolean;
}

// 随机数生成工具
export function randomFromInterval(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 颜色配置
export const HAIR_COLORS = [
  '#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#D2B48C',
  '#BC8F8F', '#F5DEB3', '#FFE4B5', '#FFEFD5', '#FFF8DC', '#FFFAF0',
  '#696969', '#778899', '#708090', '#2F4F4F', '#000000', '#191970',
  '#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500',
  '#FFB6C1', '#FFC0CB', '#FFD700', '#FFFF00', '#ADFF2F', '#7FFF00',
  '#32CD32', '#00FF00', '#00FF7F', '#00FFFF', '#87CEEB', '#87CEFA',
  '#4169E1', '#0000FF', '#8A2BE2', '#9400D3', '#9932CC', '#BA55D3',
  '#DA70D6', '#EE82EE', '#FF00FF', '#FF1493', '#DC143C', '#B22222'
];

export const BACKGROUND_COLORS = [
  '#F0F8FF', '#FAEBD7', '#F0FFFF', '#F5F5DC', '#FFE4C4', '#FFEBCD',
  '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00',
  '#D2691E', '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF',
  '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#BDB76B',
  '#8B008B', '#556B2F', '#FF8C00', '#9932CC', '#8B0000', '#E9967A',
  '#8FBC8F', '#483D8B', '#2F4F4F', '#00CED1', '#9400D3', '#FF1493',
  '#00BFFF', '#696969', '#1E90FF', '#B22222', '#FFFAF0', '#228B22',
  '#FF00FF', '#DCDCDC', '#F8F8FF', '#FFD700', '#DAA520', '#808080'
];

// 贝塞尔曲线工具函数
export function cubicBezier(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
  };
}

// 脸型生成算法
export function generateFaceShape(): Point[] {
  const faceType = Math.random() < 0.5 ? 'egg' : 'rectangle';
  
  if (faceType === 'egg') {
    return generateEggFaceShape();
  } else {
    return generateRectangleFaceShape();
  }
}

function generateEggFaceShape(): Point[] {
  const points: Point[] = [];
  const a = randomFromInterval(25, 35); // 椭圆长轴
  const b = randomFromInterval(30, 45); // 椭圆短轴
  const k = randomFromInterval(0.1, 0.3); // 扭曲参数
  
  for (let i = 0; i <= 100; i++) {
    const angle = (i / 100) * 2 * Math.PI;
    const x = a * Math.cos(angle);
    const y = b * Math.sin(angle) * (1 + k * Math.sin(angle));
    
    // 添加随机扭曲
    const distortion = randomFromInterval(-2, 2);
    points.push({
      x: x + distortion,
      y: y + distortion
    });
  }
  
  return points;
}

function generateRectangleFaceShape(): Point[] {
  const points: Point[] = [];
  const width = randomFromInterval(50, 70);
  const height = randomFromInterval(60, 80);
  const cornerRadius = randomFromInterval(10, 20);
  
  // 生成圆角矩形的点
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    let x: number, y: number;
    
    if (t < 0.25) {
      // 顶边
      const localT = t / 0.25;
      x = -width/2 + localT * width;
      y = -height/2;
    } else if (t < 0.5) {
      // 右边
      const localT = (t - 0.25) / 0.25;
      x = width/2;
      y = -height/2 + localT * height;
    } else if (t < 0.75) {
      // 底边
      const localT = (t - 0.5) / 0.25;
      x = width/2 - localT * width;
      y = height/2;
    } else {
      // 左边
      const localT = (t - 0.75) / 0.25;
      x = -width/2;
      y = height/2 - localT * height;
    }
    
    // 添加随机变形
    const distortion = randomFromInterval(-3, 3);
    points.push({
      x: x + distortion,
      y: y + distortion
    });
  }
  
  return points;
}

// 眼睛生成算法
export function generateEyes(faceShape: Point[]): {
  leftEye: Point[];
  rightEye: Point[];
  leftPupil: Point;
  rightPupil: Point;
} {
  const eyeWidth = randomFromInterval(8, 15);
  const eyeHeight = randomFromInterval(5, 10);
  const eyeY = randomFromInterval(-10, 5);
  const eyeDistance = randomFromInterval(15, 25);
  
  // 生成左眼
  const leftEye = generateSingleEye(-eyeDistance/2, eyeY, eyeWidth, eyeHeight);
  const rightEye = generateSingleEye(eyeDistance/2, eyeY, eyeWidth, eyeHeight);
  
  // 生成瞳孔
  const leftPupil: Point = {
    x: -eyeDistance/2 + randomFromInterval(-eyeWidth/4, eyeWidth/4),
    y: eyeY + randomFromInterval(-eyeHeight/4, eyeHeight/4)
  };
  
  const rightPupil: Point = {
    x: eyeDistance/2 + randomFromInterval(-eyeWidth/4, eyeWidth/4),
    y: eyeY + randomFromInterval(-eyeHeight/4, eyeHeight/4)
  };
  
  return { leftEye, rightEye, leftPupil, rightPupil };
}

function generateSingleEye(centerX: number, centerY: number, width: number, height: number): Point[] {
  const points: Point[] = [];
  
  // 生成眼睛轮廓（椭圆形）
  for (let i = 0; i <= 50; i++) {
    const angle = (i / 50) * 2 * Math.PI;
    const x = centerX + (width/2) * Math.cos(angle);
    const y = centerY + (height/2) * Math.sin(angle);
    
    // 添加不规则形状
    const distortion = randomFromInterval(-1, 1);
    points.push({
      x: x + distortion,
      y: y + distortion
    });
  }
  
  return points;
}

// 头发生成算法
export function generateHair(faceShape: Point[]): {
  hairLines: Point[][];
  hairType: number;
  hairColor: string;
  hasRainbowHair: boolean;
} {
  const hairType = randomIntFromInterval(0, 3);
  const hasRainbowHair = Math.random() < 0.1; // 10% 概率彩虹头发
  const hairColor = hasRainbowHair ? '#000000' : HAIR_COLORS[randomIntFromInterval(0, HAIR_COLORS.length - 1)];
  
  let hairLines: Point[][] = [];
  
  switch (hairType) {
    case 0:
      hairLines = generateBeardHair(faceShape);
      break;
    case 1:
      hairLines = generateScatteredHair(faceShape);
      break;
    case 2:
      hairLines = generateStructuredHair(faceShape);
      break;
    case 3:
      hairLines = generateWavyHair(faceShape);
      break;
  }
  
  return { hairLines, hairType, hairColor, hasRainbowHair };
}

function generateBeardHair(faceShape: Point[]): Point[][] {
  const hairLines: Point[][] = [];
  const numHairs = randomIntFromInterval(15, 25);
  
  for (let i = 0; i < numHairs; i++) {
    const startPointIndex = randomIntFromInterval(0, faceShape.length - 1);
    const startPoint = faceShape[startPointIndex];
    
    const hairLine: Point[] = [startPoint];
    const numSegments = randomIntFromInterval(3, 7);
    
    for (let j = 1; j <= numSegments; j++) {
      const prevPoint = hairLine[j - 1];
      const direction = randomFromInterval(0, Math.PI * 2);
      const length = randomFromInterval(5, 15);
      
      hairLine.push({
        x: prevPoint.x + Math.cos(direction) * length,
        y: prevPoint.y + Math.sin(direction) * length
      });
    }
    
    hairLines.push(hairLine);
  }
  
  return hairLines;
}

function generateScatteredHair(faceShape: Point[]): Point[][] {
  const hairLines: Point[][] = [];
  const numHairs = randomIntFromInterval(20, 35);
  
  for (let i = 0; i < numHairs; i++) {
    const startPoint = faceShape[randomIntFromInterval(0, faceShape.length - 1)];
    const endPoint: Point = {
      x: startPoint.x + randomFromInterval(-20, 20),
      y: startPoint.y + randomFromInterval(-30, -10)
    };
    
    hairLines.push([startPoint, endPoint]);
  }
  
  return hairLines;
}

function generateStructuredHair(faceShape: Point[]): Point[][] {
  const hairLines: Point[][] = [];
  const numHairs = randomIntFromInterval(10, 20);
  
  // 找到头顶区域的点
  const topPoints = faceShape.filter(point => point.y < -20);
  
  for (let i = 0; i < numHairs; i++) {
    if (topPoints.length === 0) break;
    
    const startPoint = topPoints[randomIntFromInterval(0, topPoints.length - 1)];
    const hairLine: Point[] = [startPoint];
    
    // 生成向上的头发
    for (let j = 1; j <= 4; j++) {
      const prevPoint = hairLine[j - 1];
      hairLine.push({
        x: prevPoint.x + randomFromInterval(-5, 5),
        y: prevPoint.y - randomFromInterval(10, 20)
      });
    }
    
    hairLines.push(hairLine);
  }
  
  return hairLines;
}

function generateWavyHair(faceShape: Point[]): Point[][] {
  const hairLines: Point[][] = [];
  const numHairs = randomIntFromInterval(12, 18);
  
  for (let i = 0; i < numHairs; i++) {
    const startPoint = faceShape[randomIntFromInterval(0, faceShape.length - 1)];
    const hairLine: Point[] = [startPoint];
    
    // 生成波浪状头发
    for (let j = 1; j <= 6; j++) {
      const prevPoint = hairLine[j - 1];
      const waveAmplitude = randomFromInterval(5, 15);
      const waveFrequency = j * 0.5;
      
      hairLine.push({
        x: prevPoint.x + Math.sin(waveFrequency) * waveAmplitude,
        y: prevPoint.y - randomFromInterval(8, 15)
      });
    }
    
    hairLines.push(hairLine);
  }
  
  return hairLines;
}

// 嘴巴生成算法
export function generateMouth(): { mouthShape: Point[]; mouthType: number } {
  const mouthType = randomIntFromInterval(0, 2);
  let mouthShape: Point[] = [];
  
  switch (mouthType) {
    case 0:
      mouthShape = generateSmileMouth();
      break;
    case 1:
      mouthShape = generateStraightMouth();
      break;
    case 2:
      mouthShape = generateOvalMouth();
      break;
  }
  
  return { mouthShape, mouthType };
}

function generateSmileMouth(): Point[] {
  const points: Point[] = [];
  const width = randomFromInterval(15, 25);
  const height = randomFromInterval(5, 10);
  const centerY = randomFromInterval(15, 25);
  
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const x = -width/2 + t * width;
    const y = centerY + height * Math.sin(t * Math.PI);
    
    points.push({ x, y });
  }
  
  return points;
}

function generateStraightMouth(): Point[] {
  const width = randomFromInterval(10, 20);
  const centerY = randomFromInterval(15, 25);
  
  return [
    { x: -width/2, y: centerY },
    { x: width/2, y: centerY }
  ];
}

function generateOvalMouth(): Point[] {
  const points: Point[] = [];
  const width = randomFromInterval(8, 15);
  const height = randomFromInterval(6, 12);
  const centerY = randomFromInterval(15, 25);
  
  for (let i = 0; i <= 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const x = (width/2) * Math.cos(angle);
    const y = centerY + (height/2) * Math.sin(angle);
    
    points.push({ x, y });
  }
  
  return points;
}

// 鼻子生成算法
export function generateNose(): { nosePoints: Point[]; noseType: number } {
  const noseType = randomIntFromInterval(0, 1);
  let nosePoints: Point[] = [];
  
  const centerY = randomFromInterval(0, 10);
  
  if (noseType === 0) {
    // 点状鼻子
    nosePoints = [{ x: 0, y: centerY }];
  } else {
    // 线状鼻子
    const width = randomFromInterval(3, 8);
    nosePoints = [
      { x: -width/2, y: centerY },
      { x: width/2, y: centerY }
    ];
  }
  
  return { nosePoints, noseType };
}

// 生成完整的创意头像数据
export function generateUglyAvatar(seed?: string): AvatarData {
  // 如果提供了种子，可以在这里设置随机种子（简化实现）
  if (seed) {
    // 简单的种子随机化（生产环境可能需要更复杂的实现）
    Math.random = (() => {
      let seedValue = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      return () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
      };
    })();
  }
  
  const faceShape = generateFaceShape();
  const { leftEye, rightEye, leftPupil, rightPupil } = generateEyes(faceShape);
  const { hairLines, hairType, hairColor, hasRainbowHair } = generateHair(faceShape);
  const { mouthShape, mouthType } = generateMouth();
  const { nosePoints, noseType } = generateNose();
  
  const backgroundColor = BACKGROUND_COLORS[randomIntFromInterval(0, BACKGROUND_COLORS.length - 1)];
  
  return {
    faceShape,
    leftEye,
    rightEye,
    leftPupil,
    rightPupil,
    hairLines,
    hairType,
    hairColor,
    mouthShape,
    mouthType,
    nosePoints,
    noseType,
    backgroundColor,
    hasRainbowHair
  };
}

// SVG 路径生成工具
export function pointsToPath(points: Point[]): string {
  if (points.length === 0) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  
  return path;
}

export function pointsToSmoothPath(points: Point[]): string {
  if (points.length < 2) return pointsToPath(points);
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    if (i === 1) {
      path += ` Q ${points[0].x} ${points[0].y} ${(points[0].x + points[1].x) / 2} ${(points[0].y + points[1].y) / 2}`;
    } else {
      const cpx = points[i - 1].x;
      const cpy = points[i - 1].y;
      const x = i === points.length - 1 ? points[i].x : (points[i].x + points[i + 1].x) / 2;
      const y = i === points.length - 1 ? points[i].y : (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${cpx} ${cpy} ${x} ${y}`;
    }
  }
  
  return path;
}