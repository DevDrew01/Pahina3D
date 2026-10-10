export type ScreenName = 'SHELF' | 'CAMERA' | 'RESTORATION' | 'READER';

export interface Book {
  id: string;
  title: string;
  fileUri: string;
  totalPages: number;
  currentPage: number;
  fileSize: string;
  dateAdded: string;
  isRestored?: boolean;
}

export type PipelineStage =
  | 'IDLE'
  | 'ANALYZING_CREASES'
  | 'DEWARPING_MESH'
  | 'OCR_MASKING'
  | 'AI_INPAINTING'
  | 'COMPLETE'
  | 'ERROR';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface UnreadableZone {
  id: string;
  box: BoundingBox;
  confidence: number;
  rawFragment: string;
  predictedText?: string;
  contextBefore: string;
  contextAfter: string;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface MeshGridData {
  rows: number;
  cols: number;
  vertices: Vector3D[];
  creaseHeatmap: number[];
}

export interface RestorationMetrics {
  originalUri: string;
  flattenedUri: string;
  finalPdfUri: string;
  meshData: MeshGridData;
  unreadableZones: UnreadableZone[];
  creaseSeverityIndex: number;
  processingTimeMs: number;
}