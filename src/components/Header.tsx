import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title: string;
  onImportPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onImportPress }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View>
        <Text style={[styles.badge, { color: colors.primary }]}>PAHINA 3D ENGINE</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[styles.iconButton, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}
        >
          <Text style={{ fontSize: 16 }}>{isDark ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>

        {onImportPress && (
          <TouchableOpacity
            onPress={onImportPress}
            style={[styles.importButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.importText}>+ Scan / Import</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  badge: { fontSize: 9, fontWeight: '800', letterSpacing: 1.2, marginBottom: 2 },
  title: { fontSize: 22, fontWeight: '800' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  importButton: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18 },
  importText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});

export default Header;