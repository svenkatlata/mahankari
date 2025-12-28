import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RedeemIcon from "@mui/icons-material/Redeem";
import PieChartIcon from "@mui/icons-material/PieChartOutline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StoreIcon from "@mui/icons-material/Store";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Dummy chart (replace with a real spark chart if needed)
const Spark = ({ color }) => (
  <Box
    sx={{
      display: "flex",
      gap: "8px",
      alignItems: "flex-end",
      ml: "auto",
    }}
  >
    {[45, 35, 40, 35, 30, 45, 50].map((h, i) => (
      <Box
        key={i}
        sx={{
          width: 5,
          height: h,
          borderRadius: 2,
          bgcolor: color,
        }}
      />
    ))}
  </Box>
);

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      {/* GREETING CARD */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          borderRadius: 3,
          border: "1px solid #eee",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Good Morning, <span style={{ color: "#444" }}>Mahankari Admin</span>{" "}
            👋
          </Typography>
          <Typography mt={1} color="text.secondary">
            Here's What happening on your store today. See the statistics at
            once.
          </Typography>

          <Link to="/products/add">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 3, textTransform: "none", borderRadius: 2, px: 2.5 }}
            >
              Add Product
            </Button>
          </Link>
        </Box>

        {/* Banner Image (replace) */}
        <Box>
          <StoreIcon sx={{ fontSize: 300, color: "#424242" }} />
        </Box>
      </Card>

      {/* STATISTICS CARDS */}
      <Grid container spacing={3} mt={3}>
        {/* Orders */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #eee",
              minWidth: 350,
            }}
          >
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <RedeemIcon sx={{ fontSize: 35, color: "#4B7CF3" }} />
              <Box width="100%">
                <Typography color="text.secondary">New Orders</Typography>
                <Typography variant="h6" fontWeight={700}>
                  1,390
                </Typography>
              </Box>
              <Spark color="#4B7CF3" />
            </CardContent>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#3BB875",
                fontWeight: 600,
              }}
            >
              <ArrowDropUpIcon />
              +32.40%
              <Typography ml={1} color="text.secondary">
                Increased last month
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Sales */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #eee",
              minWidth: 350,
            }}
          >
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <PieChartIcon sx={{ fontSize: 35, color: "#34C759" }} />
              <Box width="100%">
                <Typography color="text.secondary">Sales</Typography>
                <Typography variant="h6" fontWeight={700}>
                  $57,890
                </Typography>
              </Box>
              <Spark color="#34C759" />
            </CardContent>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#E53935",
                fontWeight: 600,
              }}
            >
              <ArrowDropDownIcon />
              -4.40%
              <Typography ml={1} color="text.secondary">
                Decreased last month
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #eee",
              minWidth: 350,
            }}
          >
            <CardContent sx={{ display: "flex", gap: 2 }}>
              <AccountBalanceIcon sx={{ fontSize: 35, color: "#7C4DFF" }} />
              <Box width="100%">
                <Typography color="text.secondary">Revenue</Typography>
                <Typography variant="h6" fontWeight={700}>
                  $12,390
                </Typography>
              </Box>
              <Spark color="#7C4DFF" />
            </CardContent>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#3BB875",
                fontWeight: 600,
              }}
            >
              <ArrowDropUpIcon />
              +32.40%
              <Typography ml={1} color="text.secondary">
                Increased last month
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
