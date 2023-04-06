import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard({city, image}) {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#181818", color: "#FBFFFF"}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt="Karachi"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
