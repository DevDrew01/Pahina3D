import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MeshGridData } from '../types';
import { useTheme } from '../context/ThemeContext';

interface MeshVisualizerProps {
  meshData: MeshGridData | null;
  showHeatmap?: boolean;
}

export const MeshVisualizer: React.FC<MeshVisualizerProps> = ({
  meshData,
  showHeatmap = true,
}) => {
  const { colors } = useTheme();

  if (!meshData || !meshData.vertices.length) return null;

  const { rows, cols, vertices, creaseHeatmap } = meshData;
  const size = Math.min(Dimensions.get('window').width - 60, 320);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Grid Wireframe Overlay */}
      {Array.from({ length: rows }).map((_, r) => (
        <View key={`row-${r}`} style={styles.row}>
          {Array.from({ length: cols }).map((_, c) => {
            const index = r * (cols + 1) + c;
            const vertex = vertices[index];
            const heat = creaseHeatmap[index] || 0;

            // Calculate node depth offset
            const zOffset = vertex ? Math.abs(vertex.z) * 20 : 0;
            const heatColor =
              heat > 0.08
                ? `rgba(239, 68, 68, ${Math.min(heat * 5, 0.85)})` // Red for deep creases
                : `rgba(59, 130, 246, 0.25)`; // Blue for flat regions

            return (
              <View
                key={`cell-${r}-${c}`}
                style={[
                  styles.cell,
                  {
                    backgroundColor: showHeatmap ? heatColor : 'transparent',
                    borderColor: heat > 0.08 ? 'rgba(239, 68, 68, 0.6)' : colors.accentBlue,
                    transform: [{ translateY: zOffset }],
                  },
                ]}
              >
                {heat > 0.08 && <View style={styles.nodePoint} />}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodePoint: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#EF4444',
  },
});

export default MeshVisualizer;