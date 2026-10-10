import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useRestoration } from '../context/RestorationContext';
import MeshVisualizer from '../components/MeshVisualizer';
import InpaintingInspector from '../components/InpaintingInspector';
import { PdfExporter } from '../services/PdfExporter';

interface RestorationScreenProps {
  imageUri: string;
  onComplete: () => void;
  onCancel: () => void;
}

export const RestorationScreen: React.FC<RestorationScreenProps> = ({
  imageUri,
  onComplete,
  onCancel,
}) => {
  const { colors } = useTheme();
  const { stage, progress, metrics, startRestoration } = useRestoration();
  const [showInspector, setShowInspector] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);

  useEffect(() => {
    startRestoration(imageUri);
  }, [imageUri]);

  const handleExportPdf = async () => {
    if (!metrics) return;
    try {
      setExportingPdf(true);
      const pdfUri = await PdfExporter.generatePdf(metrics);
      await PdfExporter.sharePdf(pdfUri);
    } catch (e) {
      Alert.alert('Export Error', 'Unable to generate PDF document.');
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={{ color: colors.textSecondary }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]}>3D AI Restoration</Text>
        {stage === 'COMPLETE' ? (
          <TouchableOpacity onPress={onComplete} style={[styles.saveBtn, { backgroundColor: colors.primary }]}>
            <Text style={styles.saveBtnText}>Done</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Main Preview Area */}
      <View style={styles.previewBox}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        <View style={StyleSheet.absoluteFillObject}>
          <View style={styles.centerOverlay}>
            <MeshVisualizer meshData={metrics?.meshData || null} showHeatmap={true} />
          </View>
        </View>
      </View>

      {/* Control & Progress Dashboard */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.statusRow}>
          {stage !== 'COMPLETE' ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Text>✅</Text>
          )}
          <Text style={[styles.stageText, { color: colors.textPrimary }]}>{stage}</Text>
        </View>

        <View style={[styles.track, { backgroundColor: colors.border }]}>
          <View style={[styles.fill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
        </View>

        {stage === 'COMPLETE' && metrics && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.surfaceSecondary }]}
              onPress={() => setShowInspector(true)}
            >
              <Text style={[styles.actionBtnText, { color: colors.primary }]}>
                🔍 Inspect Creases ({metrics.unreadableZones.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={handleExportPdf}
              disabled={exportingPdf}
            >
              <Text style={[styles.actionBtnText, { color: '#FFF' }]}>
                {exportingPdf ? 'Exporting...' : '📄 Export PDF'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Crease Inpainting Inspector Overlay */}
      <InpaintingInspector
        zones={metrics?.unreadableZones || []}
        visible={showInspector}
        onClose={() => setShowInspector(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 52, paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 },
  title: { fontSize: 16, fontWeight: '800' },
  saveBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  saveBtnText: { color: '#FFF', fontWeight: '700', fontSize: 12 },
  previewBox: { flex: 1, margin: 20, borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.04)', position: 'relative' },
  image: { width: '100%', height: '100%' },
  centerOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { margin: 20, padding: 16, borderRadius: 16, borderWidth: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  stageText: { fontSize: 13, fontWeight: '700' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%' },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  actionBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionBtnText: { fontSize: 12, fontWeight: '700' },
});

export default RestorationScreen;