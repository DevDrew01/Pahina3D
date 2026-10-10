import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { RestorationMetrics } from '../types';

export class PdfExporter {
  /**
   * Generates a flattened PDF document from restoration results
   */
  public static async generatePdf(metrics: RestorationMetrics): Promise<string> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #0f172a; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 24px; }
            .title { font-size: 24px; font-weight: bold; margin: 0; color: #1e293b; }
            .subtitle { font-size: 11px; color: #2563eb; font-weight: 800; letter-spacing: 1px; margin-top: 4px; }
            .metrics-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .metrics-table td { padding: 8px 12px; font-size: 12px; border: 1px solid #e2e8f0; }
            .label { font-weight: bold; background-color: #f8fafc; width: 35%; }
            .image-container { text-align: center; margin-top: 20px; }
            .restored-img { max-width: 100%; border-radius: 8px; border: 1px solid #cbd5e1; }
            .zone-list { margin-top: 24px; }
            .zone-item { background: #f1f5f9; padding: 10px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; }
            .badge { background: #2563eb; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Restored Document Output</h1>
            <div class="subtitle">PAHINA3D OFFLINE AI ENGINE</div>
          </div>

          <table class="metrics-table">
            <tr>
              <td class="label">Crease Severity Index</td>
              <td>${metrics.creaseSeverityIndex}% Surface Crumple Offset</td>
            </tr>
            <tr>
              <td class="label">Restored Obscured Zones</td>
              <td>${metrics.unreadableZones.length} Text Blocks Inpainted</td>
            </tr>
            <tr>
              <td class="label">Processing Duration</td>
              <td>${metrics.processingTimeMs} ms</td>
            </tr>
          </table>

          <div class="image-container">
            <img src="${metrics.originalUri}" class="restored-img" />
          </div>

          <div class="zone-list">
            <h3>Contextual Reconstruction Log</h3>
            ${metrics.unreadableZones
              .map(
                (z) => `
              <div class="zone-item">
                <span class="badge">ZONE #${z.id}</span>
                <p style="margin: 4px 0;"><strong>Context:</strong> "${z.contextBefore} <span style="color:#2563eb;">[${z.predictedText \vert{}\vert{} 'CONFIRMED'}]</span>${z.contextAfter}"</p>
              </div>
            `
              )
              .join('')}
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    return uri;
  }

  /**
   * Prompts native share sheet to export or save the generated PDF
   */
  public static async sharePdf(pdfUri: string): Promise<void> {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Export Restored Pahina3D PDF',
      });
    }
  }
}