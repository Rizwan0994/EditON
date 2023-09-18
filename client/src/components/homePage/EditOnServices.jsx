import { Box, Button, Typography } from "@mui/material";
import EditOnGuarantee from "../image/EditOnService/EditOnGuarantee.png";
import HowItWorkLogo from "../image/EditOnService/HowItWorkLogo.png";
import WorldWideConnectLogo from "../image/EditOnService/WorldWideConnectLogo.png";
import InspireLogo from "../image/EditOnService/InspireLogo.png";

const Edit = () => {
  const services = [
    { id: 1, logo: InspireLogo, text: "Inspire with great movies" },
    {
      id: 2,
      logo: WorldWideConnectLogo,
      text: "Connect you with editors worldwide",
    },
    { id: 3, logo: HowItWorkLogo, text: "Simplify movie production" },
    { id: 4, logo: EditOnGuarantee, text: "Money-back guarantee" },
  ];

  const Content = [
    { id: 1, count: 4952, text: "Movies" },
    { id: 2, count: 11299, text: "Creators" },
    { id: 3, count: 68, text: "Languages" },
    { id: 4, count: 173, text: "Countries" },
  ];
  const serivceBackgroundImage =
    "https://d1puzd1182zmjc.cloudfront.net/h/earth.jpg";

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#6BB52E",
          p: "0px 15px",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ fontSize: "26px", m: "16px 0px", textAlign: "center" }}
        >
          What EditON can do for you
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {services.map((service) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
                alignItems: "center",
              }}
              key={service.id}
            >
              <img
                src={service.logo}
                style={{ height: "180px", width: "180px" }}
              />
              <Typography sx={{ pt: "8px", mb: "16px", textAlign: "center" }}>
                {service.text}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#F8F9FA",
            color: "black",
            m: "0px 342.2px 20px",
            fontSize: "20px",
            pl: "0px",
            pr: "0px",
            width: "400px",
            height: "47px",
            alignSelf: "center",
          }}
        >
          Register
        </Button>
      </Box>
      <Box
        sx={{
          backgroundImage: `url(${serivceBackgroundImage})`,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src="https://d1puzd1182zmjc.cloudfront.net/h/24-7_800x.png"
          height="80px"
          width="178.69px"
        />
        <Typography
          sx={{
            color: "white",
            m: "16px 0px",
            fontSize: "26px",
            fontFamily: "Noto Sans, sans-serif",
          }}
          component="h2"
        >
          Crowdsourced Video Creation Service
        </Typography>

        {Content.map((cont) => (
          <Box sx={{ display: "flex", alignItems: "center" }} key={cont.id}>
            <Typography
              sx={{
                fontSize: "35px",
                fontFamily: "Numbers, sans-serif",
                pr: "5px",
                letterSpacing: "5px",
                backgroundColor: "#fff",
                color: "#07162c",
              }}
            >
              {cont.count}
            </Typography>
            <Typography
              sx={{
                pl: "5px",
                fontSize: "26px",
                fontFamily: "Noto Sans, sans-serif",
              }}
            >
              {cont.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default Edit;
