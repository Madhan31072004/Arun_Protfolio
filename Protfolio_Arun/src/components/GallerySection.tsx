import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import theme from '../theme';
import SectionTitle from './ui/SectionTitle';
import ScrollReveal from './ui/ScrollReveal';

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', cat: 'Living', h: 350 },
  { id: 2, src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80', cat: 'Bedroom', h: 280 },
  { id: 3, src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', cat: 'Kitchen', h: 320 },
  { id: 4, src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80', cat: 'Bathroom', h: 300 },
  { id: 5, src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', cat: 'Living', h: 340 },
  { id: 6, src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', cat: 'Living', h: 290 },
  { id: 7, src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', cat: 'Office', h: 310 },
  { id: 8, src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', cat: 'Bedroom', h: 360 },
];

const CATS = ['All', 'Living', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'];

export default function GallerySection() {
  const { width } = useWindowDimensions();
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);
  const cols = width >= 1200 ? 4 : width >= 768 ? 3 : 2;
  const filtered = filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.cat === filter);

  return (
    <View style={styles.container} nativeID="gallery">
      <View style={styles.inner}>
        <SectionTitle
          label="GALLERY"
          title="Visual Showcase"
          subtitle="A curated collection of our finest interior design work."
        />

        {/* Filter tabs */}
        <ScrollReveal style={styles.tabs}>
          {CATS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setFilter(c)}
              style={[styles.tab, filter === c && styles.tabActive]}
            >
              <Text style={[styles.tabText, filter === c && styles.tabTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </ScrollReveal>

        {/* Masonry grid */}
        <View style={[styles.grid, { gap: 16 }]}>
          {filtered.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.08} animation="scaleIn" style={{
              width: `${100 / cols - 2}%` as any,
            }}>
              <Pressable
                onHoverIn={() => setHovered(img.id)}
                onHoverOut={() => setHovered(null)}
                style={[styles.gridItem, {
                  height: img.h,
                }, Platform.OS === 'web' ? {
                  transition: 'all 0.4s ease',
                  cursor: 'pointer',
                  ...(hovered === img.id ? {
                    transform: 'scale(1.03)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                  } : {}),
                } as any : {}]}
              >
                <View style={[styles.gridImage, Platform.OS === 'web' ? {
                  backgroundImage: `url(${img.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s ease',
                  ...(hovered === img.id ? { transform: 'scale(1.1)' } : {}),
                } as any : {}]} />
                <View style={[styles.gridOverlay, { opacity: hovered === img.id ? 0.6 : 0 }]} />
                {hovered === img.id && (
                  <View style={[styles.gridLabel, Platform.OS === 'web' ? {
                    animation: 'fadeUp 0.3s ease forwards',
                  } as any : {}]}>
                    <Text style={styles.gridCat}>{img.cat}</Text>
                  </View>
                )}
              </Pressable>
            </ScrollReveal>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.section,
    paddingHorizontal: 24,
  },
  inner: {
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 48,
    flexWrap: 'wrap',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabActive: {
    borderColor: theme.colors.primary,
    backgroundColor: 'rgba(201,169,110,0.1)',
  },
  tabText: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    fontWeight: '400',
  },
  tabTextActive: { color: theme.colors.primary },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gridItem: {
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  gridImage: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: theme.colors.surfaceLight,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: theme.colors.background,
  },
  gridLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  gridCat: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    color: theme.colors.white,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
