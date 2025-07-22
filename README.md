# Softgames Tech Test - Lucas Jones

I chose to use PixiJS v8 for this project to get hands-on with the new API and PixiLayout. I limited myself to a few hours total, which made it tough to go deep on any one task. 
Given more time, I would’ve focused on a single area and polished it further. Most of my time went into Magic Words, exploring and experimenting with the layout system.

### 🃏 Ace of Shadows

I used springs to give the cards a satisfying feel when moving, added a shader background from [Shadertoy](https://www.shadertoy.com/view/XXtBRr), and included sound effects for a bit of extra polish.


#### Potential Improvements
 - Missing features card animation from deck-to-deck

### ✨ Magic Words

This is the one I spent the most time on, as I wanted to try out PixiLayout - It uses Yoga for a flex-box style layout engine, it was really impressive.

#### Potential Improvements

- Investigate [SplitText/SplitBitmapText](https://pixijs.com/8.x/guides/components/scene-objects/text/split-text)
- Typewriter animation for text (and talking sound effect like Animal Crossing, Celeste, Undertale)
- Per word animations [Example](https://github.com/LeiQiaoZhi/Easy-Text-Effects-for-Unity)
- Emotion-based avatar tweens (angry - shake, happy bounce)


### 🔥 Phoenix Flame

I ran out of time to build a custom solution, but still wanted something in place; since I noticed Softgames uses RevoltFX, I quickly integrated it and added a basic fire effect.

#### Potential Improvements
- Custom particle system
- Use ParticleContainer for fast rendering
- Use a SpriteSheet for single draw call if multiple textures are needed
- Use a shader/filter to improve visuals (bloom)

### 🚀 Overall Improvements
- TexturePacker integration
- PixiJS AssetPack implementation
- Enum-based asset management (eliminate magic strings asset references)
- Complete mobile responsiveness (could use PixiLayout)
- Full-Screen support
- FPS viewer


## 🛠️ Tech Stack

### Core Technologies
- **[PixiJS v8](https://pixijs.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)**
- **[Bun](https://bun.sh/)**

### PixiJS Ecosystem
- **[@pixi/layout](https://www.npmjs.com/package/@pixi/layout)**
- **[@pixi/sound](https://www.npmjs.com/package/@pixi/sound)**
- **[Revolt-FX](https://www.npmjs.com/package/revolt-fx)**

### Development Tools
- **[Prettier](https://prettier.io/)**
- **[PixiJS DevTools](https://pixijs.io/devtools/)**

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```


