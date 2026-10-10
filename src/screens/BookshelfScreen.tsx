import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import { Book } from '../types';

interface BookshelfScreenProps {
  onOpenScan: () => void;
  onSelectBook: (book: Book) => void;
}

export const BookshelfScreen: React.FC<BookshelfScreenProps> = ({
  onOpenScan,
  onSelectBook,
}) => {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'Legal Contract (Restored).pdf',
      fileUri: 'file://contract.pdf',
      totalPages: 18,
      currentPage: 4,
      fileSize: '3.8 MB',
      dateAdded: '2026-10-10',
      isRestored: true,
    },
    {
      id: '2',
      title: 'Architectural Plan.pdf',
      fileUri: 'file://plan.pdf',
      totalPages: 8,
      currentPage: 1,
      fileSize: '11.2 MB',
      dateAdded: '2026-10-09',
      isRestored: false,
    },
  ]);

  const filtered = books.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Library" onImportPress={onOpenScan} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={{ marginBottom: 12 }}>
            <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={{ marginRight: 8 }}>🔍</Text>
              <TextInput
                placeholder="Search documents..."
                placeholderTextColor={colors.textSecondary}
                value={search}
                onChangeText={setSearch}
                style={[styles.searchInput, { color: colors.textPrimary }]}
              />
            </View>

            <TouchableOpacity
              style={[styles.banner, { backgroundColor: colors.primary }]}
              onPress={onOpenScan}
              activeOpacity={0.9}
            >
              <Text style={styles.bannerBadge}>AI DOCUMENT DEWARP</Text>
              <Text style={styles.bannerTitle}>Scan Crumpled Document</Text>
              <Text style={styles.bannerSub}>Flatten 3D surfaces & reconstruct obscured text</Text>
              <View style={styles.bannerBtn}>
                <Text style={styles.bannerBtnText}>Start Camera Scan ›</Text>
              </View>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Documents</Text>
          </View>
        }
        renderItem={({ item }) => <BookCard book={item} onPress={onSelectBook} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, borderWidth: 1, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14 },
  banner: { padding: 18, borderRadius: 18, marginBottom: 20 },
  bannerBadge: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  bannerTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 2 },
  bannerSub: { color: 'rgba(255, 255, 255, 0.85)', fontSize: 12, marginBottom: 14 },
  bannerBtn: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  bannerBtnText: { color: '#2563EB', fontWeight: '800', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 8 },
});

export default BookshelfScreen;