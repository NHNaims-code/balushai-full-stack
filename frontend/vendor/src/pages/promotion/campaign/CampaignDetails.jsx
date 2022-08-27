import { Box, Button, Divider, Typography } from '@mui/material';
import Loader from 'layouts/loader/loader';
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown';
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleCampaign, registerCampaign } from 'services/promotions/Promotion.Service';
import Swal from 'sweetalert2';
import { ErrorToast } from 'utils';
var options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};
var options1 = {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
};

const CampaignDetails = () => {
  const [loader, setLoader] = useState(false)
  const [campaign, setCampaign] = useState({})
  const { id } = useParams();
  const history = useNavigate()
  const CampaignIdCheck = async () => {
    try {
      const res = await getSingleCampaign(id);
      setCampaign(res?.data);
    } catch (error) {
      ErrorToast('Campaign Not Found');
      history('/campaign/list')
    }
  }
  const joinCampaign = async () => {
    try {
      setLoader(true);
      await registerCampaign(id);
      await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have been Joined',
        showConfirmButton: false,
        timer: 1500
      })
      history(`/campaign/${id}/add-product`);
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
      history('/campaign/list')
    } finally {
      setLoader(false)
    }
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return completed ? <span>Registration End</span> : <span>&nbsp;&nbsp; Ends {days}d : {hours}h : {minutes}m : {seconds}s</span>;
  };
  useEffect(() => {
    CampaignIdCheck();
  }, [])

  return (
    <>
      {
        loader ?
          <div style={{ marginTop: '100px' }}><Loader /></div> :
          <Box sx={{ margin: '20px' }}>
            <Typography variant="h5" component="h6">
              {campaign?.title}
            </Typography> <Divider sx={{ marginY: 1 }}>Details</Divider>
            <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
            <Divider sx={{ marginY: 1 }}></Divider>

            <span>
              Period:  {new Date(campaign.campaign_start_time)?.toLocaleString('en-BD', options)} -- to --  {new Date(campaign.campaign_end_time)?.toLocaleString('en-BD', options)}
            </span> <br></br>
            <span>
              Registration Ends in: {new Date(campaign.registration_end_time)?.toLocaleString('en', options1)}
              <span style={{ color: 'blue' }}>
                <Countdown date={new Date(campaign.registration_end_time)}
                  renderer={renderer} />
              </span>
            </span>
            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span></span>
              <Button type="submit" variant="contained" onClick={joinCampaign}>
                Agree & Join Now
              </Button>
            </Box>
          </Box>
      }
    </>
  )
}

export default CampaignDetails