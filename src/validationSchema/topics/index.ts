import * as yup from 'yup';

export const topicValidationSchema = yup.object().shape({
  title: yup.string().required(),
  date: yup.date().required(),
  admin_id: yup.string().nullable(),
});
