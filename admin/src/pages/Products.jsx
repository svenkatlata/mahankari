import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

const initialProducts = [
  {
    id: 1,
    name: "Tasty Metal Shirt",
    category: "Books",
    sku: "SKU-52442",
    stock: 30,
    price: 410,
    rating: 3.5,
    reviews: 14,
    status: "Pending",
    statusColor: "warning",
  },
  {
    id: 2,
    name: "Modern Gloves",
    category: "Kids",
    sku: "SKU-98424",
    stock: 0,
    price: 340,
    rating: 4.5,
    reviews: 9,
    status: "Draft",
    statusColor: "default",
  },
  {
    id: 3,
    name: "Rustic Steel Computer",
    category: "Games",
    sku: "SKU-78192",
    stock: 50,
    price: 948,
    rating: 3.8,
    reviews: 19,
    status: "Draft",
    statusColor: "default",
  },
  {
    id: 4,
    name: "Licensed Concrete Cheese",
    category: "Electronics",
    sku: "SKU-86229",
    stock: 0,
    price: 853,
    rating: 2.5,
    reviews: 5,
    status: "Pending",
    statusColor: "warning",
  },
  {
    id: 5,
    name: "Electronic Rubber Table",
    category: "Books",
    sku: "SKU-89762",
    stock: 18,
    price: 881,
    rating: 4.0,
    reviews: 12,
    status: "Publish",
    statusColor: "success",
  },
];

const StockChip = styled(Chip)(({ theme, stock }) => ({
  backgroundColor:
    stock === 0
      ? theme.palette.grey[300]
      : stock < 20
      ? theme.palette.warning.main
      : theme.palette.success.main,
  color: stock === 0 ? theme.palette.text.primary : theme.palette.common.white,
  height: 24,
  fontSize: 12,
}));

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Products
        </Typography>
        <Box>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Export
          </Button>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Product
          </Button>
        </Box>
      </Box>

      <TextField
        fullWidth
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Typography fontWeight={500}>{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                  </TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>
                    <StockChip
                      label={
                        product.stock === 0
                          ? "Out of stock"
                          : product.stock < 20
                          ? `${product.stock} low stock`
                          : `${product.stock} in stock`
                      }
                      stock={product.stock}
                    />
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.rating} ★ ({product.reviews})
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.status}
                      color={product.statusColor}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Rows per page"
        />
      </TableContainer>
    </Box>
  );
};

export default Products;
