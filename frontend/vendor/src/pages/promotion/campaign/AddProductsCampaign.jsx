/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { imageHover } from 'components/Image/HoverImage';
import Loader from 'layouts/loader/loader';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from 'services/product/ProductService';
import { addProductCampaign, getRegisteredSingleCampaign, removeProductCampaign } from 'services/promotions/Promotion.Service';
import { ErrorToast, SuccessToast, TryCatch } from 'utils';

const AddProductsCampaign = () => {
  const [campaign, setCampaign] = useState({});
  const [loader, setLoader] = useState(false)
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { id } = useParams();
  const CampaignIdCheck = async () => {
    try {
      const res = await getRegisteredSingleCampaign(id);
      setCampaign(res?.data);
    } catch (error) {
      ErrorToast('Sorry! You can not do This');
      history('/campaign/list')
    }
  }
  const addProduct = async (product_id, size, color, price, special_price) => {
    try {
      setLoader(true);
      await addProductCampaign(id, { product_id, color, size, price, special_price })
      SuccessToast('This Product Added Successful');
      AllPromise();
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    } finally {
      setLoader(false)
    }
  };
  const removeProduct = async (product_id, size, color, price, special_price) => {
    try {
      setLoader(true);
      await removeProductCampaign(id, { product_id, color, size, price, special_price })
      SuccessToast('This Product Removed Successful');
      AllPromise();
    } catch (error) {
      if (error.response) {
        ErrorToast(error.response?.data?.err);
      }
    } finally {
      setLoader(false)
    }
  };
  const getAllProducts = async () => {
    TryCatch(async () => {
      const response = await getProducts('online');
      let temp = [];
      response?.data.forEach(function (product) {
        product.variant_stock_price?.forEach((variant) => {
          variant?.sizes?.map((nestedSize) => {
            let doesMatch = false;
            if (nestedSize.pricing?.offer_price_start_time && nestedSize.pricing?.offer_price_end_time && new Date().getTime() < new Date(nestedSize.pricing?.offer_price_end_time)?.getTime()) {
              doesMatch = true;
            }
            temp.push({
              _id: product._id,
              name: product.product_name,
              status: product.status,
              created: product.createdAt,
              updated: product.updatedAt,
              color: variant.color_family,
              image: variant.images[0].url,
              size: nestedSize.size,
              quantity: nestedSize.quantity,
              price: nestedSize.pricing?.price,
              special_price: nestedSize.pricing?.special_price,
              match: doesMatch
            });
          });
        });
      });
      setProducts(temp);
    });
  };
  const AllPromise = async () => {
    await Promise.all([CampaignIdCheck(), getAllProducts()]);
  }
  useEffect(() => {
    AllPromise();
  }, [])
  return (
    <>
      <Box sx={{ margin: 2 }}>
        <Typography variant="h6">
          Product Added in Campaign
        </Typography>
        <Typography variant="h5">
          {campaign?.discount}% Discount will be applicable
        </Typography>
      </Box>
      {
        loader ? <span style={{ marginTop: '10px' }}><Loader /></span> :
          <Paper sx={{ overflowX: "auto", margin: 1 }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Color & Size</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products && products
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product, index) => {
                      return (
                        <>
                          <TableRow
                            key={index}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              <small>{product.name}</small>
                            </TableCell>
                            <TableCell>
                              <img
                                height="64px"
                                width="64px"
                                className="img-fluid ml-5 m-2"
                                src={product.image}
                                style={{ cursor: 'pointer' }}
                                onClick={() => imageHover(product.image)}
                              />
                            </TableCell>
                            <TableCell>
                              <small>
                                <del>{product.price}</del>
                                <br />
                                {product.special_price}
                              </small>
                            </TableCell>
                            <TableCell>
                              <small>
                                color: {product.color}
                                <br />
                                size: {product.size}
                              </small>
                            </TableCell>
                            <TableCell>
                              <small>
                                {product.quantity > 5 ? (
                                  <span className="text-success">
                                    {product.quantity}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    {product.quantity}
                                  </span>
                                )}
                              </small>
                            </TableCell>
                            <TableCell>
                              {
                                new Date().getTime() < new Date(campaign?.campaign_end_time)?.getTime() ?
                                  <>
                                    {
                                      !product?.match ? <IconButton
                                        onClick={() => addProduct(product._id, product.size, product.color, product.price, product.special_price)}
                                        size="small"
                                        title="Add Product"
                                        className="px-1"
                                        sx={{ color: "green", fontSize: '15px' }}
                                      >Add
                                      </IconButton> : <IconButton
                                        onClick={() => removeProduct(product._id, product.size, product.color, product.price, product.special_price)}
                                        size="small"
                                        title="Add Product"
                                        className="px-1"
                                        sx={{ color: "green", fontSize: '15px' }}
                                      >Remove
                                      </IconButton>
                                    }
                                  </> : null
                              }
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={products?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
      }
    </>
  )
}

export default AddProductsCampaign