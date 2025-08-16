# LinguaASEAN - Language Learning Platform

## Overview

LinguaASEAN is a responsive web application designed to help users master Southeast Asian languages through an immersive learning experience. The platform features AI-powered tools, interactive courses, and community features to facilitate language acquisition.

## Features

- **Responsive Design**: Works seamlessly on all devices from mobile to desktop
- **Interactive Learning Tools**: AI translator, placement tests, and skill analysis
- **Community Features**: Connect with other learners and language partners
- **Performance Optimized**: Smooth animations and fast loading times
- **Accessibility Focused**: Built with ARIA attributes and keyboard navigation support

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python with Flask
- **Styling**: Modern CSS with Flexbox, Grid, and CSS variables
- **Animations**: CSS transitions and JavaScript animations
- **Responsive Techniques**: Fluid typography, responsive grids, and mobile-first approach

## Project Structure

```
NeuroSeek/
├── app.py                  # Main Flask application
├── static/
│   ├── css/
│   │   └── main.css        # All CSS from the original file
│   └── js/
│       └── main.js         # All JavaScript from the original file
├── templates/
│   ├── base.html           # Base template with common elements
│   ├── home.html           # Homepage (extends base)
│   ├── includes/           # Partial templates
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── hero.html
│   │   ├── features.html
│   │   ├── stats.html
│   │   └── cta.html
└── requirements.txt        # Python dependencies
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hendrixian/NeuroSeek.git
   cd NeuroSeek
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the application:
   ```bash
   python app.py
   ```

5. Open your browser to:
   ```
   http://localhost:5000
   ```

## Key Implementation Details

### Responsive Design Features

- Fluid typography using CSS `clamp()`
- Responsive grids with `minmax()` and `min()`
- Mobile-first media queries
- Touch-friendly interactive elements
- Adaptive header that responds to scroll

### JavaScript Features

- Smooth scrolling with offset calculation
- IntersectionObserver for scroll animations
- Performance-optimized counter animations
- Mobile menu with proper accessibility
- Hover effects that disable on touch devices

### CSS Highlights

- Modern layout with CSS Grid and Flexbox
- CSS variables for dynamic theming
- GPU-accelerated animations
- Adaptive spacing with relative units
- Progressive enhancement approach

## Customization

To customize the application:

1. **Colors**: Modify the CSS variables in `main.css`
2. **Content**: Edit the HTML templates in the `templates` folder
3. **Animations**: Adjust timing in both CSS and JavaScript files
4. **Features**: Extend the JavaScript App controller in `main.js`

## Browser Support

The application is tested and works on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 12+)
- Chrome for Android (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

---

**Note**: This is a frontend-focused implementation. For a production deployment, you would need to:
1. Set up proper Flask configuration
2. Add database integration
3. Implement user authentication
4. Set up proper security headers
5. Configure caching and static file serving

