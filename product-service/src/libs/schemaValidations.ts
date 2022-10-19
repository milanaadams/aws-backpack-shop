import * as yup from 'yup';

export const createProductSchema = yup.object().shape({
    title: yup.string().required().min(1).max(200),
    description: yup.string().required().min(2).max(1000),
    price: yup.number().required().min(0.00),
    image: yup.string().required().min(3).max(200),
    count: yup.number().required().min(0),
  });