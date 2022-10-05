import productData from './stackline_frontend_assessment_data_2021.json';

const fetchProduct = () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(
      { data: productData }
    ), 500)
  );
}

export default fetchProduct;
