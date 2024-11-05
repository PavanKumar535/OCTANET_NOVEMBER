const mockRelatedVideos = [
    {
      title: "Sample Video 1",
      thumbnail: "https://picsum.photos/300/200?random=1",
      duration: "10:30",
      views: "1.2M"
    },
    {
      title: "Sample Video 2",
      thumbnail: "https://picsum.photos/300/200?random=2",
      duration: "5:45",
      views: "800K"
    },
    {
      title: "Sample Video 3",
      thumbnail: "https://picsum.photos/300/200?random=3",
      duration: "8:15",
      views: "2.1M"
    }
  ];
  
  // Initialize the app
  function init() {
    const downloadBtn = document.getElementById('downloadBtn');
    const videoUrlInput = document.getElementById('videoUrl');
    const videoGrid = document.getElementById('videoGrid');
    const qualityOptions = document.getElementById('qualityOptions');
  
    downloadBtn.addEventListener('click', handleDownload);
    videoUrlInput.addEventListener('input', handleUrlChange);
  
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Display initial related videos
    displayRelatedVideos(mockRelatedVideos);
  }
  
  // Handle download button click
  function handleDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (!videoUrl) {
      showNotification('Please enter a valid video URL', 'error');
      return;
    }
  
    // Detect platform
    const platform = detectPlatform(videoUrl);
    if (!platform) {
      showNotification('Unsupported platform. Please enter a valid YouTube, Instagram, or Twitter URL', 'error');
      return;
    }
  
    // Show download options
    showDownloadOptions(platform);
    showNotification('Processing your video...', 'success');
  }
  
  // Show notification
  function showNotification(message, type = 'info') {
    // You can implement a proper notification system here
    alert(message);
  }
  
  // Handle URL input change
  function handleUrlChange(e) {
    const url = e.target.value;
    if (url) {
      // Fetch and display related videos based on URL
      fetchRelatedVideos(url);
    }
  }
  
  // Detect video platform from URL
  function detectPlatform(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('twitter.com')) return 'twitter';
    return null;
  }
  
  // Display related videos
  function displayRelatedVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = videos.map(video => `
      <div class="video-card">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="video-info">
          <h3>${video.title}</h3>
          <p>${video.duration} • ${video.views} views</p>
        </div>
      </div>
    `).join('');
  }
  
  // Show download options based on platform
  function showDownloadOptions(platform) {
    const qualityOptions = document.getElementById('qualityOptions');
    const options = getQualityOptions(platform);
    
    qualityOptions.innerHTML = options.map(option => `
      <button class="quality-btn" data-quality="${option.value}">
        ${option.label}
      </button>
    `).join('');
  
    // Scroll to download options
    document.getElementById('downloadOptions').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Get quality options based on platform
  function getQualityOptions(platform) {
    switch (platform) {
      case 'youtube':
        return [
          { label: '1080p MP4', value: '1080' },
          { label: '720p MP4', value: '720' },
          { label: '480p MP4', value: '480' },
          { label: 'Audio Only', value: 'audio' }
        ];
      case 'instagram':
        return [
          { label: 'Highest Quality', value: 'high' },
          { label: 'Standard Quality', value: 'standard' }
        ];
      case 'twitter':
        return [
          { label: 'High Quality', value: 'high' },
          { label: 'Medium Quality', value: 'medium' }
        ];
      default:
        return [];
    }
  }
  
  // Mock function to fetch related videos
  function fetchRelatedVideos(url) {
    // In a real application, this would make an API call
    // For now, we'll just use our mock data
    displayRelatedVideos(mockRelatedVideos);
  }
  
  // Initialize the app when the DOM is loaded
  document.addEventListener('DOMContentLoaded', init);