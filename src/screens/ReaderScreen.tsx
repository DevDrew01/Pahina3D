import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Book } from '../types';

interface ReaderScreenProps {
  book: Book;
  onClose: () => void;
}

export const ReaderScreen: React.FC<ReaderScreenProps> = ({ book, onClose }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>‹ Library</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {book.title}
        </Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.viewer}>
        <Text style={[styles.pageText, { color: colors.textSecondary }]}>
          [ 3D Interactive Canvas: Page {book.currentPage} of {book.totalPages} ]
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 52, paddingHorizontal: 20, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1 },
  title: { fontSize: 14, fontWeight: '800', flex: 1, textAlign: 'center' },
  viewer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  pageText: { fontSize: 14, fontWeight: '600' },
});

export default ReaderScreen;