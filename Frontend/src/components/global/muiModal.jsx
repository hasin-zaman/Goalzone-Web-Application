// import * as React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { styled, Box } from '@mui/system';
// import { Modal } from '@mui/material';

// export default function MUIModal({button, children}) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       {React.cloneElement(button, { onClick: handleOpen })}
//       <StyledModal
//         aria-labelledby="unstyled-modal-title"
//         aria-describedby="unstyled-modal-description"
//         open={open}
//         onClose={handleClose}
//         slots={{ backdrop: StyledBackdrop }}
//       >
//         <Box sx={style}>
//             {children} 
//         </Box>
//       </StyledModal>
//     </div>
//   );
// }

// const Backdrop = React.forwardRef((props, ref) => {
//   const { open, className, ...other } = props;
//   return (
//     <div
//       className={clsx({ 'MuiBackdrop-open': open }, className)}
//       ref={ref}
//       {...other}
//     />
//   );
// });

// Backdrop.propTypes = {
//   className: PropTypes.string.isRequired,
//   open: PropTypes.bool,
// };

// const StyledModal = styled(Modal)`
//   position: fixed;
//   z-index: 1300;
//   inset: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledBackdrop = styled(Backdrop)`
//   z-index: -1;
//   position: fixed;
//   inset: 0;
//   background-color: rgb(0 0 0 / 0.5);
//   -webkit-tap-highlight-color: transparent;
// `;

// const style = (theme) => ({
//   width: '60%',
//   borderRadius: '12px',
//   padding: '16px 32px 24px 32px',
//   backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'whitesmoke',
//   boxShadow: `0px 2px 24px ${theme.palette.mode === 'dark' ? '#000' : '#383838'}`,
// });
