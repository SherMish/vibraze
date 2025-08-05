# 🎵 Vibraze - Video Audio Enhancement App

## 🌟 Overview

**Vibraze** is a modern, sleek Next.js web application that allows users to upload videos and boost their audio levels with professional-grade sound enhancement. The application features a futuristic design with glass morphism effects and runs entirely in the browser for maximum privacy.

## ✨ Key Features

- **🎥 Video Upload**: Support for MP4, MOV, AVI and other common video formats
- **🔊 Audio Boosting**: Adjustable audio enhancement from 0dB to 20dB
- **🎨 Modern UI**: Sleek, futuristic design with glass morphism and neon effects
- **⚡ Real-time Processing**: Live progress tracking during video processing
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎬 Video Preview**: Built-in video player to preview enhanced results
- **💾 Direct Download**: Download processed videos instantly in same quality
- **🔒 Privacy First**: All processing happens in your browser - no server uploads
- **⚡ FFmpeg.wasm**: Professional video processing using WebAssembly

## 🚀 Live Demo

The application is now running on: **http://localhost:3001**

## 🎨 Design Highlights

### Futuristic Theme

- **Dark gradient backgrounds** with animated floating elements
- **Glass morphism effects** for modern, translucent panels
- **Neon borders and glowing animations** for interactive elements
- **Gradient text effects** and custom color palette
- **Smooth animations** powered by Framer Motion

### User Experience

- **Intuitive drag-and-drop** video upload interface
- **Real-time progress tracking** during audio processing
- **Visual feedback** with animated loading states
- **Error handling** with graceful fallbacks
- **Responsive design** that adapts to any screen size

## 🛠 Technical Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Framer Motion** - Smooth animations and micro-interactions
- **FFmpeg.wasm** - In-browser video/audio processing
- **Lucide React** - Beautiful icon system

## 📁 Project Structure

```
vibraze/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles and design system
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main homepage
│   └── components/
│       ├── VideoProcessor.tsx  # Core video processing logic
│       ├── Header.tsx          # App header with branding
│       ├── Footer.tsx          # Simple footer
│       └── ErrorBoundary.tsx   # Error handling component
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Custom design system
├── next.config.js             # Next.js configuration
└── README.md                  # Comprehensive documentation
```

## 🎯 How to Use

1. **Visit** http://localhost:3001
2. **Upload** a video file by clicking the upload area
3. **Adjust** the audio boost level using the slider (0-20dB)
4. **Click** "Boost Audio" to start processing
5. **Watch** the real-time progress indicator
6. **Preview** the enhanced video in the built-in player
7. **Download** your enhanced video with boosted audio

## 🎚️ Audio Boost Levels

- **0dB**: No change (original audio level)
- **1-5dB**: Subtle boost for quiet videos
- **6-10dB**: Standard boost for most content
- **11-15dB**: Strong boost for very quiet audio
- **16-20dB**: Maximum boost (use carefully to avoid distortion)

## 🌐 Browser Support

- **Chrome 67+** ✅
- **Firefox 68+** ✅
- **Safari 14+** ✅
- **Edge 79+** ✅

_Requires SharedArrayBuffer support for FFmpeg.wasm_

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎥 Processing Details

The application uses **FFmpeg.wasm** to:

- Load video files directly in the browser
- Apply audio volume filters (`volume=XdB`)
- Copy video streams without re-encoding (preserves quality)
- Re-encode audio with AAC codec at 128kbps
- Generate downloadable MP4 files

## 🔒 Privacy & Security

- **No server uploads**: All processing happens locally
- **No data storage**: Videos are processed and discarded
- **Cross-origin isolation**: Proper security headers for WebAssembly
- **Client-side only**: Your videos never leave your device

## 🎨 Color Palette

- **Primary Blue**: `#0ea5e9` - Main brand color
- **Dark Gradients**: `#0f172a` to `#1e293b` - Background
- **Glass Effects**: `rgba(255,255,255,0.05)` - Translucent panels
- **Neon Accents**: `rgba(14,165,233,0.5)` - Interactive highlights

## 🚀 Performance Features

- **Optimized animations** with CSS transforms
- **Lazy loading** of heavy components
- **Efficient re-renders** with React optimization
- **Progressive enhancement** for older browsers
- **Minimal bundle size** with Next.js optimization

## 📱 Responsive Design

- **Desktop**: Full-featured experience with large video previews
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Optimized for small screens with vertical layouts

---

**Built with ❤️ for video creators who need better audio enhancement.**

The Vibraze application demonstrates modern web development practices with a focus on user experience, performance, and privacy-first design.
