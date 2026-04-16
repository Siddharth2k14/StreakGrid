import { Box, Menu, MenuItem, Typography, Button } from "@mui/material";
import React from "react";

export default function AnalyticalDash() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedView, setSelectedView] = React.useState<string>("");

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectFun = (name: string) => {
    setSelectedView(name); // ✅ store selection
    handleClose(); // ✅ close menu
  };

  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        Analytics
      </Typography>

      {/* Button to open menu */}
      <Button onClick={handleOpen} variant="contained">
        Select View
      </Button>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => selectFun("HeatMap")}>
          HeatMap
        </MenuItem>
        <MenuItem onClick={() => selectFun("Pie Chart")}>
          Pie Chart
        </MenuItem>
        <MenuItem onClick={() => selectFun("Consistency Trend")}>
          Consistency Trend
        </MenuItem>
      </Menu>

      {/* Selected View Output */}
      <Box mt={3} textAlign="center">
        {selectedView && (
          <Typography variant="h6">
            {selectedView}
          </Typography>
        )}
      </Box>
    </Box>
  );
}