function promptAddToHomeScreen() {
    const isIos = window.navigator.userAgent.match(/iphone|ipad|ipod/i);
    const isChrome = window.navigator.userAgent.match(/Chrome/i);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIos && isChrome && !isStandalone) {
      // Check if the manifest file is accessible
      fetch('/manifest.json')
        .then(response => {
          if (response.ok) {
            // Manifest file is accessible, so customize the banner using its data
            response.json()
              .then(data => {
                const banner = document.createElement('div');
                banner.innerHTML = `<p>${data.name} is a web app. Install it on your iPhone: tap the <strong>Share</strong> button below and then <strong>Add to Home Screen</strong>.</p>`;
                banner.style.position = 'fixed';
                banner.style.bottom = '0';
                banner.style.width = '100%';
                banner.style.backgroundColor = data.background_color || '#f2f2f2';
                banner.style.color = data.theme_color || '#000000';
                banner.style.padding = '16px';
                banner.style.borderTop = '1px solid #ccc';
                banner.style.boxShadow = '0 -2px 10px rgba(0, 0, 0, 0.1)';
                document.body.appendChild(banner);
              });
          }
        });
    }
  }
  
  window.addEventListener('load', promptAddToHomeScreen);
  