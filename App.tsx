import React, { useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { RestorationProvider } from './src/context/RestorationContext';

import BookshelfScreen from './src/screens/BookshelfScreen';
import CameraScanScreen from './src/screens/CameraScanScreen';
import RestorationScreen from './src/screens/RestorationScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import { Book, ScreenName } from './src/types';

const MainApp = () => {
  const { isDark, colors } = useTheme();
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('SHELF');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {currentScreen === 'SHELF' && (
        <BookshelfScreen
          onOpenScan={() => setCurrentScreen('CAMERA')}
          onSelectBook={(book) => {
            setSelectedBook(book);
            setCurrentScreen('READER');
          }}
        />
      )}

      {currentScreen === 'CAMERA' && (
        <CameraScanScreen
          onCaptured={(uri) => {
            setCapturedUri(uri);
            setCurrentScreen('RESTORATION');
          }}
          onCancel={() => setCurrentScreen('SHELF')}
        />
      )}

      {currentScreen === 'RESTORATION' && capturedUri && (
        <RestorationScreen
          imageUri={capturedUri}
          onComplete={() => setCurrentScreen('SHELF')}
          onCancel={() => setCurrentScreen('SHELF')}
        />
      )}

      {currentScreen === 'READER' && selectedBook && (
        <ReaderScreen
          book={selectedBook}
          onClose={() => setCurrentScreen('SHELF')}
        />
      )}
    </View>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RestorationProvider>
        <MainApp />
      </RestorationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});