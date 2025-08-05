# Vibraze - Video Audio Enhancement App

A modern, sleek Next.js web application that allows users to upload videos and boost their audio levels with professional-grade sound enhancement.

## Features

- 🎥 **Video Upload**: Support for common video formats (MP4, MOV, AVI, etc.)
- 🔊 **Audio Boosting**: Adjustable audio boost from 0dB to 20dB
- 🎨 **Modern UI**: Sleek, futuristic design with glass morphism effects
- ⚡ **Real-time Processing**: Live progress tracking during video processing
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🎬 **Video Preview**: Built-in video player to preview enhanced results
- 💾 **Direct Download**: Download processed videos instantly
- 🔒 **Privacy First**: All processing happens in your browser - no server uploads

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **FFmpeg.wasm** - In-browser video processing
- **Lucide React** - Beautiful icon set

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd vibraze
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Upload**: Select a video file from your device
2. **Adjust**: Use the slider to set your desired audio boost level (0-20dB)
3. **Process**: Click "Boost Audio" to enhance your video
4. **Download**: Save the enhanced video to your device

## Browser Compatibility

Vibraze uses FFmpeg WebAssembly which requires:

- Chrome 67+
- Firefox 68+
- Safari 14+
- Edge 79+

## Performance Notes

- Processing time depends on video file size and duration
- Larger files may take several minutes to process
- The app uses SharedArrayBuffer which requires HTTPS in production

## Development

### Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Header.tsx      # App header
│   ├── Footer.tsx      # App footer
│   └── VideoProcessor.tsx # Main video processing component
```

### Key Components

- **VideoProcessor**: Handles file upload, FFmpeg processing, and download
- **Header**: App branding with animated logo
- **Footer**: Simple footer with copyright

### Styling

The app uses a custom design system with:

- Glass morphism effects (`.glass-effect`)
- Neon borders (`.neon-border`)
- Gradient text (`.gradient-text`)
- Custom animations (float, glow, pulse-slow)

## Deployment

For production deployment, ensure your hosting platform supports:

- Cross-Origin Isolation headers (COOP/COEP)
- SharedArrayBuffer support
- Static file serving for FFmpeg WebAssembly files

### Vercel Deployment

The app is configured for Vercel deployment with proper headers in `next.config.js`.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ for video creators who need better audio.
