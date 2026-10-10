import { MeshGridData, Vector3D } from '../types';

export class OnnxAdapter {
  public static async isAvailable(): Promise<boolean> {
    return false; // Web / Expo Go fallback mode
  }

  public static async initModels(): Promise<void> {
    console.log('[Pahina3D] Running synthetic local AI engine on Web/Expo Go.');
  }

  public static async runDewarp(imagePixels: Float32Array): Promise<MeshGridData> {
    const GRID_SIZE = 16;
    const vertices: Vector3D[] = [];
    const creaseHeatmap: number[] = [];

    for (let r = 0; r <= GRID_SIZE; r++) {
      for (let c = 0; c <= GRID_SIZE; c++) {
        const u = c / GRID_SIZE;
        const v = r / GRID_SIZE;
        const z = Math.sin(u * Math.PI * 2) * Math.cos(v * Math.PI * 2) * 0.12;

        vertices.push({ x: u, y: v, z });
        creaseHeatmap.push(Math.abs(z));
      }
    }

    return { rows: GRID_SIZE, cols: GRID_SIZE, vertices, creaseHeatmap };
  }

  public static async runInpainting(tokens: Int32Array): Promise<string> {
    return 'EXECUTED';
  }
}