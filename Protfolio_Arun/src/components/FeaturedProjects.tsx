import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions, ScrollView } from 'react-native';
import theme from '../theme';
import SectionTitle from './ui/SectionTitle';
import ScrollReveal from './ui/ScrollReveal';

const PROJECTS = [
  {
    id: 1, name: 'The Ivory Residence', location: 'Mumbai, India', style: 'Modern Luxury',
    area: '3,200 sq.ft', year: '2024',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    description: 'A sophisticated urban apartment featuring warm neutrals, custom millwork, and curated art pieces.',
  },
  {
    id: 2, name: 'Walnut Grove Villa', location: 'Bangalore, India', style: 'Contemporary Minimal',
    area: '4,500 sq.ft', year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    description: 'An expansive villa with floor-to-ceiling windows, natural stone finishes, and seamless indoor-outdoor flow.',
  },
  {
    id: 3, name: 'The Golden Loft', location: 'Hyderabad, India', style: 'Industrial Chic',
    area: '2,800 sq.ft', year: '2023',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    description: 'A bold penthouse combining exposed concrete, brass accents, and rich leather textures.',
  },
  {
    id: 4, name: 'Serene Office Hub', location: 'Chennai, India', style: 'Corporate Modern',
    area: '6,000 sq.ft', year: '2023',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    description: 'A productive workspace balancing openness with private pods, biophilic elements, and smart lighting.',
  },
  {
    id: 5, name: 'Velvet Dreams Suite', location: 'Delhi, India', style: 'Luxury Classic',
    area: '2,100 sq.ft', year: '2024',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    description: 'An opulent master suite with velvet upholstery, marble accents, and a walk-in dressing room.',
  },
];

const FILTERS = ['All', 'Residential', 'Commercial'];

export default function FeaturedProjects() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View style={styles.container} nativeID="projects">
      <View style={styles.header}>
        <SectionTitle
          label="PORTFOLIO"
          title="Featured Projects"
          subtitle="Each project is crafted as a unique story of luxury, comfort, and timeless design."
        />

        {/* Filter pills */}
        <ScrollReveal delay={0.2} style={styles.filters}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterPill,
                activeFilter === f && styles.filterActive,
                Platform.OS === 'web' ? { transition: 'all 0.3s ease' } as any : {},
              ]}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollReveal>
      </View>

      {/* Projects horizontal scroll */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={isDesktop ? 420 : 320}
        decelerationRate="fast"
      >
        {PROJECTS.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.15} animation="scaleIn">
            <Pressable
              onHoverIn={() => setHoveredId(project.id)}
              onHoverOut={() => setHoveredId(null)}
              style={[
                styles.card,
                isDesktop ? styles.cardDesktop : styles.cardMobile,
                Platform.OS === 'web' ? {
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  ...(hoveredId === project.id ? {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(201,169,110,0.15)',
                  } : {}),
                } as any : {},
              ]}
            >
              {/* Project Image */}
              <View style={[styles.cardImage, Platform.OS === 'web' ? {
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
                ...(hoveredId === project.id ? { transform: 'scale(1.05)' } : {}),
              } as any : {}]} />

              {/* Overlay */}
              <View style={[
                styles.cardOverlay,
                { opacity: hoveredId === project.id ? 0.7 : 0.4 },
              ]} />

              {/* Card Content */}
              <View style={styles.cardContent}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardStyle}>{project.style}</Text>
                  <Text style={styles.cardYear}>{project.year}</Text>
                </View>

                <View style={styles.cardBottom}>
                  <Text style={styles.cardName}>{project.name}</Text>
                  <Text style={styles.cardLocation}>📍 {project.location}</Text>
                  {hoveredId === project.id && (
                    <View style={Platform.OS === 'web' ? { animation: 'fadeUp 0.4s ease forwards' } as any : {}}>
                      <Text style={styles.cardDesc}>{project.description}</Text>
                      <View style={styles.cardMeta}>
                        <Text style={styles.cardArea}>{project.area}</Text>
                      </View>
                    </View>
                  )}
                  <View style={[
                    styles.viewBtn,
                    Platform.OS === 'web' ? { transition: 'all 0.3s ease' } as any : {},
                    hoveredId === project.id ? { backgroundColor: theme.colors.primary } : {},
                  ]}>
                    <Text style={[
                      styles.viewBtnText,
                      hoveredId === project.id ? { color: theme.colors.background } : {},
                    ]}>View Project →</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </ScrollReveal>
        ))}
      </ScrollView>

      {/* Scroll hint */}
      <View style={styles.scrollHint}>
        <View style={styles.scrollHintLine} />
        <Text style={styles.scrollHintText}>DRAG TO EXPLORE</Text>
        <View style={styles.scrollHintLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.section,
  },
  header: {
    paddingHorizontal: 24,
    maxWidth: 1400,
    width: '100%',
    alignSelf: 'center',
  },
  filters: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 48,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
    backgroundColor: 'transparent',
  },
  filterActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    letterSpacing: 1,
  },
  filterTextActive: { color: theme.colors.background },
  scrollContent: {
    paddingHorizontal: 40,
    gap: 24,
    paddingBottom: 20,
  },
  card: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.glassBorder,
  },
  cardDesktop: { width: 400, height: 520 },
  cardMobile: { width: 300, height: 440 },
  cardImage: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: theme.colors.surface,
  },
  cardOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  cardContent: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStyle: {
    fontSize: 11,
    fontFamily: theme.fonts.body,
    color: theme.colors.primary,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  cardYear: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: 'rgba(255,255,255,0.6)',
  },
  cardBottom: {},
  cardName: {
    fontSize: 24,
    fontFamily: theme.fonts.heading,
    color: theme.colors.white,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardLocation: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  cardArea: {
    fontSize: 12,
    fontFamily: theme.fonts.body,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  viewBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewBtnText: {
    fontSize: 13,
    fontFamily: theme.fonts.body,
    color: theme.colors.white,
    fontWeight: '500',
  },
  scrollHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 32,
  },
  scrollHintLine: {
    width: 40,
    height: 1,
    backgroundColor: theme.colors.glassBorder,
  },
  scrollHintText: {
    fontSize: 11,
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    letterSpacing: 3,
  },
});
