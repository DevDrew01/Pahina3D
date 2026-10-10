import { UnreadableZone } from '../types';

export class InpaintingEngine {
  public static async detectObscuredZones(imageUri: string): Promise<UnreadableZone[]> {
    return [
      {
        id: 'zone_01',
        box: { x: 0.18, y: 0.35, width: 0.28, height: 0.05 },
        confidence: 0.24,
        rawFragment: 'Th... [unreadable]',
        contextBefore: 'This contract shall remain in full',
        contextAfter: 'and effect for a period of five years.',
      },
      {
        id: 'zone_02',
        box: { x: 0.12, y: 0.62, width: 0.32, height: 0.05 },
        confidence: 0.31,
        rawFragment: 'sign... [folded]',
        contextBefore: 'In witness whereof, the parties have',
        contextAfter: 'this agreement on the date below.',
      },
    ];
  }

  public static async predictMissingText(zones: UnreadableZone[]): Promise<UnreadableZone[]> {
    return zones.map((zone) => {
      let predictedText = 'CONFIRMED';
      const ctx = `${zone.contextBefore} ${zone.contextAfter}`.toLowerCase();

      if (ctx.includes('full') && ctx.includes('effect')) predictedText = 'FORCE';
      if (ctx.includes('parties have') && ctx.includes('agreement')) predictedText = 'EXECUTED';

      return { ...zone, predictedText };
    });
  }
}