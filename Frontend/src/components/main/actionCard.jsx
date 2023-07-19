import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({title, image, link}) {
  return (
    <Card sx={{ width: 300, height: 270, backgroundColor: "#181818", color: "whitesmoke", marginRight: "50px", borderRadius: "5px"}}>
      <CardActionArea href={link}>
        <CardMedia
          component="img"
          height="200"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
