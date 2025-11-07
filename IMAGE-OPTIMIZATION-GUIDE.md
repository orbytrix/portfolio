# Image Optimization Guide

This guide provides instructions for optimizing images used in the Futuristic Company Website to ensure optimal performance and fast loading times.

## Image Optimization Best Practices

### 1. Image Formats

**Recommended Formats:**
- **WebP**: Modern format with excellent compression (use as primary format)
- **JPEG**: For photographs and complex images (fallback)
- **PNG**: For images requiring transparency (use sparingly)
- **SVG**: For icons, logos, and simple graphics

### 2. Image Compression

**Tools for Compression:**
- **Online Tools:**
  - TinyPNG (https://tinypng.com/) - PNG and JPEG compression
  - Squoosh (https://squoosh.app/) - Multiple format support
  - ImageOptim (https://imageoptim.com/) - Mac application
  
- **Command Line Tools:**
  ```bash
  # Install ImageMagick
  # For JPEG compression
  convert input.jpg -quality 85 -strip output.jpg
  
  # For PNG compression
  pngquant --quality=65-80 input.png --output output.png
  
  # Convert to WebP
  cwebp -q 80 input.jpg -o output.webp
  ```

### 3. Image Sizing Guidelines

**Project Images (projects.json):**
- **Recommended Size**: 800x600px (4:3 aspect ratio)
- **Maximum File Size**: 150KB per image
- **Format**: WebP (with JPEG fallback)

**Hero/Banner Images:**
- **Recommended Size**: 1920x1080px (16:9 aspect ratio)
- **Maximum File Size**: 300KB
- **Format**: WebP (with JPEG fallback)

**Team Member Photos:**
- **Recommended Size**: 400x400px (1:1 aspect ratio)
- **Maximum File Size**: 50KB per image
- **Format**: WebP (with JPEG fallback)

**Icons and Graphics:**
- **Format**: SVG (preferred) or PNG
- **Size**: As small as possible while maintaining quality

### 4. Responsive Images

Use the `<picture>` element for responsive images:

```html
<picture>
  <source srcset="image-large.webp" media="(min-width: 1024px)" type="image/webp">
  <source srcset="image-medium.webp" media="(min-width: 768px)" type="image/webp">
  <source srcset="image-small.webp" type="image/webp">
  <source srcset="image-large.jpg" media="(min-width: 1024px)" type="image/jpeg">
  <source srcset="image-medium.jpg" media="(min-width: 768px)" type="image/jpeg">
  <img src="image-small.jpg" alt="Description" loading="lazy">
</picture>
```

### 5. Lazy Loading Implementation

The website already implements lazy loading for project images using Intersection Observer API. All images should include:

```html
<img 
  data-src="path/to/image.jpg" 
  alt="Descriptive alt text"
  loading="lazy"
  class="project-image"
/>
```

### 6. Image Optimization Checklist

Before adding images to the website:

- [ ] Resize images to appropriate dimensions
- [ ] Compress images to reduce file size
- [ ] Convert to WebP format (with fallback)
- [ ] Add descriptive alt text for accessibility
- [ ] Use lazy loading for below-the-fold images
- [ ] Test image loading on slow connections
- [ ] Verify images display correctly on all devices

### 7. Current Image Locations

**Project Images:**
- Location: `assets/images/`
- Used in: `projects.html` (loaded from `data/projects.json`)
- Lazy loading: ✅ Implemented

**Placeholder Images:**
- SVG placeholders are generated inline for missing images
- No external files required

### 8. Performance Targets

**Target Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Image Size per Page: < 500KB
- Individual Image Size: < 150KB

### 9. Testing Image Performance

**Tools:**
- Chrome DevTools (Network tab)
- Lighthouse (Performance audit)
- WebPageTest (https://www.webpagetest.org/)
- PageSpeed Insights (https://pagespeed.web.dev/)

**Test Scenarios:**
- Fast 3G connection
- Slow 3G connection
- Desktop (high-speed)
- Mobile (4G)

### 10. Automated Optimization (Future Enhancement)

Consider implementing automated image optimization in a build process:

```bash
# Example using sharp (Node.js)
npm install sharp

# Optimization script
const sharp = require('sharp');

sharp('input.jpg')
  .resize(800, 600)
  .webp({ quality: 80 })
  .toFile('output.webp');
```

## Current Implementation Status

✅ **Implemented:**
- Lazy loading for project images (Intersection Observer)
- Loading placeholders with shimmer effect
- Error handling for missing images
- Responsive image sizing via CSS

⏳ **Recommended Future Enhancements:**
- WebP format with JPEG fallback
- Responsive image srcset
- Image CDN integration
- Automated build-time optimization
- Progressive image loading

## Maintenance

**Regular Tasks:**
- Review image sizes quarterly
- Remove unused images
- Update compression as new tools become available
- Monitor Core Web Vitals for image-related metrics

---

Last Updated: 2024
