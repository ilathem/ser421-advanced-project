// attribution: https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2
import react from '@astrojs/react'

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive"
    style={{ 
      overflow: 'hidden',
      paddingBottom: '56.25%',
      position: "relative",
      height: 0,
    }}
  >
    <iframe
      style={{
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
      }}
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;