import { MeshGridData, Vector3D } from '../types';

export class DewarpingEngine {
  private static GRID_SIZE = 16;

  public static async analyzeCurvature(imageUri: string): Promise<MeshGridData> {
    const vertices: Vector3D[] = [];
    const creaseHeatmap: number[] = [];

    for (let r = 0; r <= this.GRID_SIZE; r++) {
      for (let c = 0; c <= this.GRID_SIZE; c++) {
        const u = c / this.GRID_SIZE;
        const v = r / this.GRID_SIZE;
        const zDisplacement = Math.sin(u * Math.PI * 2) * Math.cos(v * Math.PI * 2) * 0.12;

        vertices.push({ x: u, y: v, z: zDisplacement });
        creaseHeatmap.push(Math.abs(zDisplacement));
      }
    }

    return {
      rows: this.GRID_SIZE,
      cols: this.GRID_SIZE,
      vertices,
      creaseHeatmap,
    };
  }

  public static async flattenMesh(mesh: MeshGridData): Promise<MeshGridData> {
    const flattenedVertices = mesh.vertices.map((v) => ({ ...v, z: 0.0 }));
    return { ...mesh, vertices: flattenedVertices };
  }
}