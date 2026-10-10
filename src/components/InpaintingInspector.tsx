import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { UnreadableZone } from '../types';
import { useTheme } from '../context/ThemeContext';

interface InpaintingInspectorProps {
  zones: UnreadableZone[];
  visible: boolean;
  onClose: () => void;
  onAcceptPrediction?: (zoneId: string, text: string) => void;
}

export const InpaintingInspector: React.FC<InpaintingInspectorProps> = ({
  zones,
  visible,
  onClose,
  onAcceptPrediction,
}) => {
  const { colors } = useTheme();

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.badge, { color: colors.primary }]}>AI CONTEXTUAL RECONSTRUCTION</Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Crease Text Inspector</Text>
        </View>
        <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: colors.surfaceSecondary }]}>
          <Text style={{ color: colors.textPrimary, fontWeight: '700' }}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {zones.map((zone, idx) => (
          <View key={zone.id} style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.zoneTag, { color: colors.primary }]}>ZONE #{idx + 1}</Text>
              <Text style={[styles.confidence, { color: colors.textSecondary }]}>
                OCR Confidence: {Math.round(zone.confidence * 100)}%
              </Text>
            </View>

            {/* Context snippet with raw fragment */}
            <Text style={[styles.contextText, { color: colors.textSecondary }]}>
              "{zone.contextBefore}{' '}
              <Text style={styles.rawHighlight}>{zone.rawFragment}</Text>{' '}
              {zone.contextAfter}"
            </Text>

            {/* AI Prediction comparison */}
            <View style={[styles.predictionBox, { backgroundColor: colors.surfaceSecondary }]}>
              <Text style={[styles.label, { color: colors.textSecondary }]}>AI Restored Token:</Text>
              <Text style={[styles.predictionText, { color: colors.primary }]}>
                {zone.predictedText || 'CONFIRMED'}
              </Text>
            </View>

            {onAcceptPrediction && (
              <TouchableOpacity
                style={[styles.applyBtn, { backgroundColor: colors.primary }]}
                onPress={() => onAcceptPrediction(zone.id, zone.predictedText || 'CONFIRMED')}
              >
                <Text style={styles.applyBtnText}>Apply Correction</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '65%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 2 },
  title: { fontSize: 18, fontWeight: '800' },
  closeBtn: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  list: { flex: 1 },
  card: { padding: 14, borderRadius: 14, borderWidth: 1, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  zoneTag: { fontSize: 10, fontWeight: '800' },
  confidence: { fontSize: 10, fontWeight: '600' },
  contextText: { fontSize: 12, lineHeight: 18, marginBottom: 10 },
  rawHighlight: { color: '#EF4444', fontWeight: '700', textDecorationLine: 'line-through' },
  predictionBox: { padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { fontSize: 11, fontWeight: '600' },
  predictionText: { fontSize: 13, fontWeight: '800' },
  applyBtn: { marginTop: 10, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
});

export default InpaintingInspector;