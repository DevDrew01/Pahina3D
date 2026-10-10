import { OnnxAdapter } from './OnnxAdapter';
import { MeshGridData } from '../types';

export class LocalAIEngine {
  public static async initializeModels(): Promise<void> {
    await OnnxAdapter.initModels();
  }

  public static async runLocalDewarpInference(imagePixelArray: Float32Array): Promise<MeshGridData> {
    return OnnxAdapter.runDewarp(imagePixelArray);
  }

  public static async runLocalInpaintingInference(inputTokenIds: Int32Array): Promise<string> {
    return OnnxAdapter.runInpainting(inputTokenIds);
  }
}