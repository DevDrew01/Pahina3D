import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Book } from '../types';
import { useTheme } from '../context/ThemeContext';

interface BookCardProps {
  book: Book;
  onPress: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  const { colors } = useTheme();
  const progressPercent = Math.round((book.currentPage / book.totalPages) * 100);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => onPress(book)}
      activeOpacity={0.85}
    >
      <View style={[styles.cover, { backgroundColor: colors.surfaceSecondary }]}>
        <View style={[styles.tag, { backgroundColor: colors.primary }]}>
          <Text style={styles.tagText}>{book.isRestored ? '3D RESTORED' : 'PDF'}</Text>
        </View>
        <Text style={{ fontSize: 32 }}>📄</Text>
      </View>

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {book.title}
        </Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          Page {book.currentPage} of {book.totalPages} ({book.fileSize})
        </Text>

        <View style={[styles.track, { backgroundColor: colors.border }]}>
          <View style={[styles.fill, { width: `${progressPercent}%`, backgroundColor: colors.primary }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  cover: { height: 130, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  tag: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  tagText: { color: '#FFFFFF', fontSize: 9, fontWeight: '800' },
  info: { padding: 12 },
  title: { fontSize: 13, fontWeight: '700', marginBottom: 2 },
  meta: { fontSize: 11, marginBottom: 8 },
  track: { height: 4, borderRadius: 2, overflow: 'hidden' },
  fill: { height: '100%' },
});

export default BookCard;