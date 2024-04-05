import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const [channelData, videoData] = await Promise.all([
          fetchFromAPI(`channels?part=snippet&id=${id}`),
          fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`),
        ]);
        setChannelDetail(channelData?.items[0]);
        setVideos(videoData?.items);
      } catch (error) {
        console.log("🚀 ~ fetchData ~ error:", error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(0, 238, 247, 1) 0%, rgba(206, 3, 184, 1) 100%, rgba(0, 212, 255, 1) 100%)',
          zIndex: 10,
          height: "300px",
        }}
        />
          <ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '157px' } }} />
        {isLoading ? (
          <p>Loading videos...</p>
        ) : (
          <Videos videos={videos} />
        )}
      </Box>
    </Box>
  )
}

export default ChannelDetail;