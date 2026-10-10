import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../context/ThemeContext';

interface CameraScanScreenProps {
  onCaptured: (uri: string) => void;
  onCancel: () => void;
}

export const CameraScanScreen: React.FC<CameraScanScreenProps> = ({ onCaptured, onCancel }) => {
  const { colors } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<any>(null);

  if (!permission?.granted) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.permTitle, { color: colors.textPrimary }]}>Camera Access Needed</Text>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primary }]}
          onPress={requestPermission}
        >
          <Text style={styles.btnText}>Enable Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={{ marginTop: 12 }}>
          <Text style={{ color: colors.textSecondary }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ quality: 0.85 });
      onCaptured(photo.uri);
    }
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (!res.canceled && res.assets[0]?.uri) {
      onCaptured(res.assets[0].uri);
    }
  };

  const pickPDF = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (!res.canceled && res.assets[0]?.uri) {
      onCaptured(res.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={(ref) => setCameraRef(ref)}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={onCancel} style={styles.closeBtn}>
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.badge}>3D DEWARP ACTIVE</Text>
        </View>

        <View style={styles.frame}>
          <Text style={styles.frameText}>Center crumpled paper inside frame</Text>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={pickImage} style={styles.iconBtn}>
            <Text style={{ fontSize: 22 }}>🖼️</Text>
            <Text style={styles.iconLabel}>Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePhoto} style={styles.shutter}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          <TouchableOpacity onPress={pickPDF} style={styles.iconBtn}>
            <Text style={{ fontSize: 22 }}>📄</Text>
            <Text style={styles.iconLabel}>PDF</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, justifyContent: 'space-between', padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  permTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  btn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  btnText: { color: '#FFF', fontWeight: '700' },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 30 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  badge: { color: '#3B82F6', fontSize: 11, fontWeight: '800', backgroundColor: 'rgba(15,23,42,0.8)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  frame: { flex: 1, marginVertical: 40, borderWidth: 2, borderColor: '#3B82F6', borderRadius: 16, borderStyle: 'dashed', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 16 },
  frameText: { color: '#FFF', fontSize: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  iconBtn: { alignItems: 'center' },
  iconLabel: { color: '#FFF', fontSize: 11, marginTop: 4 },
  shutter: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, borderColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  shutterInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#2563EB' },
});

export default CameraScanScreen;